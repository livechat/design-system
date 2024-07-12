import * as React from 'react';

export interface ISideNavigationGroupProps {
  /**
   * The label of the side navigation list
   */
  label?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  /**
   * The right node of the side navigation list
   */
  rightNode?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  /**
   * The CSS class for the side navigation list
   */
  className?: string;
  /**
   * Specify whether the list should be collapsible
   */
  isCollapsible?: boolean;
  /**
   * The function to call on item hover
   */
  onItemHover?: () => void;
  /**
   * Specify whether the list should be open on the first render
   */
  shouldOpenOnInit?: boolean;
  /**
   * Specify whether the list should be open if item is active
   */
  shouldOpenOnActive?: boolean;
}
