import { ShadowToken, ShadowTokenKey } from '../../../foundations/shadow-token';

import { ShadowShape } from './types';

const ShadowDescription: Record<ShadowTokenKey, string> = {
  Float: 'Cards, buttons, other elevated elements',
  PopOver: 'Popovers',
  Modal: 'Modals',
  Tooltip: 'Tooltips',
  TooltipArrowBottom: 'Specifically for tooltips with arrow on bottom',
  TooltipArrowTop: 'Specifically for tooltips with arrow on top',
  TooltipArrowRight: 'Specifically for tooltips with arrow on right',
  TooltipArrowLeft: 'Specifically for tooltips with arrow on left',
  TooltipArrow: 'Specifically for tooltips with arrow',
  Focus: 'Focus state on elements',
  DividerBottom: 'Separator on bottom of the element',
  DividerTop: 'Separator on top of the element',
  DividerBottomLeft:
    'Suited for subtle exits, like fading out elements or collapsing menus/details panel',
  DividerTopLeft: 'Separator on top left of the element',
  DividerTopRight: 'Separator on top right of the element',
  DividerBottomRight:
    'Suited for subtle exits, like fading out elements or collapsing menus/details panel',
  MessageBox: 'MessageBox on Chats',
  ContentBasicInternalNote: 'Content basic internal note shadow',
  ContentBasicBot: 'Content basic dot shadow',
  FixedRight: 'Fixed shadow on right of the element',
  FixedLeft: 'Fixed shadow on left of the element',
  FixedTop: 'Fixed shadow on top of the element',
  FixedBottom: 'Fixed shadow on bottom of the element',
};

export const ShadowTokens: ShadowShape[] = Object.entries(ShadowToken).map(
  ([key, token]) => ({
    enum: key as ShadowTokenKey,
    token,
    desc: ShadowDescription[key as ShadowTokenKey],
  })
);
