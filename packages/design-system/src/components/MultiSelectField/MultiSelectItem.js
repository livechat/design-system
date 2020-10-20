import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import CheckIcon from 'react-material-icon-svg/dist/CheckIcon';
import styles from './style.scss';

const baseClass = 'multiselect-body';
const cx = classNames.bind(styles);

const SelectItem = props => {
  const { isSelected, children, isFocused, isToggleItem, itemTestId, ...restProps } = props;
  return (
    <li
      className={cx({
        [`${baseClass}__item`]: true,
        [`${baseClass}__item--selected`]: isSelected,
        [`${baseClass}__item--focused`]: isFocused,
        [`${baseClass}__item--toggle`]: isToggleItem
      })}
      data-testid={itemTestId}
      {...restProps}
    >
      <div className={styles[`${baseClass}__item-content`]}>{children}</div>
      <CheckIcon
        width="15px"
        height="15px"
        className={styles[`${baseClass}__checkmark`]}
      />
    </li>
  );
};

SelectItem.propTypes = {
  isSelected: PropTypes.bool,
  isFocused: PropTypes.bool,
  isToggleItem: PropTypes.bool,
  itemTestId: PropTypes.string,
  children: PropTypes.node
};

export default SelectItem;
