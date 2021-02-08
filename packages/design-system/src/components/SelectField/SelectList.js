import * as React from 'react';
import * as PropTypes from 'prop-types';
import { KeyCodes } from '../../constants/keyCodes';
import SelectItem from './SelectItem';
import styles from './style.scss';

const baseClass = 'select-body';

class SelectList extends React.PureComponent {
  componentDidMount() {
    if (this.props.isOpen) {
      document.addEventListener('keydown', this.onKeydown);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      if (this.props.listRef.current) {
        this.props.listRef.current.scrollTop = 0;
      }
      document.addEventListener('keydown', this.onKeydown);
    } else if (prevProps.isOpen && !this.props.isOpen) {
      document.removeEventListener('keydown', this.onKeydown);
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
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
      if (this.props.listRef.current) {
        this.props.listRef.current.scrollTop = 0;
      }
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
        if (
          this.props.listRef.current &&
          !this.props.listRef.current.classList.contains('disable-hover')
        ) {
          this.props.onFocusedItemChange(itemKey);
        }
      };
    }

    return this.hoverCallbacks[itemKey];
  };

  getFocusedItemIndex = itemKey =>
    this.props.items.map(item => item.key).indexOf(itemKey);

  scrollItems = () => {
    if (!this.props.listRef.current) {
      return;
    }
    const focusedElement = this.props.listRef.current.querySelector(
      `.lc-${baseClass}__item--focused`
    );

    if (focusedElement) {
      this.props.listRef.current.classList.add('disable-hover');
      const {
        height: ulHeight,
        top: ulTop
      } = this.props.listRef.current.getBoundingClientRect();
      const {
        height: itemHeigth,
        top: itemTop
      } = focusedElement.getBoundingClientRect();
      const relativeTop = itemTop + itemHeigth - ulTop;
      const itemOfsetTop = focusedElement.offsetTop;

      if (relativeTop > ulHeight) {
        this.props.listRef.current.scrollTop =
          itemOfsetTop - ulHeight + itemHeigth;
      } else if (itemTop < ulTop) {
        this.props.listRef.current.scrollTop =
          itemOfsetTop - (itemOfsetTop % itemHeigth);
      }
      this.timerId = setTimeout(
        () => this.props.listRef.current.classList.remove('disable-hover'),
        100
      );
    }
  };

  handleEnterKeyUse = () => {
    const { isOpen, focusedItemKey, onEnterKey } = this.props;

    if (isOpen && focusedItemKey !== null) {
      if (this.props.listRef.current) {
        this.props.listRef.current.scrollTop = 0;
      }
      onEnterKey(focusedItemKey);
    }
  };

  handleArrowKeyUse = event => {
    event.preventDefault();
    const { items, focusedItemKey, onFocusedItemChange } = this.props;
    const { keyCode } = event;

    const currentItemIndex = this.getFocusedItemIndex(focusedItemKey);

    if (keyCode === KeyCodes.arrowUp && currentItemIndex > 0) {
      onFocusedItemChange(items[currentItemIndex - 1].key);
    }

    if (keyCode === KeyCodes.arrowDown && currentItemIndex + 1 < items.length) {
      onFocusedItemChange(items[currentItemIndex + 1].key);
    }

    this.scrollItems();
  };

  isItemSelected = itemKey => {
    if (this.props.selectedItem === null) {
      return false;
    }
    return this.props.selectedItem === itemKey;
  };

  isItemFocused = itemKey => this.props.focusedItemKey === itemKey;

  timerId = null;

  hoverCallbacks = [];

  render() {
    const { items, getItemBody, getItemSelectedHandler, selectHeader } = this.props;

    return (
      <ul ref={this.props.listRef} className={styles[`${baseClass}__list`]} data-testid="select-list">
        {
          selectHeader && (
            <SelectItem className={styles[`${baseClass}__list__header`]}>{selectHeader}</SelectItem>
          )
        }
        {items.filter(v => !v.props.hidden).map(item => (
          <SelectItem
            isSelected={this.isItemSelected(item.key)}
            isFocused={this.isItemFocused(item.key)}
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
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getItemSelectedHandler: PropTypes.func,
  onEnterKey: PropTypes.func,
  focusedItemKey: PropTypes.string,
  onFocusedItemChange: PropTypes.func,
  listRef: PropTypes.shape({
    current: PropTypes.instanceOf(
      typeof Element === 'undefined' ? () => {} : Element
    )
  }),
  selectHeader: PropTypes.string
};

export default SelectList;
