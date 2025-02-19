import { css } from '@emotion/css';

import { DesignToken } from '../../foundations';

export const SPINNER_CIRCLE_CLASS = 'spinner-circle-class';

export const loader = css`
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const spinner = (size: 'small' | 'medium' | 'large') => css`
  flex-shrink: 0;
  width: 36px;
  height: 36px;

  ${size === 'small' &&
  `
    width: 16px;
    height: 16px;

      .${SPINNER_CIRCLE_CLASS} {
        border-width: 2px;
      }
    `}

  ${size === 'medium' &&
  `
    width: 36px;
    height: 36px;

      .${SPINNER_CIRCLE_CLASS} {
        border-width: 3px;
      }
  `}

  ${size === 'large' &&
  `
    width: 42px;
    height: 42px;

      .${SPINNER_CIRCLE_CLASS} {
        border-width: 4px;
      }
  `}
`;

export const spinnerCircle = (
  secondaryColor?: string,
  primaryColor?: string
) => css`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(1turn);
    }
  }

  box-sizing: border-box;
  border-width: 3px;
  border-style: solid;
  border-radius: 50%;
  border-color: ${secondaryColor || `var(${DesignToken.BorderBasicSecondary})`};
  border-top-color: ${primaryColor ||
  `var(${DesignToken.ActionPrimaryDefault})`};
  width: 100%;
  height: 100%;
  animation: rotate 1s infinite linear;
`;

export const loaderLabel = css`
  margin-left: 10px;
  color: var(${DesignToken.ContentBasicSecondary});
`;
