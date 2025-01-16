import { CSSProperties } from 'react';

import { ModalPortalProps } from '../Modal';
import { ITooltipProps } from '../Tooltip';

export interface IUserGuide
  extends Omit<ITooltipProps, 'triggerRenderer'>,
    Omit<ModalPortalProps, 'children'> {
  shouldSlide?: boolean;
  className?: string;
  elementStyles?: CSSProperties;
  disableSpotlightPointerEvents?: boolean;
}
