import { css, keyframes } from '@emotion/css';

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

  ${vertical &&
  `
    flex-direction: column;
  `}
`;

export const actionBarItems = (isScrollType?: boolean) => css`
  display: flex;
  flex-direction: inherit;

  ${isScrollType &&
  `
    overflow: auto;
  `}
`;

export const actionBarItemTooltip = css`
  display: grid;
`;

export const actionBarItemButtonWrapper = (
  isActive: boolean,
  vertical: boolean
) => css`
  display: flex;
  position: relative;
  align-items: center;
  margin: 0 var(--spacing-1);
  width: fit-content;

  ${isActive &&
  `
    &::after {
    position: absolute;
    bottom: 0;
    border-top-left-radius: var(--radius-3);
    border-top-right-radius: var(--radius-3);
    background-color: var(--action-primary-default);
    width: 100%;
    height: 3px;
    content: '';
  }
  `}

  ${vertical &&
  `
      justify-content: center;
        margin: var(--spacing-1) 0;
        width: 100%;
  `}
  
  ${vertical &&
  isActive &&
  `
  &::after {
    position: absolute;
    left: 0;
    border-top-left-radius: 0;
    border-top-right-radius: var(--radius-3);
    border-bottom-right-radius: var(--radius-3);
    background-color: var(--action-primary-default);
    width: 3px;
    height: 100%;
    content: '';
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
      margin: var(--spacing-1) 0;
      `}

  ${withDivider &&
  !vertical &&
  ` 
    &::after {
            position: absolute;
            top: 0;
            right: -5.5px;
            bottom: 0;
            background-color: var(--border-basic-secondary);
            width: 1px;
            content: '';
          }
  `}

  ${withDivider &&
  vertical &&
  `
     &::after {
            position: absolute;
            right: 0;
            bottom: -5.5px;
            left: 0;
            background-color: var(--border-basic-secondary);
            height: 1px;
            content: '';
          }
    `}
`;

export const actionBarMenuWrapper = (
  hasButton: boolean,
  vertical?: boolean
) => css`
  display: flex;
  position: relative;
  align-items: center;
  margin-left: var(--spacing-1);

  ${hasButton &&
  vertical &&
  `
    &::after {
    position: absolute;
    left: 0;
    border-top-left-radius: 0;
    border-top-right-radius: var(--radius-3);
    border-bottom-right-radius: var(--radius-3);
    background-color: var(--action-primary-default);
    width: 3px;
    height: 100%;
    content: '';
  }
  `}

  ${hasButton &&
  !vertical &&
  `
     &::after {
    position: absolute;
    bottom: 0;
    border-top-left-radius: var(--radius-3);
    border-top-right-radius: var(--radius-3);
    background-color: var(--action-primary-default);
    width: 100%;
    height: 3px;
    content: '';
  }
  `}

  ${vertical &&
  `
      align-items: normal;
      justify-content: center;
      margin-top: var(--spacing-1);
      margin-left: 0;
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
        }

  `}

  ${hasButton &&
  `
     background-color: var(--surface-primary-active);
        padding: 6px !important;
  `}

  ${hasButton &&
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

          > span {
            margin-top: var(--spacing-1);
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
  transition: transform var(--transition-duration-moderate-1);
  ${isMenuOpen &&
  `
   transform: rotate(180deg);
  `}
`;
