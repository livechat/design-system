export type TooltipAlign = 'top' | 'center' | 'bottom' | 'left' | 'right';
export type TooltipDirection = 'top' | 'bottom' | 'left' | 'right';
export type TooltipArrowPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click' |'custom';

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

export var Tooltip: React.ComponentType<ITooltipProps>;

export interface ITooltipContentProps {
  children: React.ReactNode;
  align?: TooltipAlign;
  arrowOffset?:	number;
  arrowPosition?: TooltipArrowPosition;
  backgroundColor?: string;
  className?: string;
  fontColor?: string;
}

export var TooltipContent: React.ComponentType<ITooltipContentProps>;
