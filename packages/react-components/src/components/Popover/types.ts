import * as React from 'react';

import {
  Placement,
  UseClickProps,
  UseDismissProps,
  FlipOptions,
  UseFloatingOptions,
} from '@floating-ui/react';

export interface IPopoverProps {
  children?: React.ReactNode;
  /**
   * The CSS class for popover container
   */
  className?: string;
  /**
   * The CSS class for trigger container
   */
  triggerClassName?: string;
  /**
   * The popover placement related to the trigger element
   */
  placement?: Placement;
  /**
   * Optional handler called on tooltip hide
   */
  onClose?: () => void;
  /**
   * Optional handler called on tooltip show
   */
  onOpen?: () => void;
  /**
   * Set popover visibility
   */
  isVisible?: boolean;
  /**
   * Will open menu on component initialization
   */
  openedOnInit?: boolean;
  /**
   * Set the popover placement to keep it in view
   */
  flipOptions?: FlipOptions;
  /**
   * Set the popover offset
   */
  offsetSize?: number;
  /**
   * Set `false` if the menu is not to be closed with an esc press
   */
  closeOnEsc?: boolean;
  /**
   * Trigger element
   */
  triggerRenderer: React.ReactElement | (() => React.ReactNode);
  /**
   * Set the `floating-ui` useDismiss hook params if you need more control
   * https://floating-ui.com/docs/usedismiss
   */
  useDismissHookProps?: UseDismissProps;
  /**
   * Set the `floating-ui` useClick hook params if you need more control
   * https://floating-ui.com/docs/useclick
   */
  useClickHookProps?: UseClickProps;
  /**
   * Set the type of CSS position property to use
   */
  floatingStrategy?: UseFloatingOptions['strategy'];
}
