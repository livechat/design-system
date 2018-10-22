import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { CheckIcon } from 'react-material-icon-svg';
import Checkbox from '../CheckboxField/Checkbox';
import styles from './style.scss';

const baseClass = 'select';
const cx = classNames.bind(styles);

const SelectItem = props => {
  const { isSelected, disabled, children, isFocused } = props;
  return (
    <li
      className={cx({
        [`${baseClass}__item`]: true,
        [`${baseClass}__item--selected`]: isSelected,
        [`${baseClass}__item--disabled`]: disabled,
        [`${baseClass}__item--focused`]: isFocused
      })}
      {...props}
    >
      <CheckIcon className={styles[`${baseClass}__checkmark`]} />
      <div>{children}</div>
    </li>
  );
};

SelectItem.propTypes = {
  isSelected: PropTypes.bool,
  isFocused: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

export default SelectItem;
