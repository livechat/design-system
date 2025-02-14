import { css } from '@emotion/css';

import {
  DesignToken,
  RadiusToken,
  ShadowToken,
  SpacingToken,
  StackingContextLevelToken,
} from '../../foundations';

export const baseStyles = css`
  display: flex;
  flex-direction: column;
  z-index: var(${StackingContextLevelToken.Popover});
  border-radius: var(${RadiusToken.Radius3});
  box-shadow: var(${ShadowToken.PopOver});
  background-color: var(${DesignToken.PopoverBackground});
  min-width: 168px;
  max-width: 336px;
  overflow: hidden;
`;

export const list = (withFooter?: boolean) => css`
  margin: 0;
  border-radius: var(${RadiusToken.Radius3});
  padding: 0;
  padding: var(${SpacingToken.Spacing2});
  overflow-y: auto;
  list-style: none;
  color-scheme: var(--color-scheme);

  ${withFooter &&
  `
    padding-bottom: var(${SpacingToken.Spacing05});
  `}
`;

export const item = (
  isDisabled?: boolean,
  withDivider?: boolean,
  isSelected?: boolean
) => css`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: var(${SpacingToken.Spacing05});
  outline: 0;
  border: 0;
  border-radius: 0;
  border-radius: var(${RadiusToken.Radius3});
  background: none;
  padding: 7px var(${SpacingToken.Spacing3});
  width: 100%;
  min-height: 36px;
  text-align: left;
  color: var(${DesignToken.ContentBasicPrimary});

  &:hover {
    background-color: var(${DesignToken.PickerListOptionBackgroundHover});
    cursor: pointer;
  }

  &:active {
    background-color: var(${DesignToken.PickerListOptionBackgroundActive});
  }

  &:focus-visible {
    outline: 2px solid var(${DesignToken.ActionPrimaryDefault});
    outline-offset: -2px;
  }

  ${isDisabled &&
  `
    color: var(${DesignToken.ContentBasicDisabled});

    &:hover {
      background: none;
      cursor: not-allowed;
    }
  `}

  ${withDivider &&
  `
    margin-bottom: var(${SpacingToken.Spacing2});

    &::after {
      position: absolute;
      right: -8px;
      bottom: -4.5px;
      left: -8px;
      background-color: var(${DesignToken.BorderBasicSecondary});
      height: 1px;
      content: '';
    }
  `}

  ${isSelected &&
  `
    background-color: var(${DesignToken.PickerListOptionBackgroundActive});
  `}
`;

export const groupHeader = css`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  margin-bottom: var(${SpacingToken.Spacing05});
  background-color: var(${DesignToken.PickerListGroupBackground});
  cursor: auto;
  padding: var(${SpacingToken.Spacing3}) var(${SpacingToken.Spacing3})
    var(${SpacingToken.Spacing1});
  height: 36px;
  text-transform: uppercase;
  color: var(${DesignToken.ContentBasicSecondary});
  font-size: 12px;
  font-weight: 600;

  &::after {
    position: absolute;
    top: 0;
    right: -8px;
    left: -8px;
    z-index: -1;
    background: var(${DesignToken.PickerListGroupBackground});
    height: 36px;
    content: '';
  }

  &:nth-of-type(1) {
    margin-top: calc(var(${SpacingToken.Spacing2}) * -1);
  }
`;

export const icon = css`
  margin-left: var(${SpacingToken.Spacing2});
`;

export const footer = css`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(${DesignToken.BorderBasicSecondary});
  padding: var(${SpacingToken.Spacing2});
`;
