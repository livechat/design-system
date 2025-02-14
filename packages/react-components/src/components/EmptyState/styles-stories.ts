import { css } from '@emotion/css';

import { DesignToken, SpacingToken } from '../../foundations';

export const actionMenu = css`
  width: 200px;
`;

export const actionMenuItem = css`
  width: 400px;
`;

export const icon = css`
  svg {
    width: 40px;
    height: 40px;
    color: var(${DesignToken.ContentBasicDisabled});
  }
`;

export const centered = css`
  height: 100vh;
`;

export const customContent = css`
  display: flex;
  flex-direction: column;
  gap: var(${SpacingToken.Spacing2});
  align-items: center;

  @media (width <= 600px) {
    flex-direction: column;
  }
`;

export const customContentRow = css`
  display: flex;
  gap: var(${SpacingToken.Spacing2});

  @media (width <= 600px) {
    flex-direction: column;
  }
`;

export const customContentBox = css`
  border-radius: 8px;
  background-color: var(${DesignToken.SurfaceSecondaryDefault});
  padding: var(${SpacingToken.Spacing6});
  width: 220px;
`;
