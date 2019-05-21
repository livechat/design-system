import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import DropdownListItem from './DropdownListItem';
import { KeyCodes } from '../../constants/keyCodes';
import findNextFocusableItem from '../../helpers/find-next-focusable-item';

const baseClass = 'dropdown';

class DropdownList extends React.PureComponent {
  state = {
    focusedElement: null
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    document.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown = event => {
    const { keyCode } = event;

    if (keyCode === KeyCodes.arrowDown || keyCode === KeyCodes.arrowUp) {
      this.handleArrowKeyUse(event);
    }

    if (keyCode === KeyCodes.enter) {
      this.handleEnterKeyUse();
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

  handleEnterKeyUse = () => {
    const { focusedElement } = this.state;

    if (focusedElement !== null) {
      const selectedItem = this.props.items.find(
        item => item.itemId === focusedElement
      );

      if (selectedItem && selectedItem.onItemSelect) {
        selectedItem.onItemSelect(selectedItem.itemId);
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
    this.timeout = setTimeout(() => {
      this.isHoverDisabled = false;
    }, 150);
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
  };

  isHoverDisabled = false;
  timeout = null;

  hoverCallbacks = [];

  listRef = React.createRef();

  render() {
    const { className, items, getItemBody, ...restProps } = this.props;

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
  className: PropTypes.string,
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
  onScroll: PropTypes.func
};

export default DropdownList;
