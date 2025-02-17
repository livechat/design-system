import { css } from '@emotion/css';

import {
  DesignToken,
  SpacingToken,
  TransitionDurationToken,
} from '../../foundations';

const MIN_CARD_HEIGHT = 72;
export const FADING_BUTTON_CLASS = 'fading-button';

export const baseStyles = (withDivider?: boolean) => css`
  position: relative;
  background-color: var(${DesignToken.SurfacePrimaryDefault});
  width: 100%;
  min-height: ${MIN_CARD_HEIGHT}px;
  color: var(${DesignToken.ContentBasicPrimary});

  &:hover {
    .${FADING_BUTTON_CLASS} {
      opacity: 1;
    }
  }

  ${withDivider &&
  `
    border-bottom: 1px solid var(${DesignToken.BorderBasicTertiary});
  `}
`;

export const labelWrapper = (
  hideLabelOnOpen?: boolean,
  isLabelHidden?: boolean
) => css`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  transition:
    opacity var(${TransitionDurationToken.Fast1}) ease-out
      var(${TransitionDurationToken.Moderate1}),
    padding 0s ease-out var(${TransitionDurationToken.Moderate1}),
    max-height 0s ease-out;
  opacity: 1;
  border: 0;
  background-color: transparent;
  padding: var(${SpacingToken.Spacing6});
  width: 100%;
  max-height: ${MIN_CARD_HEIGHT}px;
  overflow: hidden;
  color: var(${DesignToken.ContentBasicPrimary});

  &:hover {
    cursor: pointer;
  }

  ${hideLabelOnOpen &&
  `
    position: absolute;
  `}

  ${isLabelHidden &&
  `
    transition:
      opacity var(${TransitionDurationToken.Fast1}) ease-out,
      padding var(${TransitionDurationToken.Fast1}) ease-out
        var(${TransitionDurationToken.Fast1}),
      max-height 0s ease-out var(${TransitionDurationToken.Fast1});
    opacity: 0;
    padding: 0 var(${SpacingToken.Spacing6});
    max-height: 0;
  `}
`;

export const label = (hideLabelOnOpen?: boolean) => css`
  display: flex;
  align-items: center;
  overflow: hidden;

  ${hideLabelOnOpen &&
  `
    margin-right: var(${SpacingToken.Spacing9});
  `}
`;

export const leftNode = css`
  display: flex;
  margin-right: var(${SpacingToken.Spacing2});
`;

export const rightNode = css`
  display: flex;
  margin-right: var(${SpacingToken.Spacing2});
  margin-left: var(${SpacingToken.Spacing2});
`;

export const contentLabel = css`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const button = (isOpen?: boolean, hideLabelOnOpen?: boolean) => css`
  position: absolute;
  top: 18px;
  right: var(${SpacingToken.Spacing4});
  transition: all 0.2s ease;
  z-index: 1;

  ${hideLabelOnOpen &&
  `
    opacity: 0;
  `}

  ${!isOpen &&
  `
    opacity: 1;
  `}
`;

export const buttonWithIcon = (isOpen?: boolean) => css`
  transition: all 0.2s ease;

  ${isOpen &&
  `
    transform: rotate(90deg)
  `}
`;

export const contentWrapper = (isOpen?: boolean) => css`
  transition:
    opacity var(${TransitionDurationToken.Moderate1}) ease-out,
    max-height var(${TransitionDurationToken.Fast1}) ease-out
      var(${TransitionDurationToken.Moderate1});
  opacity: 0;
  overflow: hidden;

  ${isOpen &&
  `
    transition:
      max-height var(${TransitionDurationToken.Fast1}) ease-out,
      opacity var(${TransitionDurationToken.Moderate1}) ease-out
        var(${TransitionDurationToken.Fast1});
    opacity: 1;
  `}
`;

export const content = (
  fullSpaceContent?: boolean,
  hideLabelOnOpen?: boolean
) => css`
  padding: 0 var(${SpacingToken.Spacing6}) var(${SpacingToken.Spacing6});

  ${hideLabelOnOpen &&
  `
    padding-top: var(${SpacingToken.Spacing6});
  `}

  ${fullSpaceContent &&
  `
    padding: 0;
  `}
`;
