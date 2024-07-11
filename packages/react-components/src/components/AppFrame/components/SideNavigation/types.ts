import * as React from 'react';

export interface ISideNavigationProps {
  /**
   * The CSS class for the side navigation
   */
  className?: string;
  /**
   * It will display the title of the side navigation bar
   */
  title?: string;
  /**
   * It will display the custom element as title of the side navigation bar
   */
  customHeader?: React.ReactNode;
  /**
   * Specify whether the gaps between elements should be removed
   */
  noGaps?: boolean;
  /**
   * It will display the custom element on the right side of the side navigation bar title
   */
  rightNode?: React.ReactNode;
}

export interface ISideNavigationListProps {
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

export interface ISideNavigationItemProps {
  /**
   * The label of the item
   */
  label: React.ReactNode;
  /**
   * It will display the custom element on the right side of the side navigation item
   */
  rightNode?: React.ReactNode;
  /**
   * It will display the custom element on the left side of the side navigation item
   */
  leftNode?: React.ReactNode;
  /**
   * Specify whether the icon space should be kept
   */
  shouldKeepIconSpace?: boolean;
  /**
   * The URL to navigate to
   */
  url?: string;
  /**
   * The CSS class for the side navigation item
   */
  className?: string;
  /**
   * Specify whether the item is active
   */
  isActive?: boolean;
  /**
   * Specify whether the item is seen as the main one
   */
  isMainEntry?: boolean;
  /**
   * The function to call on click
   */
  onClick: () => void;
  /**
   * The function to call on item hover
   */
  onItemHover?: () => void;
  /**
   * Specify whether the icon should be hidden
   */
  isIconHidden?: boolean;
}
