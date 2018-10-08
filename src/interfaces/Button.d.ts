// <reference types="react" />

export type ButtonSize = 'compact' | 'large';

export interface IButtonProps {
  children?: string;
  id?: string;
  primary?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  outline?: boolean;
  fullWidth?: boolean;
  icon?: any;
  submit?: boolean;
  accessibilityLabel?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  onClick?(): void;
  onFocus?(): void;
  onBlur?(): void;
  renderIcon?: string | React.ReactNode;
}

/* eslint-disable */
export var Button: React.ComponentType<IButtonProps>;
