import { css } from '@emotion/css';

import {
  DesignToken,
  RadiusToken,
  ShadowToken,
  SpacingToken,
  TransitionDurationToken,
} from '../../foundations';

export const baseStyles = (isLoading?: boolean) => css`
  display: flex;
  flex-direction: row;
  gap: 24px;
  transition: all var(${TransitionDurationToken.Moderate1}) ease-out;
  border: 1px solid var(${DesignToken.BorderBasicSecondary});
  border-radius: var(${RadiusToken.Radius4});
  background-color: var(${DesignToken.SurfacePrimaryDefault});
  padding: var(${SpacingToken.Spacing8});
  min-height: 280px;
  color: var(${DesignToken.ContentBasicPrimary});

  &:hover {
    border-color: var(${DesignToken.ActionPrimaryHover});
    cursor: pointer;
  }

  &:focus-visible {
    outline: 0;
    box-shadow: var(${ShadowToken.Focus});
  }

  ${isLoading &&
  `
    display: none;
  `}
`;

export const mainWrapper = (isLoading?: boolean) => css`
  container-type: inline-size;

  ${isLoading &&
  `
    border: 0;
    border-radius: var(${RadiusToken.Radius4});
    background-color: var(${DesignToken.SurfaceSecondaryDisabled});
    cursor: default;
    width: 100%;
    min-height: 280px;
  `}
`;

export const visuallyHidden = css`
  position: absolute;
  margin: -1px;
  border: 0;
  padding: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
`;

export const firstColumn = css`
  display: flex;
  flex: 1;
  min-width: 300px;
`;

export const secondColumn = css`
  display: flex;
  flex: 0 1 auto;
  max-width: 300px;
`;
