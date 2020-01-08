import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import DropdownListItem from './DropdownListItem';
import { KeyCodes } from '../../constants/keyCodes';
import findNextFocusableItem from '../../helpers/find-next-focusable-item';
import { getFirstFocusableItemId } from './helpers';

const baseClass = 'dropdown';

class DropdownList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      focusedElement:
        this.props.autoFocusedItemId || getFirstFocusableItemId(props.items),
      itemsCount: props.items.length
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.autoFocusOnItemsCountChange &&
      props.items.length !== state.itemsCount
    ) {
      return {
        focusedElement: getFirstFocusableItemId(props.items),
        itemsCount: props.items.length
      };
    }
    return null;
  }

  componentDidMount() {
    if (this.props.keyboardEventsEnabled) {
      document.addEventListener('keydown', this.onKeydown);
    }

    if (this.props.autoFocusedItemId) {
      this.scrollItems();
    }
  }

  componentDidUpdate(prevProps) {
    const eventsEnabled =
      !prevProps.keyboardEventsEnabled && this.props.keyboardEventsEnabled;
    const eventsDisabled =
      prevProps.keyboardEventsEnabled && !this.props.keyboardEventsEnabled;

    if (eventsEnabled) {
      document.addEventListener('keydown', this.onKeydown);
    } else if (eventsDisabled) {
      document.removeEventListener('keydown', this.onKeydown);
    }
  }

  componentWillUnmount() {
    if (this.hoverEnablerTimeout) {
      clearTimeout(this.hoverEnablerTimeout);
    }
    document.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown = event => {
    const { keyCode } = event;

    if (keyCode === KeyCodes.arrowDown || keyCode === KeyCodes.arrowUp) {
      this.handleArrowKeyUse(event);
    }

    if (this.isItemSelectKeyCode(keyCode)) {
      event.preventDefault();
      this.handleSelectKeyUse(event);
    }
  };

  getFocusedItemCallback = itemKey => {
    if (!this.hoverCallbacks[itemKey]) {
      this.hoverCallbacks[itemKey] = () => {
        if (!this.isHoverDisabled) {
          this.changeFocusedElement(itemKey);
        }
      };
    }

    return this.hoverCallbacks[itemKey];
  };

  handleSelectKeyUse = event => {
    const { focusedElement } = this.state;

    if (focusedElement !== null) {
      const selectedItem = this.props.items.find(
        item => item.itemId === focusedElement
      );

      if (selectedItem && selectedItem.onItemSelect) {
        selectedItem.onItemSelect(selectedItem.itemId, event);
      }
    }
  };

  handleArrowKeyUse = event => {
    event.preventDefault();
    const { keyCode } = event;
    const { items } = this.props;

    const nextItem = findNextFocusableItem(
      items,
      this.state.focusedElement,
      keyCode
    );

    if (nextItem) {
      this.changeFocusedElement(nextItem.itemId);
      this.scrollItems();
    }
  };

  handleListScroll = event => {
    event.preventDefault();
    if (this.props.onScroll) {
      this.props.onScroll(event);
    }
    this.enableHoverOnItems(150);
  };

  changeFocusedElement = id => {
    this.setState(
      {
        focusedElement: id
      },
      () => {
        const focusedItem = this.props.items.find(item => item.itemId === id);

        if (focusedItem && focusedItem.onItemFocus) {
          focusedItem.onItemFocus(focusedItem.itemdId);
        }
      }
    );
  };

  isItemSelectKeyCode = keyCode => {
    const { itemSelectKeyCodes } = this.props;

    if (itemSelectKeyCodes && itemSelectKeyCodes.includes(keyCode)) {
      return true;
    }

    return false;
  };

  scrollItems = () => {
    if (!this.listRef.current) {
      return;
    }
    const focusedElement = this.listRef.current.querySelector(
      `.lc-${baseClass}__list-item--focused`
    );

    if (focusedElement) {
      this.isHoverDisabled = true;
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
        this.listRef.current.scrollTop =
          itemOfsetTop - (itemOfsetTop % itemHeigth);
      }
    }

    this.enableHoverOnItems(150);
  };

  enableHoverOnItems(delayInMs) {
    if (this.hoverEnablerTimeout) {
      clearTimeout(this.hoverEnablerTimeout);
    }

    if (delayInMs) {
      this.hoverEnablerTimeout = setTimeout(() => {
        this.isHoverDisabled = false;
      }, delayInMs);
    } else {
      this.isHoverDisabled = false;
    }
  }

  isHoverDisabled = false;
  hoverEnablerTimeout = null;

  hoverCallbacks = [];

  listRef = React.createRef();

  render() {
    const {
      className,
      items,
      getItemBody,
      itemSelectKeyCodes,
      autoFocusOnItemsCountChange,
      keyboardEventsEnabled,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      styles[`${baseClass}__list`],
      className
    );

    return (
      <ul
        className={mergedClassNames}
        tabIndex={0}
        onScroll={this.handleListScroll}
        ref={this.listRef}
        {...restProps}
      >
        {items.map(
          ({ content, itemId, props, onItemFocus, ...itemRestProps }) => {
            const itemProps = {
              ...itemRestProps,
              itemId,
              isFocused: this.state.focusedElement === itemId,
              onMouseOverItem: this.getFocusedItemCallback(itemId)
            };

            if (this.props.getItemBody) {
              return this.props.getItemBody({
                ...itemProps,
                props: props || {},
                onItemFocus,
                content
              });
            }

            return (
              <DropdownListItem key={itemId} {...itemProps}>
                {content}
              </DropdownListItem>
            );
          }
        )}
      </ul>
    );
  }
}

DropdownList.propTypes = {
  /**
   * Specify which item should be focused after dropdown open
   */
  autoFocusedItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autoFocusOnItemsCountChange: PropTypes.bool,
  className: PropTypes.string,
  /**
   * use this property to enable/disable keyboard events of DropdownList
   */
  keyboardEventsEnabled: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      content: PropTypes.node,
      divider: PropTypes.bool,
      icon: PropTypes.node,
      onItemSelect: PropTypes.func,
      onItemFocus: PropTypes.func,
      isDisabled: PropTypes.bool,
      isSelected: PropTypes.bool,
      props: PropTypes.object
    })
  ).isRequired,
  getItemBody: PropTypes.func,
  onScroll: PropTypes.func,
  /**
   * you can specify which key press should trigger list item select
   */
  itemSelectKeyCodes: PropTypes.arrayOf(PropTypes.number)
};

DropdownList.defaultProps = {
  keyboardEventsEnabled: true,
  itemSelectKeyCodes: [KeyCodes.enter]
};

export default DropdownList;
