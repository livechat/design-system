import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const RadioButton = props => {
  const { className, children, checked, disabled, ...restProps } = props;

  const baseClass = 'radio-button';
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--selected`]: checked,
      [`${baseClass}--disabled`]: disabled
    }),
    className
  );

  return (
    <label className={mergedClassNames}>
      <div className={styles[`${baseClass}__circle`]}>
        <span className={styles[`${baseClass}__inner-circle`]} />
        <input
          className={styles[`${baseClass}__input`]}
          {...restProps}
          type="radio"
          checked={checked}
          disabled={disabled}
        />
      </div>
      <div className={styles[`${baseClass}__label`]}>{children}</div>
    </label>
  );
};

RadioButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
};

export default RadioButton;
