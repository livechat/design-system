import { css } from '@emotion/css';

import {
  DesignToken,
  RadiusToken,
  ShadowToken,
  SpacingToken,
  TransitionDurationToken,
} from '../../foundations';

export const baseStyles = (isPromo?: boolean) => css`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  transition: all var(${TransitionDurationToken.Moderate1});
  border-radius: var(${RadiusToken.Radius4});
  box-shadow: unset;
  width: 100%;
  min-height: 24px;

  ${isPromo
    ? `
    border: 1px solid var(${DesignToken.BorderBasicSecondary});
    background-color: var(${DesignToken.SurfacePrimaryDefault});
  `
    : `
    border: 1px solid transparent;
    background-color: var(${DesignToken.SurfaceSecondaryDefault});
  `}

  &:focus-visible {
    outline: 0;
    box-shadow: var(${ShadowToken.Focus});
  }

  &:hover {
    border-color: var(${DesignToken.BorderBasicHover});
    box-shadow: var(${ShadowToken.Float});
  }
`;

export const kind = (kind?: string) => css`
  ${kind === 'warning' &&
  `
    background-color: var(${DesignToken.SurfaceAccentEmphasisMinWarning});

    &:hover {
      border-color: var(${DesignToken.BorderBasicWarning});
    }
  `}

  ${kind === 'error' &&
  `
    background-color: var(${DesignToken.SurfaceAccentEmphasisMinNegative});

    &:hover {
      border-color: var(${DesignToken.ContentBasicNegative});
    }
  `}
`;

export const open = css`
  border: 1px solid var(${DesignToken.ActionPrimaryDefault});
  box-shadow: var(${ShadowToken.Float});
  background-color: var(${DesignToken.SurfacePrimaryDefault});

  &:hover {
    border-color: var(${DesignToken.ActionPrimaryDefault});
  }
`;

export const label = (isPromo?: boolean) => css`
  margin: 0;

  ${isPromo
    ? `
    padding: var(${SpacingToken.Spacing6}) var(${SpacingToken.Spacing12}) var(${SpacingToken.Spacing6}) var(${SpacingToken.Spacing6});
  `
    : `
    padding: var(${SpacingToken.Spacing5}) var(${SpacingToken.Spacing12}) var(${SpacingToken.Spacing5}) var(${SpacingToken.Spacing5});
  `}

  &:hover {
    cursor: pointer;
  }
`;

export const chevron = (isOpen?: boolean, isPromo?: boolean) => css`
  position: absolute;
  right: 20px;
  transition: inherit;
  pointer-events: none;

  ${isPromo
    ? `
    top: 26px;
  `
    : `
    top: 22px;
  `}

  ${isOpen &&
  `
    transform: rotate(180deg);
  `}
`;

export const content = css`
  transition: inherit;
  height: 100%;
  overflow: hidden;
`;

export const contentInner = (isOpen?: boolean, isPromo?: boolean) => css`
  transition: all var(${TransitionDurationToken.Moderate1});

  ${isOpen
    ? `
    opacity: 1;
  `
    : `
    opacity: 0;
  `}

  ${isPromo
    ? `
    padding: 0 var(${SpacingToken.Spacing12}) var(${SpacingToken.Spacing6}) var(${SpacingToken.Spacing6});
  `
    : `
    padding: 0 var(${SpacingToken.Spacing12}) var(${SpacingToken.Spacing5}) var(${SpacingToken.Spacing5});
  `}
`;

export const footer = (isPromo?: boolean) => css`
  border-top: 1px solid var(${DesignToken.BorderBasicSecondary});
  padding: var(${SpacingToken.Spacing5});

  ${isPromo
    ? `
    padding: var(${SpacingToken.Spacing6});
  `
    : `
    padding: var(${SpacingToken.Spacing5});
  `}
`;
