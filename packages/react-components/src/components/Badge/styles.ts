import { css } from '@emotion/css';

import { DesignToken, SpacingToken } from '../../foundations';

import { IBadgeProps } from './types';

export const baseClass = 'badge';

export const baseStyles = (
  kind: IBadgeProps['kind'],
  size: IBadgeProps['size']
) => css`
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  line-height: 16px;
  font-size: 12px;
  font-weight: 600;

  .${baseClass}-dot {
    margin: 0 -2px;
    background-color: var(${DesignToken.ContentInvertPrimary});
  }

  & + & {
    margin-left: var(${SpacingToken.Spacing1});
  }

  ${kind === 'primary' &&
  `
    background-color: var(${DesignToken.SurfaceAccentEmphasisHighNegative});
    color: var(${DesignToken.ContentLockedWhite});

    .${baseClass}-dot {
      background-color: var(${DesignToken.ContentLockedWhite});
    }
  `}

  ${kind === 'secondary' &&
  `
    background-color: var(${DesignToken.SurfaceInvertSecondary});
    color: var(${DesignToken.ContentInvertPrimary});

    .${baseClass}-dot {
      background-color: var(${DesignToken.ContentLockedWhite});
    }
  `}

  ${kind === 'tertiary' &&
  `
    background-color: var(${DesignToken.SurfaceTertiaryDefault});
    color: var(${DesignToken.ContentBasicSecondary});

    .${baseClass}-dot {
      background-color: var(${DesignToken.ContentBasicPrimary});
    }
  `}

  ${size === 'large' &&
  `
    border-radius: 24px;
    padding: 4px 7px;
    min-width: 24px;
    height: 24px;

    .${baseClass}-dot {
      border-radius: 10px;
      width: 10px;
      height: 10px;
    }
  `}

  ${size === 'medium' &&
  `
    border-radius: 20px;
    padding: 2px 6px;
    min-width: 20px;
    height: 20px;

    .${baseClass}-dot {
      border-radius: 8px;
      width: 8px;
      height: 8px;
    }
  `}

  ${size === 'compact' &&
  `
    border-radius: 16px;
    padding: 1px 5px;
    min-width: 16px;
    height: 16px;

    .${baseClass}-dot {
      border-radius: 6px;
      width: 6px;
      height: 6px;
    }
  `}
`;
