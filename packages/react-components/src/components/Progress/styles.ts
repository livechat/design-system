import { css } from '@emotion/css';

import { DesignToken } from '../../foundations';

import { ProgressStatus, ProgressSize } from './constants';

export const progressBar = (size: ProgressSize, status: ProgressStatus) => css`
  display: inline-block;
  position: relative;
  border-radius: 100px;
  background-color: var(${DesignToken.ActionPrimaryDisabled});
  width: 100%;
  height: 4px;

  ${size === 'small' &&
  `
        height: 3px;
    `}

  ${size === 'medium' &&
  `
        height: 4px;
    `}

    ${size === 'large' &&
  `
        height: 6px;
    `}


    ${status === 'error' &&
  `
        background-color: var(${DesignToken.ActionNegativeDisabled});
    `}

    ${(status === 'success' || status === 'normal') &&
  `
        background-color: var(${DesignToken.SurfaceTertiaryDefault});
    `}
`;

export const indicator = (status: ProgressStatus) => css`
  ${status === 'success' &&
  `
        background-color: var(${DesignToken.ActionPositiveDefault});
        position: relative;
        transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
        border-radius: 100px;
        height: 100%;
    `}

  ${status === 'normal' &&
  `
        background-color: var(${DesignToken.ActionPrimaryDefault});
        position: relative;
        transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
        border-radius: 100px;
        height: 100%;
    `}
`;

export const progressCircle = (size: ProgressSize) => css`
  transform: rotate(-90deg);
  width: 36px;
  height: 36px;

  ${size === 'small' &&
  `
        width: 16px;
        height: 16px;
    `}

  ${size === 'medium' &&
  `
        width: 36px;
        height: 36px;
    `}

    ${size === 'large' &&
  `
        width: 56px;
        height: 56px;
    `}
`;

export const progressCircleBgLine = (status: ProgressStatus) => css`
  ${status === 'error' &&
  `
        stroke: var(${DesignToken.ActionNegativeDisabled});
    `}

  ${(status === 'success' || status === 'normal') &&
  `
        stroke: var(${DesignToken.SurfaceTertiaryDefault});
    `}
`;

export const progressCircleIndicator = (status: ProgressStatus) => css`
  ${status === 'success' &&
  `
        stroke: var(${DesignToken.ActionPositiveDefault});
        transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
    `}

  ${status === 'normal' &&
  `
        stroke: var(${DesignToken.ActionPrimaryDefault});
        transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
    `}

    ${status === 'error' &&
  `
        transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
    `}
`;
