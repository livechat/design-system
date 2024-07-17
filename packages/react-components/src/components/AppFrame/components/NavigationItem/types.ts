import * as React from 'react';

import { ComponentCoreProps } from '../../../../utils/types';

export interface INavigationItemProps extends ComponentCoreProps {
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
   * Set if you are preparing a custom element as a button icon and you do not want it to be semi-transparent without hover
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
