// <reference types="react" />

export type ButtonSize = 'compact' | 'large';

export interface IButtonProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
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

export var Button: React.ComponentType<IButtonProps>;
