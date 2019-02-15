import * as React from 'react';
import * as PropTypes from 'prop-types';
import cssClassNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import DropdownListItem from './DropdownListItem';

const cx = cssClassNames.bind(styles);

const baseClass = 'dropdown';

class DropdownList extends React.PureComponent {
  isItemSelected = (id, selectable) =>
    selectable &&
    this.props.selected &&
    this.props.selected.some(itemId => itemId === id);

  render() {
    const { className, items, ...restProps } = this.props;

    const mergedClassNames = getMergedClassNames(
      cx(styles[`${baseClass}`], styles[`${baseClass}__list`]),
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
