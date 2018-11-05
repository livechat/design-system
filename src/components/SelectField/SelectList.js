import * as React from 'react';
import * as PropTypes from 'prop-types';
import { KeyCodes } from '../../constants/keyCodes';
import SelectItem from './SelectItem';
import styles from './style.scss';

const baseClass = 'select-body';

class SelectList extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      this.listRef.current.scrollTop = 0;
      document.addEventListener('keydown', this.onKeydown);
    } else if (prevProps.isOpen && !this.props.isOpen) {
      document.removeEventListener('keydown', this.onKeydown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
    this.hoverCallbacks = [];
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  onKeydown = event => {
    const { keyCode } = event;

    if (keyCode === 9 || keyCode === 27) {
      this.props.onListClose();
    }

    if (keyCode === KeyCodes.arrowDown || keyCode === KeyCodes.arrowUp) {
      this.handleArrowKeyUse(event);
    }

    if (keyCode === KeyCodes.enter) {
      this.handleEnterKeyUse(event);
    }
  };

  getHoveredItemCallback = itemKey => {
    if (!this.hoverCallbacks[itemKey]) {
      this.hoverCallbacks[itemKey] = () => {
        if (!this.listRef.current.classList.contains('disable-hover')) {
          this.props.onFocusedItemChange(itemKey);
        }
      };
    }

    return this.hoverCallbacks[itemKey];
  };

  getFocusedItemIndex = itemKey =>
    this.props.items.map(item => item.key).indexOf(itemKey);

  scrollItems = () => {
    const focusedElement = this.listRef.current.querySelector(
      `.lc-${baseClass}__item--focused`
    );

    if (focusedElement) {
      this.listRef.current.classList.add('disable-hover');
      const {
        height: ulHeight,
        top: ulTop
      } = this.listRef.current.getBoundingClientRect();
      const {
        height: itemHeigth,
        top: itemTop
      } = focusedElement.getBoundingClientRect();
      const relativeTop = itemTop + itemHeigth - ulTop;
      const itemOfsetTop = focusedElement.offsetTop;

      if (relativeTop > ulHeight) {
        this.listRef.current.scrollTop = itemOfsetTop - ulHeight + itemHeigth;
      } else if (itemTop < ulTop) {
        this.listRef.current.scrollTop = itemOfsetTop;
      }
      this.timerId = setTimeout(
        () => this.listRef.current.classList.remove('disable-hover'),
        100
      );
    }
  };

  handleEnterKeyUse = () => {
    const {
      isOpen,
      focusedItemKey,
      onEnterKey,
      onFocusedItemChange
    } = this.props;

    if (isOpen && focusedItemKey !== null) {
      this.listRef.current.scrollTop = 0;
      onEnterKey(focusedItemKey);
      onFocusedItemChange(null);
    }
  };

  handleArrowKeyUse = event => {
    event.preventDefault();
    const { items, focusedItemKey, onFocusedItemChange } = this.props;
    const { keyCode } = event;

    const currentItemIndex = this.getFocusedItemIndex(focusedItemKey);

    if (keyCode === KeyCodes.arrowDown && currentItemIndex + 1 < items.length) {
      onFocusedItemChange(items[currentItemIndex + 1].key);
    }

    if (keyCode === KeyCodes.arrowUp && currentItemIndex > 0) {
      onFocusedItemChange(items[currentItemIndex - 1].key);
    }

    this.scrollItems();
  };

  timerId = null;

  hoverCallbacks = [];
  listRef = React.createRef();

  render() {
    const {
      items,
      selectedItem,
      getItemBody,
      getItemSelectedHandler,
      focusedItemKey
    } = this.props;

    return (
      <ul ref={this.listRef} className={styles[`${baseClass}__list`]}>
        {items.filter(v => !v.props.hidden).map(item => (
          <SelectItem
            isSelected={item.key === selectedItem}
            isFocused={item.key === focusedItemKey}
            key={item.key}
            onClick={getItemSelectedHandler(item.key)}
            onMouseEnter={this.getHoveredItemCallback(item.key)}
          >
            {getItemBody(item.props)}
          </SelectItem>
        ))}
      </ul>
    );
  }
}

SelectList.propTypes = {
  getItemBody: PropTypes.func,
  isOpen: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      props: PropTypes.object
    })
  ),
  onListClose: PropTypes.func,
  selectedItem: PropTypes.string,
  getItemSelectedHandler: PropTypes.func,
  onEnterKey: PropTypes.func,
  focusedItemKey: PropTypes.string,
  onFocusedItemChange: PropTypes.func
};

export default SelectList;
