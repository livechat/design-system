// <reference types="react" />
import * as PopperJS from "popper.js";

type RefHandler = (ref: HTMLElement | null) => void;

export type TooltipTheme = "invert" | "important";

export type TooltipTriggerAction = "managed" | "click" | "hover";

export interface IPopperTooltipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  theme?: TooltipTheme;
  closeOnOutsideClick?: boolean;
  closeWithX?: boolean;
  closeWithEsc?: boolean;
  eventsEnabled?: boolean;
  hoverOutDelayTimeout?: number;
  isVisible?: boolean;
  withFadeAnimation?: boolean;
  modifiers?: PopperJS.Modifiers;
  onClose?: () => void;
  placement?: PopperJS.Placement;
  positionFixed?: boolean;
  tooltipRef?: RefHandler;
  triggerRef?: RefHandler;
  referenceElement?: PopperJS.ReferenceObject;
  transitionDuration?: number;
  transitionDelay?: number;
  trigger?:
    | ((props: { ref: React.Ref<any> }) => React.ReactNode)
    | React.ReactNode;
  triggerActionType?: TooltipTriggerAction;
  zIndex: number;
  onOpen?: () => void;
}

type CssTooltipPlacement =
  | "bottom"
  | "bottom-end"
  | "bottom-start"
  | "left"
  | "left-end"
  | "left-start"
  | "right"
  | "right-end"
  | "right-start"
  | "top"
  | "top-end"
  | "top-start";

export interface ICssTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  arrowClassName?: string;
  children: React.ReactNode;
  theme?: TooltipTheme;
  isVisible?: boolean;
  arrowOffsetTop?: string;
  arrowOffsetBottom?: string;
  arrowOffsetLeft?: string;
  arrowOffsetRight?: string;
  offsetTop?: string;
  offsetBottom?: string;
  offsetLeft?: string;
  offsetRight?: string;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  placement?: CssTooltipPlacement;
  width?: string;
  zIndex?: number;
}

export interface IUserGuideTooltipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  zIndex: number;
  element: React.ReactNode | Element;
  scrollableWrapper?: Element;
  isVisible?: boolean;
  slide?: boolean;
  theme?: TooltipTheme;
  placement?: PopperJS.Placement;
  containerName?: string;
  disableSpotlightPointerEvents?: boolean;
}

export var PopperTooltip: React.ComponentType<IPopperTooltipProps>;
export var CssTooltip: React.ComponentType<ICssTooltipProps>;
export var UserGuideTooltip: React.ComponentType<IUserGuideTooltipProps>;
