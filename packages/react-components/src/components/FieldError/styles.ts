import { css } from '@emotion/css';

import { DesignToken, SpacingToken } from '../../foundations';

export const fieldError = css`
  color: var(${DesignToken.ContentBasicNegative});
  display: flex;
  align-items: flex-start;
  margin: var(${SpacingToken.Spacing1}) 0 0;
`;

export const fieldErrorIcon = css`
  margin-top: 2px;
  margin-right: var(${SpacingToken.Spacing1});
`;
