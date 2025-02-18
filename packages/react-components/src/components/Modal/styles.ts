import { css } from '@emotion/css';

import { DesignToken, SpacingToken } from '../../foundations';

export const modalLabelHeader = css`
  display: flex;
  position: absolute;
  top: -52px;
  left: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;

export const modalLabelHeading = css`
  color: var(${DesignToken.ColorWhite});
`;

export const modalHeading = css`
  margin: 0;
  padding: 0;
  max-width: calc(100% - 32px);
  text-align: left;
  color: var(${DesignToken.ContentBasicPrimary});
`;

export const modalHeader = (noHeading: boolean) => css`
  box-sizing: border-box;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(${SpacingToken.Spacing5});
  width: 100%;
  color: var(${DesignToken.ContentBasicPrimary});

  ${noHeading &&
  `
         flex-direction: row-reverse;
      padding-bottom: 0;
    `}
`;

export const modalBody = css`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  color: var(${DesignToken.ContentBasicPrimary});
`;

export const modalFooter = css`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  padding-top: var(${SpacingToken.Spacing5});
  width: 100%;
`;
