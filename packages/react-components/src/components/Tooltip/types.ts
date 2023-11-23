import * as React from 'react';

import {
  Placement,
  VirtualElement,
  UseDismissProps,
  Strategy,
} from '@floating-ui/react';

import { ButtonKind } from '../Button';

export type TooltipTheme = 'invert' | 'important' | undefined;

export type TooltipButton = {
  handleClick: () => void;
  label: string;
  kind?: ButtonKind;
};

export interface ITooltipProps {
  /**
   * The CSS class for tooltip
   */
  className?: string;
  /**
   * The CSS class for trigger wrapper
   */
  triggerClassName?: string;
  /**
   * Trigger element
   */
  triggerRenderer: React.ReactElement | (() => React.ReactNode);
  /**
   * Specify the tooltip kind
   * @deprecated we are changing the nomenclature to `kind` in order to maintain the constant naming of props
   */
  theme?: 'invert' | 'important' | undefined;
  /**
   * Specify the tooltip kind
   */
  kind?: 'invert' | 'important' | undefined;
  /**
   * The tooltip placement
   */
  placement?: Placement;
  /**
   * Set to control the menu visibility
   */
  isVisible?: boolean;
  /**
   * Removes the spacing inside the tooltip
   */
  fullSpaceContent?: boolean;
  /**
   * Optional handler called on tooltip hide
   */
  onClose?: () => void;
  /**
   * Optional handler called on tooltip show
   */
  onOpen?: () => void;
  /**
   * Set to enable/disable transition
   */
  withFadeAnimation?: boolean;
  /**
   * Set to define transition duration for showing and hiding tooltip
   */
  transitionDuration?: number;
  /**
   * Set to define transition duration for showing tooltip
   */
  hoverOnDuration?: number;
  /**
   * Set to define transition duration for hiding tooltip
   */
  hoverOffDuration?: number;
  /**
   * Set to define delay before transition start for showing and hiding tooltip
   */
  transitionDelay?: number;
  /**
   * Set to define delay before transition start for showing tooltip
   */
  hoverOnDelay?: number;
  /**
   * Set to define delay before transition start for hiding tooltip
   * @deprecated This prop will be removed in the future. Use `hoverOffDelay`.
   */
  hoverOutDelayTimeout?: number;
  /**
   * Set to define delay before transition start for hiding tooltip
   */
  hoverOffDelay?: number;
  /**
   * Set if you want to show tooltip after trigger click if state is not managed
   */
  triggerOnClick?: boolean;
  /**
   * Set the tooltip distance from the trigger
   */
  offsetMainAxis?: number;
  /**
   * Set custom reference object for the tooltip
   */
  referenceElement?: VirtualElement;
  /**
   * Waits until cursor is at “rest” over the trigger to change the state
   */
  activationThreshold?: number;
  /**
   * Set the `floating-ui` useDismiss hook paramns if you need more control
   * https://floating-ui.com/docs/usedismiss
   */
  useDismissHookProps?: UseDismissProps;
  /**
   * Set to move the arrow along the Y axis from default position (left and right possition)
   */
  arrowOffsetY?: number;
  /**
   * Set to move the arrow along the X axis from default position (top and bottom possition)
   */
  arrowOffsetX?: number;
  /**
   * Set to close the tooltip after leaving trigger area in uncontrolled state.
   * Be default, moving the curson from trigger to tooltip will keep it open.
   */
  closeOnTriggerBlur?: boolean;
  /**
   * Set the type of CSS position property to use
   * https://floating-ui.com/docs/usefloating#strategy
   */
  floatingStrategy?: Strategy;
}
