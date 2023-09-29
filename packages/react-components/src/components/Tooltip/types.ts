import * as React from 'react';

import { Placement, VirtualElement } from '@floating-ui/react-dom';

import { ButtonKind } from '../Button';

export type TooltipTheme = 'invert' | 'important' | undefined;

export type TooltipButton = {
  handleClick: () => void;
  label: string;
  kind?: ButtonKind;
};

export interface ITooltipProps {
  children?: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  theme?: TooltipTheme;
  placement?: Placement;
  isVisible?: boolean;
  withFadeAnimation?: boolean;
  transitionDuration?: number;
  transitionDelay?: number;
  hoverOutDelayTimeout?: number;
  offsetMainAxis?: number;
  triggerOnClick?: boolean;
  arrowOffsetY?: number;
  arrowOffsetX?: number;
  fullSpaceContent?: boolean;
  triggerRenderer: () => React.ReactNode;
  referenceElement?: VirtualElement;
  onOpen?: () => void;
  onClose?: () => void;
}
