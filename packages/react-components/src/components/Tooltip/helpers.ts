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

export function getArrowPositionStyles(
  arrowOffsetY?: number,
  arrowOffsetX?: number,
  arrowY?: number,
  arrowX?: number
): CSSProperties | undefined {
  if (arrowY) {
    const arrowYPosition = arrowOffsetY ? arrowY + arrowOffsetY : arrowY;

    return {
      top: arrowYPosition,
    };
  }

  if (arrowX) {
    const arrowXPosition = arrowOffsetX ? arrowX + arrowOffsetX : arrowX;

    return {
      left: arrowXPosition,
    };
  }

  return;
}
