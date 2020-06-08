export type TooltipAlign = "top" | "center" | "bottom" | "left" | "right";
export type TooltipDirection = "top" | "bottom" | "left" | "right";
export type TooltipArrowPosition = "top" | "bottom" | "left" | "right";
export type TooltipArrowAlign = "top" | "center" | "bottom" | "left" | "right";
export type TooltipTrigger = "hover" | "click" | "custom";

export interface ITooltipProps {
  className?: string;
  keepContentVisibleOnHover?: boolean;
  isTooltipVisible?: boolean;
  offset?: number;
  trigger?: TooltipTrigger;
  align?: TooltipAlign;
  inline?: boolean;
  directions?: TooltipDirection[];
  children: React.ReactNode;
  content: React.ReactNode;
}

/**
 * @deprecated 0.3.0, use PopperTooltip instead; will stop working in '@livechat/design-system 1.0.0'
 * @see https://developers.livechat.com/docs/design-system/#!/PopperTooltip
 */
export var Tooltip: React.ComponentType<ITooltipProps>;

export interface ITooltipContentProps {
  children: React.ReactNode;
  arrowAlign?: TooltipArrowAlign;
  arrowOffset?: number;
  arrowPosition?: TooltipArrowPosition;
  backgroundColor?: string;
  className?: string;
  fontColor?: string;
}

/**
 * @deprecated 0.3.0, use CssTooltip instead; will stop working in '@livechat/design-system 1.0.0'
 * @see https://developers.livechat.com/docs/design-system/#!/PopperTooltip
 */
export var TooltipContent: React.ComponentType<ITooltipContentProps>;
