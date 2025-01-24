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
  DividerRight: 'Separator on right of the element',
  DividerLeft: 'Separator on left of the element',
  DividerBottomLeft:
    'Suited for subtle exits, like fading out elements or collapsing menus/details panel',
  DividerTopLeft: 'Separator on top left of the element',
  DividerTopRight: 'Separator on top right of the element',
  DividerBottomRight:
    'Suited for subtle exits, like fading out elements or collapsing menus/details panel',
  MessageBox: 'MessageBox on Chats',
  FixedRight: 'Fixed shadow on right of the element',
  FixedLeft: 'Fixed shadow on left of the element',
  FixedTop: 'Fixed shadow on top of the element',
  FixedBottom: 'Fixed shadow on bottom of the element',
  ShadowAiCopilotAnimationStart:
    'Step 0: Shadow color applied at the start of animations for Copilot UI elements, enhancing depth and motion',
  ShadowAiCopilotAnimationMedium1:
    ' Step 1: Medium-level shadow color used during Copilot UI animations, adding subtle depth and dimension',
  ShadowAiCopilotAnimationMedium2:
    ' Step 2: Deeper shadow color used in Copilot UI animations, enhancing visual emphasis and movement',
  ShadowAiCopilotAnimationMedium3:
    'Step 3: Even deeper shadow color used in Copilot UI animations, creating strong depth and contrast',
  ShadowAiCopilotAnimationEnd:
    'Step 4: Shadow color applied at the end of Copilot UI animations, softening transitions and reducing depth',
  ShadowAiOtherFloat:
    'Shadow color used for floating AI-related UI elements, adding elevation and dimension',
  ShadowAiOtherActiveField:
    'Shadow color applied to active AI-related input fields, enhancing focus and visibility',
};

export const ShadowTokens: ShadowShape[] = Object.entries(ShadowToken).map(
  ([key, token]) => ({
    enum: key as ShadowTokenKey,
    token,
    desc: ShadowDescription[key as ShadowTokenKey],
  })
);
