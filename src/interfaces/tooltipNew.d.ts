// <reference types="react" />
import * as PopperJS from "popper.js";

type RefHandler = (ref: HTMLElement | null) => void;

export type TooltipTriggerAction = "managed" | "click" | "hover";

export interface IPopperTooltipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
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
  isVisible?: boolean;
  arrowOffsetTop?: string;
  arrowOffsetBottom?: string;
  arrowOffsetLeft?: string;
  arrowOffsetRight?: string;
  offsetTop?: string;
  offsetBottom?: string;
  offsetLeft?: string;
  offsetRight?: string;
  placement?: CssTooltipPlacement;
  width?: string;
  zIndex?: number;
}

export var PopperTooltip: React.ComponentType<IPopperTooltipProps>;
export var CssTooltip: React.ComponentType<ICssTooltipProps>;
