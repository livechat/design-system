// <reference types="react" />

export type ButtonSize = "compact" | "large";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
  destructive?: boolean;
  loading?: boolean;
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
}

export var Button: React.ComponentType<IButtonProps>;
