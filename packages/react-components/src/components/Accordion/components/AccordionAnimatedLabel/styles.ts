import { css } from '@emotion/css';

import { TransitionDurationToken } from '../../../../foundations';

export const baseStyles = (containerHeight?: number) => css`
  display: flex;
  position: relative;
  align-items: center;
  transition: all var(${TransitionDurationToken.Fast2}) ease-in-out;
  min-height: 24px;

  ${containerHeight
    ? `
      height: ${containerHeight}px;
    `
    : `
      height: auto;
    `}
`;

export const element = (isVisible: boolean) => css`
  position: absolute;
  transition: all var(${TransitionDurationToken.Fast2}) ease-in-out;
  max-width: 100%;

  ${isVisible
    ? `
        opacity: 1;
      `
    : `
        opacity: 0;
      `}
`;
