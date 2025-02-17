import { css } from '@emotion/css';

import { DesignToken } from '../foundations';

export const skeletonLoading = css`
  position: relative;
  overflow: hidden;

  @keyframes loading {
    0% {
      left: -100%;
    }

    100% {
      left: 100%;
    }
  }

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
