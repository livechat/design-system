import { ShadowToken, ShadowTokenKey } from '../../../foundations/shadow-token';

import { ShadowShape } from './types';

const ShadowDescription: Record<ShadowTokenKey, string> = {
  Float: 'Float sample description',
  PopOver: 'PopOver sample description',
  Modal: 'Modal sample description',
  Tooltip: 'Tooltip sample description',
  TooltipArrowBottom: 'TooltipArrowBottom sample description',
  TooltipArrowTop: 'TooltipArrowTop sample description',
  TooltipArrowRight: 'TooltipArrowRight sample description',
  TooltipArrowLeft: 'TooltipArrowLeft sample description',
  TooltipArrow: 'TooltipArrow sample description',
  Focus: 'Focus sample description',
  DividerBottom: 'DividerBottom sample description',
  DividerTop: 'DividerTop sample description',
  DividerBottomLeft: 'DividerBottomLeft sample description',
  DividerTopLeft: 'DividerTopLeft sample description',
  DividerTopRight: 'DividerTopRight sample description',
  DividerBottomRight: 'DividerBottomRight sample description',
  MessageBox: 'MessageBox sample description',
};

export const ShadowTokens: ShadowShape[] = Object.entries(ShadowToken).map(
  ([key, value]) => ({
    enum: key as ShadowTokenKey,
    value,
    desc: ShadowDescription[key as ShadowTokenKey],
  })
);
