import { ReactNode } from 'react';

export interface ActionMenuItemProps {
  /**
   * Renders given element on the left of element
   */
  leftNode?: ReactNode;
  /**
   * Renders given element on the right of element
   */
  rightNode?: ReactNode;
  /**
   * Specify the kind of menu item
   */
  kind?: 'warning' | undefined;
}
