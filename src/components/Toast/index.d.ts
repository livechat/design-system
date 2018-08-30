export type ToastHorizontalPosition = 'left' | 'center' | 'right';
export type ToastVerticalPosition = 'top' | 'middle' | 'bottom';

export interface ToastProps {
    children?: string;
    className: string,
    id?: string;
    hideDelayTime?: number;
    horizontalPosition?: ToastHorizontalPosition;
    verticalPosition?: ToastVerticalPosition;
    fixed?: boolean;
    success?: boolean;
    warning?: boolean;
    error?: boolean;
    info?: boolean;
    onClose?(): void;
}