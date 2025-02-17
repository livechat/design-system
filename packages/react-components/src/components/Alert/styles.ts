import { css } from '@emotion/css';

import { RadiusToken, SpacingToken, DesignToken } from '../../foundations';

type AlertKind = 'info' | 'warning' | 'success' | 'error';

export const alert = (kind: AlertKind) => css`
  box-sizing: border-box;
  display: flex;
  position: relative;
  border-radius: var(${RadiusToken.Radius3});
  padding: var(${SpacingToken.Spacing5});
  width: 100%;
  overflow: hidden;
  word-break: break-word;

  ${kind === 'info' &&
  `
    background-color: var(${DesignToken.SurfaceAccentEmphasisLowInfo});
  `}

  ${kind === 'warning' &&
  `
    background-color: var(${DesignToken.SurfaceAccentEmphasisLowWarning});
  `}

  ${kind === 'success' &&
  `
    background-color: var(${DesignToken.SurfaceAccentEmphasisLowPositive});
  `}

  ${kind === 'error' &&
  `
    background-color: var(${DesignToken.SurfaceAccentEmphasisLowNegative});
  `}
`;

export const alertContent = (containerSize: string | null) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${containerSize === 'medium' &&
  `
    flex-direction: column;
  `}

  ${containerSize === 'small' &&
  `
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const alertContentWrapper = (containerSize: string | null) => css`
  display: flex;
  align-items: flex-start;
  width: 100%;

  ${containerSize === 'small' &&
  `
    flex-direction: column;
  `}
`;

export const alertIcon = (containerSize: string | null) => css`
  margin-right: var(${SpacingToken.Spacing5});

  ${containerSize === 'small' &&
  `
    margin-bottom: var(${SpacingToken.Spacing3});
  `}
`;

export const alertContentWrapperText = css`
  margin-right: var(${SpacingToken.Spacing8});
  max-width: 720px;
  color: var(${DesignToken.ContentBasicPrimary});
`;

export const alertContentWrapperCta = (containerSize: string | null) => css`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-right: var(${SpacingToken.Spacing8});

  ${containerSize === 'small' &&
  `
    margin-top: var(${SpacingToken.Spacing3});
  `}

  ${containerSize === 'medium' &&
  `
    margin-top: var(${SpacingToken.Spacing3});
    align-self: flex-start;
    margin-left: 44px;
  `}
`;

export const alertContentWrapperCtaLink = css`
  margin-left: var(${SpacingToken.Spacing4});
`;

export const alertCloseIcon = (containerSize: string | null) => css`
  width: 20px;
  min-width: 20px;
  height: 20px;

  ${containerSize === 'large' &&
  `
     margin-top: auto;
      margin-bottom: auto;
  `}
`;
