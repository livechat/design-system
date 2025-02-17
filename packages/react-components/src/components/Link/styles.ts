import { css } from '@emotion/css';

import { DesignToken } from '../../foundations';

export const link = (isBold: boolean) => css`
  cursor: pointer;
  text-decoration: none;
  color: var(${DesignToken.ActionPrimaryDefault});

  &:hover {
    text-decoration: underline;
    color: var(${DesignToken.ActionPrimaryHover});
  }

  &:active {
    color: var(${DesignToken.ActionPrimaryActive});
  }

  ${isBold &&
  `
      font-weight: 600;
    `}
`;
