export type TooltipAlign = 'top' | 'center' | 'bottom' | 'left' | 'right;'

export interface ITooltipProps {
  className?: string;
  keepContentVisibleOnHover?: boolean,
  isTooltipVisible?: boolean,
  offset?: 0,
  trigger?: string,
  align?: TooltipAlign,
  directions?: string[],
  children: React.ReactNode,
  content: React.ReactNode
}

export var Tooltip: React.ComponentType<ITooltipProps>;
