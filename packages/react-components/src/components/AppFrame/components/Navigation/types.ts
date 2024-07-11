import * as React from 'react';

export interface INavigationListProps {
  /**
   * The CSS class for the navigation bar list
   */
  className?: string;
  /**
   * Specify whether the list should be scrollable
   */
  scrollable?: boolean;
}

export interface INavigationItemProps {
  /**
   * The ID of the item
   */
  id: string;
  /**
   * The label of the item visible in the tooltip
   */
  label: string;
  /**
   * Container for the icon or any other element
   */
  icon: React.ReactElement;
  /**
   * The URL to navigate to
   */
  url: string;
  /**
   * Specify whether the tooltip should be disabled after hover
   */
  disableTooltip?: boolean;
  /**
   * Specify whether the opacity should be disabled
   */
  disableOpacity?: boolean;
  /**
   * Specify whether the badge should be visible and what type it should be
   */
  badge?: 'dot' | 'alert' | number;
  /**
   * Specify whether the item is active
   */
  isActive?: boolean;
  /**
   * The function to call on click
   */
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export interface INavigationProps {
  /**
   * It will display your navigation elements
   */
  children: React.ReactNode;
  /**
   * The CSS class for the navigation bar container
   */
  className?: string;
}
