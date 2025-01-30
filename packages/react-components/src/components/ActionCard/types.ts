import * as React from 'react';

export type ActionCardProps = (
  | {
      /**
       * Specify if the card is in loading state
       */
      isLoading: true;
      /**
       * Specify if the card is in animated loading state
       */
      isLoadingAnimated?: boolean;
    }
  | {
      /**
       * Specify if the card is in loading state
       */
      isLoading?: false;
      /**
       * Loading animation is not available when not loading
       */
      isLoadingAnimated?: never;
    }
) & {
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
};
