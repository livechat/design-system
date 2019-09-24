import * as React from 'react';
import * as PropTypes from 'prop-types';
import cssClassNames from 'classnames/bind';
import CheckIcon from 'react-material-icon-svg/dist/CheckIcon';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = cssClassNames.bind(styles);

const baseClass = 'dropdown__list-item';

class DropdownListItem extends React.PureComponent {
  handleClick = event => {
    if (!this.props.isDisabled && this.props.onItemSelect) {
      event.nativeEvent.stopImmediatePropagation();
      this.props.onItemSelect(this.props.itemId, event);
    }
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleMouseOver = event => {
    if (!this.props.isDisabled && this.props.onMouseOverItem) {
      this.props.onMouseOverItem(this.props.itemId);
    }
    if (this.props.onMouseOver) {
      this.props.onMouseOver(event);
    }
  };

  handleMouseDown = event => {
    event.preventDefault();
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
    return false;
  };

  render() {
    const {
      className,
      icon,
      itemId,
      children,
      isFocused,
      isSelected,
      onItemSelect,
      isDisabled,
      onMouseOverItem,
      divider,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      cx({
        [`${baseClass}`]: true,
        [`${baseClass}--selected`]: isSelected,
        [`${baseClass}--focused`]: isFocused && !isDisabled,
        [`${baseClass}--disabled`]: isDisabled,
        [`${baseClass}--with-divider`]: divider
      }),
      className
    );

    return (
      <li
        {...restProps}
        className={mergedClassNames}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseDown={this.handleMouseDown}
      >
        <div className={styles[`${baseClass}__content`]}>
          {icon && <div className={styles[`${baseClass}__icon`]}>{icon}</div>}
          <div className={styles[`${baseClass}__title`]}>{children}</div>
        </div>
        {isSelected && (
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
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.node,
  itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
  divider: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onItemSelect: PropTypes.func,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOverItem: PropTypes.func,
  onMouseDown: PropTypes.func
};

export default DropdownListItem;
