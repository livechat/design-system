import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import DropdownListItem from './DropdownListItem';
import { KeyCodes } from '../../constants/keyCodes';

const baseClass = 'dropdown';

class DropdownList extends React.PureComponent {
  state = {
    focusedElement: null
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown);
  }

  onKeydown = event => {
    const { keyCode } = event;

    if (keyCode === KeyCodes.arrowDown || keyCode === KeyCodes.arrowUp) {
      this.handleArrowKeyUse(event);
    }

    if (keyCode === KeyCodes.enter) {
      this.handleEnterKeyUse(event);
    }
  };

  handleEnterKeyUse = () => {
    const { focusedElement } = this.state;

    if (focusedElement !== null) {
      this.props.onSelect(focusedElement);
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
      }
    }

    if (keyCode === KeyCodes.arrowDown && currentItemIndex + 1 < items.length) {
      this.changeFocusedElement(items[currentItemIndex + 1].id);
    }

    // this.scrollItems();
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

  changeFocusedElement = id => {
    this.setState({
      focusedElement: id
    });
  };

  isItemSelected = (id, selectable) =>
    selectable &&
    this.props.selected &&
    this.props.selected.some(itemId => itemId === id);

  hoverCallbacks = [];

  render() {
    const { className, items, ...restProps } = this.props;

    const mergedClassNames = getMergedClassNames(
      styles[`${baseClass}__list`],
      className
    );

    return (
      <ul className={mergedClassNames} {...restProps}>
        {items.map(({ content, id, ...itemProps }) => (
          <DropdownListItem
            {...itemProps}
            key={id}
            id={String(id)}
            itemId={id}
            onSelect={this.props.onSelect}
            isFocused={this.state.focusedElement === id}
            onMouseEnter={this.getHoveredItemCallback(id)}
            isSelected={this.isItemSelected(id, itemProps.selectable)}
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
      selectable: PropTypes.bool,
      onClick: PropTypes.func
    })
  ).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onSelect: PropTypes.func
};

export default DropdownList;
