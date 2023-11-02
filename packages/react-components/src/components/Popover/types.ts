import * as React from 'react';

import {
  flip,
  Placement,
  UseClickProps,
  UseDismissProps,
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
  flipOptions?: Parameters<typeof flip>[0];
  /**
   * Set `false` if the menu is not to be closed with a esc press
   */
  closeOnEsc?: boolean;
  /**
   * Trigger element
   */
  triggerRenderer: () => React.ReactNode;
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
}
