import * as React from 'react';

import {
  Placement,
  VirtualElement,
  UseDismissProps,
  Strategy,
  UseClickProps,
} from '@floating-ui/react';

import { ButtonProps } from '../Button';

export type TooltipTheme = 'invert' | 'important' | undefined;

export type TooltipButton = {
  handleClick: () => void;
  label: string;
} & Omit<ButtonProps, 'onClick'>;

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
   * Set if you want to show tooltip after trigger hover if state is not managed
   */
  triggerOnHover?: boolean;
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
   * Set the `floating-ui` useClick hook paramns if you need more control
   * https://floating-ui.com/docs/useclick
   */
  useClickHookProps?: UseClickProps;
  /**
   * Set to move the arrow along the Y axis from default position (left and right position)
   */
  arrowOffsetY?: number;
  /**
   * Set to move the arrow along the X axis from default position (top and bottom position)
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

export interface ITooltipInfoProps {
  /**
   * The CSS class for Info tooltip
   */
  className?: string;
  /**
   * The Info tooltip header
   */
  header?: string;
  /**
   * The Info tooltip text
   */
  text: string;
  /**
   * Set to show close button
   */
  closeWithX?: boolean;
  /**
   * The Info tooltip theme
   */
  theme?: TooltipTheme;
  /**
   * The Info tooltip close button action
   */
  handleCloseAction?: (ev: React.MouseEvent) => void;
}

export interface ITooltipInteractiveProps {
  /**
   * The Interactive tooltip header
   */
  header?: string;
  /**
   * The Interactive tooltip text
   */
  text: string;
  /**
   * The Interactive tooltip image
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Set to show close button
   */
  closeWithX?: boolean;
  /**
   * The Interactive tooltip theme
   */
  theme?: TooltipTheme;
  /**
   * The Interactive tooltip close button action
   */
  handleCloseAction?: (ev: React.MouseEvent) => void;
  /**
   * The Interactive tooltip primary button props
   */
  primaryButton: TooltipButton;
  /**
   * The Interactive tooltip secondary button props
   */
  secondaryButton?: TooltipButton;
}
