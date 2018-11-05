export type TooltipAlign = 'top' | 'center' | 'bottom' | 'left' | 'right;'

export interface ITooltipProps {
  className?: string;
  keepContentVisibleOnHover?: boolean;
  isTooltipVisible?: boolean;
  offset?: number;
  trigger?: string;
  align?: TooltipAlign;
  directions?: string[];
  children: React.ReactNode;
  content: React.ReactNode;
}

export var Tooltip: React.ComponentType<ITooltipProps>;

export interface ITooltipContentProps {
  children: React.ReactNode;
  align?: TooltipAlign;
  arrowOffset?:	number;
  arrowPosition?: TooltipAlign;
  backgroundColor?: string;
  className?: string;
  fontColor?: string;
}

export var TooltipContent: React.ComponentType<ITooltipContentProps>;
