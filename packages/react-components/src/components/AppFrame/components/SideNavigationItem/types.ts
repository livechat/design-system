import * as React from 'react';

import { ComponentCoreProps } from '../../../../utils/types';

export interface ISideNavigationItemProps extends ComponentCoreProps {
  /**
   * The label of the item
   */
  label: React.ReactNode;
  /**
   * Custom element on the right side of the side navigation item
   */
  rightNode?: React.ReactNode;
  /**
   * Custom element on the left side of the side navigation item
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
