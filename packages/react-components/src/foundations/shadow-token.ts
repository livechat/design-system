export const ShadowToken = {
  Float: '--shadow-float',
  PopOver: '--shadow-pop-over',
  Modal: '--shadow-modal',
  Tooltip: '--shadow-tooltip',
  TooltipArrowBottom: '--shadow-tooltip-arrow-bottom',
  TooltipArrowTop: '--shadow-tooltip-arrow-top',
  TooltipArrowRight: '--shadow-tooltip-arrow-right',
  TooltipArrowLeft: '--shadow-tooltip-arrow-left',
  TooltipArrow: '--shadow-tooltip-arrow',
  Focus: '--shadow-focus',
  DividerBottom: '--shadow-divider-bottom',
  DividerTop: '--shadow-divider-top',
  DividerBottomLeft: '--shadow-divider-bottom-left',
  DividerTopLeft: '--shadow-divider-top-left',
  DividerTopRight: '--shadow-divider-top-right',
  DividerBottomRight: '--shadow-divider-bottom-right',
  MessageBox: '--shadow-message-box',
  ContentBasicInternalNote: '--shadow-content-basic-internal-note',
  ContentBasicBot: '--shadow-content-basic-bot',
  FixedRight: '--shadow-fixed-right',
  FixedLeft: '--shadow-fixed-left',
  FixedTop: '--shadow-fixed-top',
  FixedBottom: '--shadow-fixed-bottom',
};

export type ShadowTokenKey = keyof typeof ShadowToken;
