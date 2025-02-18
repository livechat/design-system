import { css } from '@emotion/css';

import { DesignToken, RadiusToken, SpacingToken } from '../../foundations';

export const loader = css`
  width: 20px !important;
  height: 20px !important;
`;

export const uploadBar = (withError: boolean) => css`
  box-sizing: border-box;
  border: solid 1px var(${DesignToken.BorderBasicPrimary});
  border-radius: var(${RadiusToken.Radius3});
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
  background-color: var(${DesignToken.SurfacePrimaryDefault});
  padding: var(${SpacingToken.Spacing3});
  width: 100%;
  overflow: hidden;
  color: var(${DesignToken.ContentBasicPrimary});

  ${withError &&
  `
    color: var(${DesignToken.ContentBasicNegative});
    `}
`;

export const wrapper = css`
  box-sizing: border-box;
  display: flex;
  place-content: center space-between;
  cursor: pointer;
`;

export const wrapperHeader = css`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 15px;
`;

export const wrapperHeaderIcon = css`
  margin-right: var(${SpacingToken.Spacing2});
`;

export const wrapperHeaderTitle = css`
  justify-self: flex-start;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  white-space: nowrap;
  font-size: 14px;
`;

export const wrapperHeaderSuccessIcon = css`
  color: var(${DesignToken.ContentBasicPositive});
`;

export const wrapperHeaderErrorIcon = css`
  color: var(${DesignToken.ContentBasicNegative});
`;

export const wrapperHeaderCollapseButton = css`
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  margin: 0;
  margin-left: var(${SpacingToken.Spacing2});
  border: 0;
  border-radius: var(${RadiusToken.Radius1});
  background-color: transparent;
  cursor: pointer;
  padding: var(${SpacingToken.Spacing1});
  color: var(${DesignToken.ContentBasicPrimary});
`;

export const wrapperHeaderActionsContainer = css`
  display: flex;
  align-items: center;
  height: 28px;
`;

export const files = css`
  box-sizing: border-box;
  display: flex;
  max-height: 200px;
`;

export const filesWrapper = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: var(${SpacingToken.Spacing4});
  width: 100%;
  max-height: inherit;
`;

export const filesList = css`
  padding-right: var(${SpacingToken.Spacing5});
  height: 100%;
  overflow-y: auto;
  color-scheme: var(--color-scheme);

  > div:not(:last-child) {
    margin-bottom: var(${SpacingToken.Spacing4});
  }
`;

export const filesEnter = css`
  max-height: 0;
`;

export const filesEnterActive = css`
  transition: max-height 300ms cubic-bezier(0.14, 0, 0, 1);
  max-height: 200px;
`;

export const filesExit = css`
  max-height: 200px;
`;

export const filesExitActive = css`
  transition: max-height 300ms cubic-bezier(0.14, 0, 0, 1);
  max-height: 0;
`;
