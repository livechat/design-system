import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const RadioButton = props => {
  const { className, children, checked, disabled, id, ...restProps } = props;

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
    <label className={mergedClassNames} htmlFor={id}>
      <div className={styles[`${baseClass}__circle`]}>
        <span className={styles[`${baseClass}__inner-circle`]} />
        <input
          className={styles[`${baseClass}__input`]}
          {...restProps}
          type="radio"
          id={id}
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
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  checked: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
};

RadioButton.defaultProps = {
  onChange: () => {}
};

export default RadioButton;
