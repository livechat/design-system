// <reference types="react" />
import { ButtonSize } from "./buttons";

export interface IButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
  className?: string;
  currentIndex?: number;
  size: ButtonSize;
  children: React.ReactNode;
  onIndexChange?: (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => void;
}

export var ButtonGroup: React.ComponentType<IButtonGroupProps>;
