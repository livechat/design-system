// <reference types="react" />

export enum ToastVariants {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Notification = 'notification'
}

export enum HorizontalPosition {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}

export enum VerticalPosition {
  Top = 'top',
  Bottom = 'bottom'
}

export interface IToastConsumerProps {
  verticalPosition: string;
  horizontalPosition: string;
  fixed?: boolean;
  animationType?: string;
}

export interface IToastProps {
  variant: ToastVariants,
  onClose?: () => any,
  removable?: boolean,
  action?: {
    handler(): any,
    label: string;
    closeOnClick?: boolean;
  }
}

export interface ToastWrapperProps {
  toasts: Array<{
    id?: string | number;
    content: React.ReactNode;
    variant: ToastVariants;
    autoHideDelayTime?: number;
    removable?: boolean;
    action?: {
      handler(): any,
      label: string;
      closeOnClick?: boolean;
    }
  }>;
  fixed?: boolean;
  block?: boolean;
  animationType?: string;
  verticalPosition: VerticalPosition;
  horizontalPosition: HorizontalPosition;
}

export var ToastConsumer: React.ComponentType<IToastConsumerProps>;
export var Toast: React.ComponentType<IToastProps>;
export var ToastWrapper: React.ComponentType<ToastWrapperProps>;
