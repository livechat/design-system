import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import DropdownListItem from './DropdownListItem';
import { KeyCodes } from '../../constants/keyCodes';

const baseClass = 'dropdown';

class DropdownList extends React.PureComponent {
  static defaultProps = {
    selected: []
  };

  state = {
    focusedElement: null
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown);
    this.listRef.current.focus();
  }

  componentWillUnmount() {
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

  getFocusedItemIndex = itemKey =>
    this.props.items.map(item => item.id).indexOf(itemKey);

  getHoveredItemCallback = itemKey => {
    if (!this.hoverCallbacks[itemKey]) {
      this.hoverCallbacks[itemKey] = () => {
        this.changeFocusedElement(itemKey);
      };
    }

    return this.hoverCallbacks[itemKey];
  };

  handleEnterKeyUse = () => {
    const { focusedElement } = this.state;

    if (focusedElement !== null) {
      const selectedItem = this.props.items.find(
        item => item.id === focusedElement
      );

      if (selectedItem) {
        selectedItem.onSelect();
      }
    }
  };

  handleArrowKeyUse = event => {
    event.preventDefault();
    const { keyCode } = event;
    const { items } = this.props;
    const currentItemIndex = this.getFocusedItemIndex(
      this.state.focusedElement
    );

    if (keyCode === KeyCodes.arrowUp) {
      if (currentItemIndex > 0) {
        this.changeFocusedElement(items[currentItemIndex - 1].id);
      } else {
        this.changeFocusedElement(items[items.length - 1].id);
      }
    }

    if (keyCode === KeyCodes.arrowDown) {
      if (currentItemIndex === items.length - 1) {
        this.changeFocusedElement(items[0].id);
      } else if (currentItemIndex + 1 < items.length) {
        this.changeFocusedElement(items[currentItemIndex + 1].id);
      }
    }

    this.scrollItems();
  };

  changeFocusedElement = id => {
    this.setState({
      focusedElement: id
    });
  };

  scrollItems = () => {
    const focusedElement = this.listRef.current.querySelector(
      `.lc-${baseClass}__list-item--focused`
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
        this.listRef.current.scrollTop =
          itemOfsetTop - (itemOfsetTop % itemHeigth);
      }
      this.timerId = setTimeout(
        () => this.listRef.current.classList.remove('disable-hover'),
        100
      );
    }
  };

  isItemSelected = id => this.props.selected.some(itemId => itemId === id);

  hoverCallbacks = [];

  listRef = React.createRef();

  render() {
    const { className, items, ...restProps } = this.props;

    const mergedClassNames = getMergedClassNames(
      styles[`${baseClass}__list`],
      className
    );

    return (
      <ul
        className={mergedClassNames}
        tabIndex={0}
        ref={this.listRef}
        {...restProps}
      >
        {items.map(({ content, id, onSelect, ...itemProps }) => (
          <DropdownListItem
            {...itemProps}
            key={id}
            id={String(id)}
            itemId={id}
            onSelect={onSelect}
            isFocused={this.state.focusedElement === id}
            onMouseEnter={this.getHoveredItemCallback(id)}
            isSelected={this.isItemSelected(id)}
          >
            {content}
          </DropdownListItem>
        ))}
      </ul>
    );
  }
}

DropdownList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      content: PropTypes.node.isRequired,
      divider: PropTypes.bool,
      dragable: PropTypes.bool,
      icon: PropTypes.node,
      onSelect: PropTypes.func.isRequired
    })
  ).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
};

export default DropdownList;
