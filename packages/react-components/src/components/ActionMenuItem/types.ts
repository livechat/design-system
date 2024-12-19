import * as React from 'react';

export interface ActionMenuItemProps {
  /**
   * Renders given element on the left of element
   */
  leftNode?: React.ReactNode;
  /**
   * Renders given element on the right of element
   */
  rightNode?: React.ReactNode;
  /**
   * Specify the kind of menu item
   */
  kind?: 'warning' | undefined;
}
