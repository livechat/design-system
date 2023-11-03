import { CSSProperties } from 'react';

import { IconKind } from '../Icon';

import { TooltipTheme } from './types';

export function getIconType(theme: TooltipTheme): IconKind {
  switch (theme) {
    case 'invert':
      return 'inverted';
    default:
      return 'primary';
  }
}

export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export function getArrowStyles(
  arrowOffsetY?: number,
  arrowOffsetX?: number,
  arrowY?: number,
  arrowX?: number
): CSSProperties | undefined {
  if (arrowOffsetY && arrowY) {
    const arrowYPosition = arrowY + arrowOffsetY;

    return {
      top: arrowYPosition,
    };
  }

  if (arrowOffsetX && arrowX) {
    const arrowXPosition = arrowX + arrowOffsetX;

    return {
      left: arrowXPosition,
    };
  }

  return;
}
