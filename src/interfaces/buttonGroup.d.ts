// <reference types="react" />
import { ButtonSize } from "./buttons";

export interface IButtonGroupProps {
  fullWidth?: boolean;
  currentIndex?: number;
  size: ButtonSize;
  children: React.ReactNode;
  onChange?: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
}

export var ButtonGroup: React.ComponentType<IButtonGroupProps>;
