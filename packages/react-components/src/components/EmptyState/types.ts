import { ReactNode } from 'react';

export type IEmptyStateProps = (
  | {
      /**
       * Specify the empty state type
       */
      type?: 'full';
      /**
       * The empty state description text or element
       */
      description?: string | ReactNode;
    }
  | {
      /**
       * Specify the empty state type
       */
      type: 'inline';
      /**
       * Description is not available in inline type
       */
      description?: never;
      /**
       * Image is not available in inline type
       */
      image?: never;
    }
) & {
  /**
   * The empty state title
   */
  title: string;
  /**
   * Optional actions to be displayed
   */
  actions?: ReactNode;
  /**
   * Set to center the content
   */
  centered?: boolean;
} & (
    | {
        /**
         * The URL of the empty state image
         */
        image?: string;
        icon?: never;
      }
    | {
        image?: never;
        /**
         * The icon element to be displayed
         */
        icon?: ReactNode;
      }
    | {
        image?: never;
        icon?: never;
      }
  );
