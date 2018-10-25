// <reference types="react" />

export type ToastVariant = 'info' | 'success' | 'warning' | 'error' | 'notification';

export type HorizontalPosition = 'top' | 'bottom';

export type VerticalPosition = 'top' | 'bottom';

export interface IToastConsumerProps {
  verticalPosition: string;
  horizontalPosition: string;
  fixed?: boolean;
  animationType?: string;
  name?: string;
}

export interface IToastProps {
  variant: ToastVariant,
  onClose?: () => any,
  removable?: boolean,
  action?: {
    handler(): any,
    label: string;
    closeOnClick?: boolean;
  }
}

export interface IToastWrapperProps {
  toasts: Array<{
    id?: string | number;
    content: React.ReactNode;
    variant: ToastVariant;
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
export var ToastWrapper: React.ComponentType<IToastWrapperProps>;
