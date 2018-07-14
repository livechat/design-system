import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from '../../styled';

const StyledButton = styled.button`
  position: relative;
  display: ${props => (props.fullWidth ? 'flex' : 'inline-flex')};
  width: ${props => (props.fullWidth ? '100%' : '')};
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition-property: opacity, border, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
  border: 1px solid ${props => (props.primary ? '#4384f5' : '#bcc6d0')};
  line-height: 1;
  min-height: 36px;
  min-width: 104px;
  border-radius: 4px;
  color: ${props => (props.primary ? '#fff' : 'rgba(66,77,87,1)')};
  font-size: 15px;
  font-weight: 600;
  padding: 0 16px;

  background-color: ${props => (props.primary ? '#4384f5' : '#fff')};

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 1px #427fe1;
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
    if (props.destructive) {
      return `
        background-color: #f4574c;
        color: #fff;
        border-color: #f4574c;
        box-shadow: 0 0 0 1px #f4574c;
      `;
    }
    return '';
  }}
`;

const Button = ({
  children,
  id,
  primary,
  destructive,
  disabled,
  loading,
  size,
  outline,
  fullWidth,
  icon,
  submit,
  accessibilityLabel,
  ariaControls,
  ariaExpanded,
  onClick,
  onFocus,
  onBlur,
  renderIcon
}) => {
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
      onBlur={onBlur}
      disabled={isDisabled}
      aria-label={accessibilityLabel}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      role={loading ? 'alert' : undefined}
      aria-busy={loading ? true : undefined}
      fullWidth={fullWidth}
    >
      {renderIcon && <span className="icon">{renderIcon}</span>}
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  /**
   * Content of button, i.e. text
   */
  children: PropTypes.string,
  id: PropTypes.string,
  primary: PropTypes.bool,
  destructive: PropTypes.bool,
  // disabled?: boolean;
  // loading?: boolean;
  // size?: Size;
  // outline?: boolean;
  // fullWidth?: boolean;
  // icon?: any;
  // submit?: boolean;
  // accessibilityLabel?: string;
  // ariaControls?: string;
  // ariaExpanded?: boolean;
  // onClick?(): void;
  // onFocus?(): void;
  // onBlur?(): void;
  // renderIcon?: string | React.ReactNode
}

export default Button;
