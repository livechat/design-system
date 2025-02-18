import { css } from '@emotion/css';

import { DesignToken, RadiusToken, SpacingToken } from '../../foundations';

export const skeletonWrapper = (vertical?: boolean) => css`
  display: flex;
  gap: var(${SpacingToken.Spacing2});
  width: 100%;

  ${vertical &&
  `
    flex-direction: column;
  `}
`;

export const skeletonText = css`
  border-radius: var(${RadiusToken.Radius3});
  width: 100%;
  background-color: var(${DesignToken.SurfaceSecondaryDisabled});
`;

export const skeletonAvatar = (square?: boolean) => css`
  background-color: var(${DesignToken.SurfaceSecondaryDisabled});
  flex-shrink: 0;
  border-radius: 50%;

  ${square &&
  `
    border-radius: var(${RadiusToken.Radius3});
  `}
`;

export const animatedSkeleton = css`
  @keyframes loading {
    0% {
      left: -100%;
    }

    100% {
      left: 100%;
    }
  }

  position: relative;
  overflow: hidden;

  &::before {
    position: absolute;
    left: 0;
    background: linear-gradient(
      90deg,
      var(${DesignToken.AnimatedGradientValue1}),
      var(${DesignToken.AnimatedGradientValue2}),
      var(${DesignToken.AnimatedGradientValue3})
    );
    width: 100%;
    height: 100%;
    animation: loading 2s forwards infinite;
    content: '';
  }
`;
