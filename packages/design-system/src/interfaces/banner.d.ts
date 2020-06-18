// <reference types="react" />

export type BannerSize = 'small' | 'medium' |'large';
export type BannerType = 'info' | 'warning' | 'success' | 'error'

export interface IBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  size?: BannerSize;
  children: React.ReactNode;
  type: BannerType;
}

export var Banner: React.ComponentType<IBannerProps>;
