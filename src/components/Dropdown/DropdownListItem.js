import * as React from 'react';
import * as PropTypes from 'prop-types';
import cssClassNames from 'classnames/bind';
import CheckIcon from 'react-material-icon-svg/dist/CheckIcon';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = cssClassNames.bind(styles);

const baseClass = 'dropdown__list-item';

const noop = () => {};

class DropdownListItem extends React.PureComponent {
  handleClick = e => {
    if (this.props.selectable) {
      this.props.onSelect(this.props.itemId);
    }
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render() {
    const {
      className,
      icon,
      itemId,
      children,
      isFocused,
      isSelected,
      selectable,
      onSelect,
      onClick,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      cx({
        [`${baseClass}`]: true,
        [`${baseClass}--selected`]: isSelected,
        [`${baseClass}--focused`]: isFocused
      }),
      className
    );

    return (
      <li
        className={mergedClassNames}
        {...restProps}
        onClick={this.handleClick}
      >
        {icon}
        <div>{children}</div>
        {selectable && (
          <CheckIcon
            width="15px"
            height="15px"
            className={styles[`${baseClass}__checkmark`]}
          />
        )}
      </li>
    );
  }
}

DropdownListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.node,
  itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
  divider: PropTypes.bool,
  dragable: PropTypes.bool,
  selectable: PropTypes.bool,
  onClick: PropTypes.func,
  onSelect: PropTypes.func
};

DropdownListItem.defaultProps = {
  onClick: noop
};

export default DropdownListItem;
