import { css } from '@emotion/css';

import { DesignToken, SpacingToken } from '../../foundations';

export const form = css`
  box-sizing: border-box;
  margin: 0;
  border: 0;
  padding: 0;
`;

export const formSection = css`
  margin-bottom: var(${SpacingToken.Spacing8});
`;

export const formLabel = css`
  margin: 0;
  margin-bottom: var(${SpacingToken.Spacing4});
  color: var(${DesignToken.ContentBasicPrimary});
`;

export const formHelper = css`
  margin: 0;
  color: var(${DesignToken.ContentBasicPrimary});
`;
