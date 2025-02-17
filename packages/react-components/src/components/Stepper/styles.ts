import { css } from '@emotion/css';

import { DesignToken, RadiusToken, SpacingToken } from '../../foundations';

export const stepperCounter = css`
  margin-bottom: var(${SpacingToken.Spacing2});
  color: var(${DesignToken.ContentBasicPlaceholder});
`;

export const stepperStepsContainer = css`
  display: flex;
  flex-flow: row nowrap;
`;

export const stepperStep = (isCompleted: boolean, isActive: boolean) => css`
  margin-right: var(${SpacingToken.Spacing1});
  border-radius: var(${RadiusToken.Radius1});
  width: 22px;
  height: 4px;

  ${isCompleted &&
  `
        background-color: var(${DesignToken.ContentBasicPrimary});
    `}

  ${isActive &&
  `
        background-color: var(${DesignToken.SurfaceTertiaryHover});
    `}
`;
