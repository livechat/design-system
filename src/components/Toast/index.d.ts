<<<<<<< HEAD
export type ToastHorizontalPosition = 'left' | 'center' | 'right';
export type ToastVerticalPosition = 'top' | 'middle' | 'bottom';

export interface ToastProps {
    children?: string;
    className: string,
    id?: string;
    autoHideDuration?: number;
    horizontalPosition?: ToastHorizontalPosition;
    verticalPosition?: ToastVerticalPosition;
    fixed?: boolean;
=======
import * as React from 'react';

export interface ButtonProps {
    children?: string;
    id?: string;
>>>>>>> All toasts
    success?: boolean;
    warning?: boolean;
    error?: boolean;
    info?: boolean;
<<<<<<< HEAD
    onClose?(): void;
=======
    onClick?(): void;
    onFocus?(): void;
    onBlur?(): void;
    renderIcon?: string | React.ReactNode;
>>>>>>> All toasts
}
