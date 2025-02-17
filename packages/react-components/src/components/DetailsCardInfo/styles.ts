import { css } from '@emotion/css';

import { DesignToken, SpacingToken } from '../../foundations';

export const baseStyles = css`
  display: flex;
  gap: var(${SpacingToken.Spacing5});
  align-items: center;
  margin-bottom: var(${SpacingToken.Spacing3});
  height: 22px;
  font-size: 15px;
`;

export const label = css`
  width: 105px;
  color: var(${DesignToken.ContentBasicSecondary});
`;

export const content = css`
  display: flex;
  gap: var(${SpacingToken.Spacing1});
  align-items: center;
  justify-content: center;
`;
