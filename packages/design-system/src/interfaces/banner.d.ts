import { MouseEventHandler } from "react";

export type BannerSize = 'small' | 'medium' |'large';
export type BannerType = 'info' | 'warning' | 'success' | 'error'

export interface IBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: MouseEventHandler<HTMLButtonElement>;
  size?: BannerSize;
  text: string;
  type?: BannerType;
}

export var Banner: React.ComponentType<IBannerProps>;
