import { css } from '@emotion/css';

import { DesignToken, RadiusToken, SpacingToken } from '../../foundations';

const VERTICAL_BREAKPOINT = 559;

const verticalStyles = css`
  flex-direction: column;

  .content {
    flex: 0 1 auto;
    order: 2;
    padding: var(${SpacingToken.Spacing4}) var(${SpacingToken.Spacing5})
      var(${SpacingToken.Spacing5});
  }

  .additional-content {
    justify-content: left;
    order: 1;
    padding: var(${SpacingToken.Spacing5}) var(${SpacingToken.Spacing5}) 0;
    padding-top: var(${SpacingToken.Spacing10});
  }

  .close-button-container {
    position: absolute;
    top: var(${SpacingToken.Spacing3});
    right: var(${SpacingToken.Spacing3});
    padding: 0;
  }
`;

export const baseStyles = (isVertical?: boolean) => css`
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: row;
  height: 100%;

  ${isVertical && verticalStyles}

  @container (max-width: ${VERTICAL_BREAKPOINT}px) {
    ${verticalStyles}
  }
`;

export const mainWrapper = css`
  border-radius: var(${RadiusToken.Radius3});
  background-color: var(${DesignToken.SurfaceAccentEmphasisLowInfo});
  overflow: hidden;
  color: var(${DesignToken.ContentBasicPrimary});
  container-type: inline-size;
`;

export const content = css`
  display: flex;
  flex: 0 1 auto;
  flex-flow: column;
  justify-content: center;
  padding: var(${SpacingToken.Spacing8});
  max-width: 720px;
`;

export const cta = css`
  display: flex;
  gap: var(${SpacingToken.Spacing2});
  margin-top: var(${SpacingToken.Spacing4});
`;

export const secondaryButton = css`
  margin-left: var(${SpacingToken.Spacing4});
`;

export const additionalContent = css`
  display: flex;
  flex: 1 1 auto;
  align-items: flex-end;
  justify-content: right;
  padding-right: var(${SpacingToken.Spacing2});
  padding-left: var(${SpacingToken.Spacing3});

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const closeButtonContainer = css`
  margin-left: auto;
  padding-top: var(${SpacingToken.Spacing3});
  padding-right: var(${SpacingToken.Spacing4});
`;

export const closeButton = css`
  width: 20px;
  min-width: 20px;
  height: 20px;
`;
