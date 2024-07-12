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
