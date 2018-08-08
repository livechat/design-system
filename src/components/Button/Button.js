import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.css';

const cx = classNames.bind(styles);
const acceptedSizes = ['large', 'compact'];

const Button = props => {
  const {
    children,
    primary,
    destructive,
    disabled,
    loading,
    size,
    fullWidth,
    submit,
    accessibilityLabel,
    ariaControls,
    ariaExpanded,
    ...buttonProps
  } = props;

  const isDisabled = disabled || loading;
  const type = submit ? 'submit' : 'button';
  let buttonType = null;

  if (primary) {
    buttonType = 'primary';
  } else if (destructive) {
    buttonType = 'destructive';
  }

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={isDisabled}
      role={loading ? 'alert' : undefined}
      aria-busy={loading ? true : undefined}
      aria-label={accessibilityLabel}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      className={cx({
        btn: true,
        'btn--full-width': fullWidth,
        'btn--primary': buttonType === 'primary',
        'btn--destructive': buttonType === 'destructive',
        [`btn--${size}`]: acceptedSizes.some(s => s === size)
      })}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  /**
   * Type of button
   */
  primary: PropTypes.bool,
  /**
   * Type of button
   */
  destructive: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  /**
   * Size of button
   */
  size: PropTypes.oneOf(['compact', 'large']),
  /**
   * Sets button width to max-width=320px
   */
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  submit: PropTypes.bool,
  className: PropTypes.string,
  accessibilityLabel: PropTypes.string,
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.string
};

export default Button;
