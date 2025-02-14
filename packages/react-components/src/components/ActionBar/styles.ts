import { css, keyframes } from '@emotion/css';

import {
  TransitionDurationToken,
  SpacingToken,
  RadiusToken,
  DesignToken,
} from '../../foundations';

export const fadeIn = keyframes`
    0% {
      opacity: 0;
      width: 0;
      height: 0;
    }

    30% {
      opacity: 0;
      width: 24px;
      height: 24px;
    }

    100% {
      opacity: 1;
      width: 24px;
      height: 24px;
    }
`;

export const actionBar = (vertical?: boolean) => css`
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: ${vertical ? 'column' : 'row'};
`;

export const actionBarItems = (isScrollType?: boolean) => css`
  display: flex;
  flex-direction: inherit;
  ${isScrollType && 'overflow: auto;'}
`;

export const actionBarItemButtonWrapper = (
  isActive: boolean,
  vertical: boolean
) => css`
  display: flex;
  position: relative;
  align-items: center;
  width: ${vertical ? '100%' : 'fit-content'};
  margin: ${vertical
    ? `var(${SpacingToken.Spacing1}) 0;`
    : `0 var(${SpacingToken.Spacing1})`};
  ${vertical && 'justify-content: center;'}

  ${isActive &&
  `
    &::after {
    position: absolute;
    content: '';
    background-color: var(${DesignToken.ActionPrimaryDefault});

        ${
          vertical
            ? `
            left: 0;
            width: 3px;
            height: 100%;
            border-top-left-radius: 0;
            border-top-right-radius: var(${RadiusToken.Radius3});
            border-bottom-right-radius: var(${RadiusToken.Radius3});`
            : `
            bottom: 0;
            width: 100%;
            height: 3px;
            border-top-left-radius: var(${RadiusToken.Radius3});
            border-top-right-radius: var(${RadiusToken.Radius3});
        `
        }
    }
  `}
`;

export const actionBarItemButton = (
  withDivider: boolean,
  vertical: boolean
) => css`
  span {
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  ${vertical &&
  `
    flex-shrink: 0;
    margin: var(${SpacingToken.Spacing1}) 0;
    `}

  ${withDivider &&
  ` 
  &::after {
      position: absolute;
      content: '';
      background-color: var(${DesignToken.BorderBasicSecondary});
      
      ${
        vertical
          ? `
        right: 0;
        bottom: -5.5px;
        left: 0;
        height: 1px;
      `
          : `
        top: 0;
        right: -5.5px;
        bottom: 0;
        width: 1px;
      `
      }
    }
  `}
`;

export const actionBarMenuWrapper = (
  hasButton: boolean,
  vertical?: boolean
) => css`
  display: flex;
  position: relative;
  align-items: ${vertical ? 'normal' : 'center'};
  margin: ${vertical
    ? `var(${SpacingToken.Spacing1}) 0 0 0`
    : `0 0 0 var(${SpacingToken.Spacing1})`};
  ${vertical && 'justify-content: center;'}

  ${hasButton &&
  `
    &::after {
      position: absolute;
      content: '';
      background-color: var(--action-primary-default);
      
      ${
        vertical
          ? `
        left: 0;
        width: 3px;
        height: 100%;
        border-top-left-radius: 0;
        border-top-right-radius: var(${RadiusToken.Radius3});
        border-bottom-right-radius: var(${RadiusToken.Radius3});
      `
          : `
        bottom: 0;
        width: 100%;
        height: 3px;
        border-top-left-radius: var(${RadiusToken.Radius3});
        border-top-right-radius: var(${RadiusToken.Radius3});
      `
      }
    }
  `}
`;

export const actionBarTriggerVertical = css`
  display: flex;
  align-items: flex-start;
`;

export const actionBarMenuButton = (
  hasButton: boolean,
  vertical?: boolean
) => css`
  position: unset;

  ${vertical &&
  `
    flex-direction: column;
    height: auto;
    min-height: 36px;
    
    > span {
      margin-left: 0;
      ${hasButton && 'margin-top: var(--spacing-1);'}
    }
  `}

  ${hasButton &&
  `
    background-color: var(--surface-primary-active);
    padding: 6px !important;
    ${
      vertical &&
      `
      width: 36px;
      
      &::after {
        bottom: 0;
        left: -9px;
        border-top-left-radius: 0;
        border-bottom-right-radius: var(--radius-3);
        width: 3px;
        height: 100%;
      }
    `
    }
  `}
`;

export const actionBarMenuButtonWithItem = css`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.6s forwards;
`;

export const actionBarMenuButtonIcon = (isMenuOpen: boolean) => css`
  transition: transform var(${TransitionDurationToken.Moderate1});
  ${isMenuOpen &&
  `
   transform: rotate(180deg);
  `}
`;
