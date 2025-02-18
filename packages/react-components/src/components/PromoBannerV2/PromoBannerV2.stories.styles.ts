import { css } from '@emotion/css';

import { SpacingToken } from '../../foundations';

export const imagePosition = css`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  height: 100%;

  @container (max-width: 559px) {
    justify-content: center;
  }
`;

export const promoHeader = css`
  font-weight: 700;
`;

export const customBackground = css`
  background-image: url('./assets/Illustration.svg');
  background-position: right;
  background-repeat: no-repeat;
  height: 286px;
`;

export const customTextPosition = css`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  width: 100%;
  height: 100%;
`;

export const head = css`
  width: 100%;
  font-size: 25px;
  font-weight: 700;
`;

export const text = css`
  font-size: 24px;
`;

export const darkPromoBanner = css`
  max-width: 800px;
`;

export const darkPromoHeader = css`
  margin: 0 0 var(${SpacingToken.Spacing4}) 0;
`;

export const darkPromoAdditionalContent = css`
  align-items: center;

  img {
    border-radius: 12px;
  }
`;
