import * as React from 'react';

export interface ButtonProps {
    children?: string;
    id?: string;
    success?: boolean;
    warning?: boolean;
    error?: boolean;
    info?: boolean;
    onClick?(): void;
    onFocus?(): void;
    onBlur?(): void;
    renderIcon?: string | React.ReactNode;
}
