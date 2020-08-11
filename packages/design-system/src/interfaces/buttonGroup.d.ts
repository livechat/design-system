// <reference types="react" />
import { ButtonSize } from './buttons';

export interface IButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
  className?: string;
  currentIndex?: number;
  size?: ButtonSize;
  children: React.ReactNode;
  onIndexChange?: (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
}

export var ButtonGroup: React.ComponentType<IButtonGroupProps>;
