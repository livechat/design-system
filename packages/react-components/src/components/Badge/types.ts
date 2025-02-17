import { HTMLAttributes } from 'react';

export interface IBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Value to display
   */
  count?: number;
  /**
   * Specify the badge kind
   */
  kind?: 'primary' | 'secondary' | 'tertiary';
  /**
   * The maximum value after which a "+" will be displayed next to the number
   */
  max?: number;
  /**
   * Specify the badge size
   * @param large - is deprecated, use "medium" or "compact" instead
   */
  size?: 'large' | 'medium' | 'compact';
  /**
   * Specify the badge type
   * @param dot - is deprecated, use "UpdateBadge" component instead
   */
  type?: 'counter' | 'alert' | 'dot';
}
