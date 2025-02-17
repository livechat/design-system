import { css } from '@emotion/css';

import { DesignToken, SpacingToken } from '../../foundations';

export const formGroup = css`
  margin: 0 0 var(${SpacingToken.Spacing8});
  border-style: none;
  padding: 0;
  min-width: auto;
`;

export const header = css`
  margin-bottom: var(${SpacingToken.Spacing4});
`;

export const label = css`
  display: block;
  margin-bottom: 4px;
  color: var(${DesignToken.ContentBasicPrimary});
`;

export const helper = css`
  color: var(${DesignToken.ContentBasicSecondary});
`;
