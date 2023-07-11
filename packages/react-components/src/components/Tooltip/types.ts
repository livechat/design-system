import * as React from 'react';
import { Placement, VirtualElement } from '@floating-ui/react-dom';

export interface ITooltipProps {
  children?: React.ReactNode;
  className?: string;
  theme?: 'invert' | 'important' | undefined;
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
  triggerRenderer: () => React.ReactNode;
  referenceElement?: VirtualElement;
  onOpen?: () => void;
  onClose?: () => void;
}
