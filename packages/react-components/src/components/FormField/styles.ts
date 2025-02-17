import { css } from '@emotion/css';

import { DesignToken, SpacingToken } from '../../foundations';

export const formField = (inline?: boolean) => css`
  display: inline-block;
  margin-bottom: var(${SpacingToken.Spacing5});

  ${inline &&
  `
    display: flex;
    flex-direction: column;
  `}
`;

export const labelRightNode = (inline?: boolean) => css`
  display: flex;
  flex-shrink: 0;
  align-self: flex-end;
  justify-content: flex-end;
  margin-left: 5px;
  color: var(${DesignToken.ContentBasicSecondary});

  ${inline &&
  `
    flex-grow: 1;
    margin-bottom: var(${SpacingToken.Spacing1});
  `}
`;

export const rowBreak = css`
  flex-basis: 100%;
  height: 0;
`;

export const wrapper = (inline?: boolean) => css`
  ${inline &&
  `
    display: flex;
    flex-flow: row nowrap;
  `}
`;

export const label = (inline?: boolean, labelText?: string) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: var(${SpacingToken.Spacing1});

  label {
    margin-bottom: 0;
  }

  ${inline &&
  `
    flex-shrink: 0;
    align-items: flex-start;
    justify-content: center;
    margin-right: var(${SpacingToken.Spacing2});
    margin-bottom: 0;
  `}

  ${!labelText &&
  `
    justify-content: flex-end;
    margin-right: 0;
  `}
`;

export const labelWrapper = (inline?: boolean) => css`
  display: flex;
  flex-grow: 1;

  ${inline &&
  `
    align-items: center;
  `}
`;

export const labelLeftNode = (readOnly?: boolean) => css`
  display: block;
  margin-bottom: var(${SpacingToken.Spacing1});
  line-height: 20px;
  color: var(${DesignToken.ContentBasicPrimary});
  font-size: 14px;

  ${readOnly &&
  `
    cursor: default;
  `}
`;

export const labelAdornment = (inline?: boolean) => css`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  align-self: flex-end;
  justify-content: flex-end;
  margin-left: var(${SpacingToken.Spacing1});
  overflow: hidden;
  color: var(${DesignToken.ContentBasicSecondary});

  ${inline &&
  `
   align-self: center;
  `}
`;

export const content = css`
  flex-grow: 1;
`;

export const contentDescription = css`
  margin-top: var(${SpacingToken.Spacing1});
`;
