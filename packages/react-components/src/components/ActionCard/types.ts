import * as React from 'react';

export interface ActionCardProps {
  /**
   * The CSS class for main container
   */
  className?: string;
  /**
   * The CSS class for the first column container
   */
  firstColumnClassName?: string;
  /**
   * The CSS class for the second column container
   */
  secondColumnClassName?: string;
  /**
   * Optional element that will be placed in the second column
   */
  secondColumn?: React.ReactNode;
  /**
   * Optional handler called on card click
   */
  onClick?: () => void;
}
