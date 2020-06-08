// <reference types="react" />

export type ButtonSize = "compact" | "large";
export type ButtonIconPosition = "left" | "right";
export type ButtonKind = "primary" | "destructive" | "secondary" | "text";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  kind?: ButtonKind;
  loading?: boolean;
  loaderLabel?: React.ReactNode;
  size?: ButtonSize;
  outline?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: ButtonIconPosition;
  submit?: boolean;
  accessibilityLabel?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  renderIcon?: string | React.ReactNode;
  ref?: React.Ref<HTMLButtonElement> | React.Ref<React.Component<IButtonProps>>;
  /**
   * @deprecated 0.9.0, use kind prop instead; primary will stop working in '@livechat/design-system 1.0.0'
   * @see https://developers.livechat.com/docs/design-system/#!/Button
   */
  primary?: boolean;
  /**
   * @deprecated 0.9.0, use kind prop instead; destructive will stop working in '@livechat/design-system 1.0.0'
   * @see https://developers.livechat.com/docs/design-system/#!/Button
   */
  destructive?: boolean;
  /**
   * @deprecated 0.9.0, use kind prop instead; secondary will stop working in '@livechat/design-system 1.0.0'
   * @see https://developers.livechat.com/docs/design-system/#!/Button
   */
  secondary?: boolean;
}

export var Button: React.ComponentType<IButtonProps>;
