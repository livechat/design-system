import * as React from 'react';

import { ButtonKind } from './types';

export const getSpinnerColors = (
  kind: ButtonKind
): Record<string, string> | undefined => {
  if (kind === 'primary' || kind === 'destructive') {
    return {
      primaryColor: 'var(--action-primary-default)',
      secondaryColor: 'var(--border-invert-primary)',
    };
  }
  if (kind === 'link-inverted') {
    return {
      primaryColor: 'var(--content-invert-primary)',
      secondaryColor: 'var(--surface-invert-secondary)',
    };
  }
};

export const handleMouseInteraction = (
  event:
    | React.MouseEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLAnchorElement>,
  internalHandler: () => void,
  userHandler?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
): void => {
  internalHandler();
  userHandler?.(event);
};

export const handleKeyboardInteraction = (
  event:
    | React.FocusEvent<HTMLButtonElement>
    | React.FocusEvent<HTMLAnchorElement>,
  internalHandler: () => void,
  userHandler?: React.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>
): void => {
  internalHandler();
  userHandler?.(event);
};

export const buttonRef = (
  node: HTMLSpanElement | null,
  internalHandler: (width: number) => void
): void => {
  const labelWidth = node?.offsetWidth;
  labelWidth && internalHandler(labelWidth);
};
