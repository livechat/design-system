import { css } from '@emotion/css';

import { DesignToken, SpacingToken } from '../../foundations';

export const listItem = (isWarning: boolean) => css`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;

  ${isWarning &&
  `
      color: var(${DesignToken.ContentBasicNegative});
    `}
`;

export const listItemLeftNode = css`
  display: flex;
  align-items: center;
  margin-right: var(${SpacingToken.Spacing2});
`;

export const listItemRightNode = css`
  display: flex;
  align-items: center;
  margin-left: var(${SpacingToken.Spacing2});
`;

export const listItemLabel = css`
  flex: 1;
`;
