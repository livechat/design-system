import { css } from '@emotion/css';

import { Size } from 'utils';

import { DesignToken, RadiusToken, SpacingToken } from '../../foundations';

export const tabs = css`
  position: relative;
  border-bottom: 1px solid var(${DesignToken.BorderBasicTertiary});
`;

export const tabsList = css`
  display: flex;
  position: relative;
  flex-direction: row;
  margin: 0 -8px;
`;

export const tab = (
  size?: Size,
  isSelected?: boolean,
  disabled?: boolean
) => css`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  transition: color 0.25s;
  margin: 0 var(${SpacingToken.Spacing2});
  outline: none;
  border: 0;
  background: none;
  cursor: pointer;
  padding: 0 var(${SpacingToken.Spacing3}) 1px;
  overflow: visible;
  color: var(${DesignToken.ContentBasicPrimary});

  &::before {
    display: block;
    position: absolute;
    right: 0;
    bottom: -2px;
    left: 0;
    z-index: 1;
    border-radius: var(${RadiusToken.Radius3});
    background-color: var(${DesignToken.ActionPrimaryDefault});
    height: 0;
    content: '';
  }

  ${!disabled &&
  `
    &:hover {
      text-decoration: none;
      color: var(${DesignToken.ActionPrimaryDefault});

      /* Target only the tabCount class specifically */
      .${tabCount()} {
        color: var(${DesignToken.ActionPrimaryDefault});
      }
    }
  `}

  ${disabled &&
  `
    cursor: not-allowed;
    color: var(${DesignToken.ContentBasicDisabled});

      &:hover {
      color: var(${DesignToken.ContentBasicDisabled});
    }
  `}

  ${isSelected &&
  `
    color: var(${DesignToken.ActionPrimaryDefault});

    &::before {
      height: 3px;
    }
  `}

  ${size === 'compact' &&
  `
    height: 32px;
  `}

  ${size === 'medium' &&
  `
    height: 40px;
  `}

  ${size === 'large' &&
  `
    height: 48px;
  `}
`;

export const tabIcon = css`
  margin-right: var(${SpacingToken.Spacing1});
`;

export const tabCount = (isSelected?: boolean, disabled?: boolean) => css`
  display: inline-block;
  transition: color 0.25s;
  padding-left: 3px;
  color: var(${DesignToken.ContentBasicSecondary});

  ${isSelected &&
  `
    color: var(${DesignToken.ActionPrimaryDefault});
  `}

  ${disabled &&
  `
    color: var(${DesignToken.ContentBasicDisabled});
  `}
`;

export const tabBadge = css`
  margin-left: var(${SpacingToken.Spacing1});
`;
