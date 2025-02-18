import { css } from '@emotion/css';

import { DesignToken, RadiusToken, SpacingToken } from '../../foundations';

export const card = css`
  display: flex;
  flex-direction: column;
  gap: var(${SpacingToken.Spacing4});
  align-items: center;
  border: solid 1px var(${DesignToken.BorderBasicSecondary});
  border-radius: var(${RadiusToken.Radius3});
  background-color: var(${DesignToken.SurfacePrimaryDefault});
  padding: var(${SpacingToken.Spacing4});
`;

export const cardHeader = css`
  display: flex;
  flex-direction: row;
  gap: var(${SpacingToken.Spacing3});
  align-items: center;
  padding: 0;
  width: 100%;
  height: 48px;
`;

export const cardHeaderNoImage = css`
  height: 16px;
`;

export const cardHeaderImage = css`
  border-radius: var(${RadiusToken.Radius1});
  width: 48px;
  height: 48px;
`;

export const cardHeaderHeading = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const cardHeaderHeadingTitle = css`
  margin: 0;
  color: var(${DesignToken.ContentBasicPrimary});
`;

export const cardHeaderHeadingDescription = css`
  margin: 0;
  color: var(${DesignToken.ContentBasicSecondary});
`;

export const cardContent = css`
  gap: 10px;
  margin: 0;
  width: 100%;
  color: var(${DesignToken.ContentBasicPrimary});
`;

export const cardActions = css`
  display: flex;
  flex-direction: column;
  gap: var(${SpacingToken.Spacing4});
  align-items: flex-start;
  width: 100%;
`;

export const cardActionsLine = css`
  background-color: var(${DesignToken.BorderBasicSecondary});
  width: 100%;
  height: 1px;
`;

export const cardActionsButtons = css`
  display: flex;
  gap: var(${SpacingToken.Spacing3});
  align-items: center;
  width: 100%;
`;

export const cardActionsButtonsExpander = css`
  margin-left: auto;
`;
