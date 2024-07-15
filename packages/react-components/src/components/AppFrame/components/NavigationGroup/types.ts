import * as React from 'react';

import { ComponentCoreProps } from '../../../../utils/types';

export interface INavigationGroupProps extends ComponentCoreProps {
  /**
   * It will display your navigation elements
   */
  children: React.ReactNode;
  /**
   * The CSS class for the navigation bar list
   */
  className?: string;
  /**
   * Specify whether the list should be scrollable
   */
  scrollable?: boolean;
}
