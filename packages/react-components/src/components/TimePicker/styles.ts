import { css } from '@emotion/css';

import {
  DesignToken,
  RadiusToken,
  SpacingToken,
  TransitionDurationToken,
} from '../../foundations';

export const popoverTrigger = css`
  display: inline-flex;
`;

export const inputBaseStyles = (
  isfocused?: boolean,
  isDisabled?: boolean
) => css`
  display: inline-flex;
  transition:
    border-color var(${TransitionDurationToken.Fast2}) ease,
    background-color var(${TransitionDurationToken.Fast2}) ease;
  outline: none;
  border: 1px solid var(${DesignToken.BorderBasicPrimary});
  border-radius: var(${RadiusToken.Radius3});
  background: var(${DesignToken.SurfacePrimaryDefault});
  padding: 5px 12px;
  line-height: 22px;
  color: var(${DesignToken.ContentBasicPrimary});

  &::placeholder {
    color: var(${DesignToken.ContentBasicDisabled});
  }

  ${isfocused
    ? `
    border-color: var(${DesignToken.ActionPrimaryDefault});
  `
    : `
    &:hover {
      border-color: var(${DesignToken.BorderBasicHover});
    }
  `}

  ${isDisabled &&
  `
    border-color: var(${DesignToken.BorderBasicDisabled});
    background-color: var(${DesignToken.SurfacePrimaryDisabled});
    color: var(${DesignToken.ContentBasicDisabled});

    &:hover {
      border-color: var(${DesignToken.BorderBasicDisabled});
    }
  `}
`;

export const inputElement = css`
  border: 0;
  outline: none;
  background: transparent;
  color: inherit;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

export const button = css`
  margin-left: var(${SpacingToken.Spacing3});
`;

export const popover = css`
  min-width: auto;
`;

export const timePicker = css`
  display: flex;
  flex-direction: row;
`;

export const list = css`
  width: 34px;
  height: 192px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
  text-align: center;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const listItem = css`
  padding: var(${SpacingToken.Spacing1});
`;

export const listItemButton = (isActive: boolean) => css`
  padding: 0;
  width: 24px;

  ${isActive &&
  `
    color: var(${DesignToken.ContentInvertPrimary});
    background-color: var(${DesignToken.ActionPrimaryDefault});

    &:hover {
      color: var(${DesignToken.ContentInvertPrimary});
      background-color: var(${DesignToken.ActionPrimaryDefault});
    }
  `}
`;
