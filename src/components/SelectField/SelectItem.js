import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Checkbox from '../CheckboxField/Checkbox';
import styles from './style.scss';

const baseClass = 'select__item';
const cx = classNames.bind(styles);

const SelectItem = props => {
  const { isSelected, disabled, children, isFocused } = props;
  return (
    <li
      className={cx({
        [`${baseClass}`]: true,
        [`${baseClass}--selected`]: isSelected,
        [`${baseClass}--disabled`]: disabled,
        [`${baseClass}--focused`]: isFocused
      })}
      {...props}
    >
      <Checkbox
        className={styles[`${baseClass}-checkbox`]}
        checked={isSelected}
      />
      <div>{children}</div>
    </li>
  );
};

SelectItem.propTypes = {
  isSelected: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

export default SelectItem;
