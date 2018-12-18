// <reference types="react" />

export type ButtonSize = 'compact' | 'large';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  primary?: boolean;
  destructive?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  outline?: boolean;
  fullWidth?: boolean;
  icon?: any;
  submit?: boolean;
  accessibilityLabel?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  renderIcon?: string | React.ReactNode;
}

export var Button: React.ComponentType<IButtonProps>;
