import { CSSProperties } from 'react';

import { Placement } from '@floating-ui/react';

import { ModalPortalProps } from '../Modal';
import { ITooltipProps } from '../Tooltip';

export type CursorTiming = 'fast1' | 'fast2' | 'moderate1' | 'moderate2';

export interface IUserGuide
  extends Omit<ITooltipProps, 'triggerRenderer'>,
    Omit<ModalPortalProps, 'children'> {
  className?: string;
  elementStyles?: CSSProperties;
  disableSpotlightPointerEvents?: boolean;
  cursorPosition?: Placement;
  cursorTiming?: CursorTiming;
}
