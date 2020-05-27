// <reference types="react" />

export type ButtonSize = "compact" | "large";
export type ButtonIconPosition = "left" | "right";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
  destructive?: boolean;
  loading?: boolean;
  loaderLabel?: React.ReactNode;
  size?: ButtonSize;
  outline?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  submit?: boolean;
  accessibilityLabel?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  renderIcon?: string | React.ReactNode;
  ref?: React.Ref<HTMLButtonElement> | React.Ref<React.Component<IButtonProps>>;
  secondary?: boolean;
  text?: boolean;
  iconPosition?: ButtonIconPosition;
}

export var Button: React.ComponentType<IButtonProps>;
