import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.css';

const cx = classNames.bind(styles);
const noop = () => {};

const Button = props => {
  const {
    children,
    id,
    primary,
    destructive,
    disabled,
    loading,
    size,
    fullWidth,
    submit,
    onClick,
    onFocus,
    onBlur,
    className
  } = props;

  const isDisabled = disabled || loading;
  const type = submit ? 'submit' : 'button';
  let buttonType = null;
  let buttonSize = null;

  if (primary) {
    buttonType = 'primary';
  } else if (destructive) {
    buttonType = 'destructive';
  }

  if (size === 'large') {
    buttonSize = 'large';
  } else if (size === 'compact') {
    buttonSize = 'compact';
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={isDisabled}
      role={loading ? 'alert' : undefined}
      aria-busy={loading ? true : undefined}
      className={cx({
        btn: true,
        'btn-fw': fullWidth,
        'btn-primary': buttonType === 'primary',
        'btn-destructive': buttonType === 'destructive',
        'btn-lg': buttonSize === 'large',
        'btn-sm': buttonSize === 'compact'
      })}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  /**
   * Content of button, i.e. text
   */
  children: PropTypes.string.isRequired,
  /**
   * ID of html element
   */
  id: PropTypes.string,
  /**
   * Type of button
   */
  primary: PropTypes.bool,
  /**
   * Type of button
   */
  destructive: PropTypes.bool,
  /**
   * Html disabled property
   */
  disabled: PropTypes.bool,
  /**
   * Show/hide loading state
   */
  loading: PropTypes.bool,
  /**
   * Size of button: compact, regular, large
   */
  size: PropTypes.oneOf(['compact', 'large']),
  /**
   * Sets button width to max-width=320px
   */
  fullWidth: PropTypes.bool,
  /**
   * Click button handler
   */
  onClick: PropTypes.func,
  /**
   * Focus button handler
   */
  onFocus: PropTypes.func,
  /**
   * Blur button handler
   */
  onBlur: PropTypes.func,
  submit: PropTypes.bool,
  className: PropTypes.string
};

Button.defaultProps = {
  id: null,
  primary: false,
  destructive: false,
  disabled: false,
  loading: false,
  size: null,
  fullWidth: false,
  onClick: noop,
  onFocus: noop,
  onBlur: noop,
  submit: false,
  className: null
};

export default Button;
