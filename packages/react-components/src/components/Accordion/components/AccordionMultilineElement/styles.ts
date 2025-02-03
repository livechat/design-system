import { css } from '@emotion/css';

import { SpacingToken } from '../../../../foundations';

export const baseStyles = css`
  transition: inherit;
  height: 100%;
  overflow: hidden;
`;

export const inner = css`
  padding: 0 var(${SpacingToken.Spacing12}) var(${SpacingToken.Spacing5})
    var(${SpacingToken.Spacing5});
`;
