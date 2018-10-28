import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { KeyCodes } from '../../constants/keyCodes';
import SelectItem from './SelectItem';
import styles from './style.scss';

const cx = classNames.bind(styles);

class SelectList extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      this.listRef.current.scrollTop = 0;
      document.addEventListener('keydown', this.keydownEventHandler);
    } else if (prevProps.isOpen && !this.props.isOpen) {
      document.removeEventListener('keydown', this.keydownEventHandler);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownEventHandler);
    this.hoverCallbacks = [];
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

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

  scrollItems = () => {
    const focusedElement = this.listRef.current.querySelector('.focused');

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

  keydownEventHandler = event => {
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

  handleArrowKeyUse = event => {
    event.preventDefault();
    const {
      isOpen,
      items,
      focusedItemKey,
      onFocusedItemChange,
      searchPhraseItem
    } = this.props;
    const { keyCode } = event;

    if (isOpen) {
      const currentItemIndex = items
        .map(item => item.key)
        .indexOf(focusedItemKey);
      const itemsCount = items.length;
      let newFocusedItemKey;

      if (keyCode === KeyCodes.arrowDown) {
        newFocusedItemKey =
          currentItemIndex + 1 < itemsCount
            ? items[currentItemIndex + 1].key
            : focusedItemKey;
        onFocusedItemChange(newFocusedItemKey);
        this.scrollItems();
      }
      if (keyCode === KeyCodes.arrowUp) {
        newFocusedItemKey =
          currentItemIndex > 0
            ? items[currentItemIndex - 1].key
            : focusedItemKey;
        if (searchPhraseItem && currentItemIndex === 0) {
          onFocusedItemChange(null);
        } else {
          onFocusedItemChange(newFocusedItemKey);
        }
        this.scrollItems();
      }
    }
  };

  timerId = null;

  hoverCallbacks = [];
  listRef = React.createRef();

  render() {
    const {
      items,
      selectedItems,
      getItemBody,
      getItemSelectedHandler,
      selectedDisabled,
      focusedItemKey,
      searchPhraseItem,
      addingNewAvailable
    } = this.props;

    return (
      <ul ref={this.listRef}>
        {searchPhraseItem &&
          addingNewAvailable && (
            <li
              onClick={getItemSelectedHandler(searchPhraseItem.key)}
              className={cx(
                { selected: focusedItemKey === null },
                { focused: focusedItemKey === null }
              )}
            >
              {getItemBody(searchPhraseItem.props)}
            </li>
          )}
        {items.filter(v => !v.props.hidden).map(item => (
          <SelectItem
            isSelected={selectedItems.indexOf(item.key) > -1}
            disabled={selectedItems.indexOf(item.key) > -1 && selectedDisabled}
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
  selectedItems: PropTypes.arrayOf(PropTypes.string),
  getItemSelectedHandler: PropTypes.func,
  onEnterKey: PropTypes.func,
  selectedDisabled: PropTypes.bool,
  searchPhraseItem: PropTypes.string,
  focusedItemKey: PropTypes.string,
  onFocusedItemChange: PropTypes.func,
  addingNewAvailable: PropTypes.bool
};

export default SelectList;
