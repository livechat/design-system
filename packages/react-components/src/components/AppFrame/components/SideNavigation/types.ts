import * as React from 'react';

import { ComponentCoreProps } from '../../../../utils/types';

export interface ISideNavigationProps extends ComponentCoreProps {
  /**
   * It will display your side navigation elements
   */
  children: React.ReactNode;
  /**
   * It will display the title of the side navigation bar
   */
  title?: string;
  /**
   * It will display the custom element as title of the side navigation bar
   */
  customHeader?: React.ReactNode;
  /**
   * It will display the custom element as footer of the side navigation bar
   */
  customFooter?: React.ReactNode;
  /**
   * Specify whether the gaps between elements should be removed
   */
  noGaps?: boolean;
  /**
   * It will display the custom element on the right side of the side navigation bar title
   */
  rightNode?: React.ReactNode;
}
