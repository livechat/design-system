import { CSSProperties } from 'react';

import { ModalPortalProps } from '../Modal';
import { ITooltipProps } from '../Tooltip';

export interface IUserGuide
  extends Omit<ITooltipProps, 'triggerRenderer'>,
    Omit<ModalPortalProps, 'children'> {
  className?: string;
  elementStyles?: CSSProperties;
  isInteractive?: boolean;
}
