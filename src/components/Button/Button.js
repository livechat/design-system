import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from '../../styled';

const noop = () => {};

const StyledButton = styled.button`
  position: relative;
  display: ${props => (props.fullWidth ? 'flex' : 'inline-flex')};
  width: ${props => (props.fullWidth ? '100%' : '')};
  max-width: 320px;
  align-items: center;
  justify-content: center;
  user-select: none;
  text-decoration: none;
  transition-property: opacity, border, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
  border-width: 1px;
  border-style: solid;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 0;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .icon {
    color: #4384f5;
    margin-right: 7px;
  }

  ${props => {
    if (props.primary) {
      return `
        background-color: #4384f5;
        color: #fff;
        border-color: #4384f5;
        &:focus {
          box-shadow: 0 0 0 1px #427fe1;
        }
      `;
    } else if (props.destructive) {
      return `
        background-color: #f4574c;
        color: #fff;
        border-color: #f4574c;
        &:focus {
          box-shadow: 0 0 0 1px #f4574c;
        }
      `;
    }
    return `
      background-color: #fff;
      color: rgba(66,77,87,1);
      border-color: #bcc6d0;
      &:focus {
        box-shadow: 0 0 0 1px #427fe1;
      }
    `;
  }};

  ${props => {
    if (props.size === 'large') {
      return `
        font-size: 15px;
        padding: 0 24px;
        min-weight: 42px;
        min-height: 42px;
        line-height: 42px;
      `;
    } else if (props.size === 'compact') {
      return `
        font-size: 14px;
        padding: 0 16px;
        min-weight: 32px;
        min-height: 32px;
        line-height: 32px;
      `;
    }
    return `
      font-size: 15px;
      padding: 0 16px;
      min-weight: 36px;
      min-height: 36px;
      line-height: 36px;
    `;
  }};
`;

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

  return (
    <StyledButton
      id={id}
      primary={primary}
      type={type}
      destructive={destructive}
      onClick={onClick}
      onFocus={onFocus}
      size={size}
      onBlur={onBlur}
      disabled={isDisabled}
      role={loading ? 'alert' : undefined}
      aria-busy={loading ? true : undefined}
      fullWidth={fullWidth}
      className={className}
    >
      {children}
    </StyledButton>
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
