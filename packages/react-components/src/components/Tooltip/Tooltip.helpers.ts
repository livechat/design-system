import { CSSProperties } from 'react';

import { IconKind } from '../Icon';

import { TooltipTheme } from './types';

export function getIconType(theme: TooltipTheme): IconKind {
  switch (theme) {
    case 'invert':
      return 'inverted';
    case 'important':
      return 'lock-black';
    default:
      return 'primary';
  }
}

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

export const getArrowTokens = (tooltipStyle: string | undefined) => {
  switch (tooltipStyle) {
    case 'invert':
      return {
        stroke: 'var(--tooltip-background-invert)',
        fill: 'var(--tooltip-background-invert)',
      };
    case 'important':
      return {
        stroke: 'var(--surface-accent-emphasis-high-warning)',
        fill: 'var(--surface-accent-emphasis-high-warning)',
      };
    default:
      return {
        stroke: 'var(--tooltip-border-for-svg)',
        fill: 'var(--tooltip-background-basic)',
      };
  }
};
