import * as React from 'react';

import { Placement, flip, Strategy } from '@floating-ui/react';

import { ComponentCoreProps } from '../../utils/types';

export interface IActionMenuOption {
  key: string;
  element: React.ReactNode;
  groupHeader?: boolean;
  disabled?: boolean;
  withDivider?: boolean;
  onClick?: () => void;
}

export interface IActionMenuProps extends ComponentCoreProps {
  /**
   * The CSS class for trigger container
   */
  triggerClassName?: string;
  /**
   * Array of menu options
   */
  options: IActionMenuOption[];
  /**
   * Array of selected menu options keys
   */
  selectedOptions?: string[];
  /**
   * Trigger element
   */
  triggerRenderer: React.ReactElement;
  /**
   * The menu placement
   */
  placement?: Placement;
  /**
   * Will open menu on component initialization
   */
  openedOnInit?: boolean;
  /**
   * Menu will stay open after option click
   */
  keepOpenOnClick?: boolean;
  /**
   * Set the menu placement to keep it in view
   */
  flipOptions?: Parameters<typeof flip>[0];
  /**
   * Set to control the menu visibility
   */
  visible?: boolean;
  /**
   * Optional handler called on menu close
   */
  onClose?: () => void;
  /**
   * Optional handler called on menu open
   */
  onOpen?: () => void;
  /**
   * Set the type of CSS position property to use
   * https://floating-ui.com/docs/usefloating#strategy
   */
  floatingStrategy?: Strategy;
  /**
   * Optional footer element
   */
  footer?: React.ReactNode;
}
