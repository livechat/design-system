import * as React from 'react';

import cx from 'clsx';

import { formatCount } from './Badge.helpers';

import styles from './Badge.module.scss';

const baseClass = 'badge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Value to display
   */
  count?: number;
  /**
   * Specify the badge kind
   * @param secondary - is deprecated, use "primary" or "tertiary" instead
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

export const Badge: React.FC<BadgeProps> = ({
  className,
  count = 0,
  max = 99,
  kind = 'primary',
  size = 'medium',
  type = 'counter',
  ...spanProps
}) => {
  const mergedClassNames = cx(
    className,
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    styles[`${baseClass}--${size}`]
  );

  const content = {
    ['counter']: formatCount(count, max),
    ['alert']: '!',
    ['dot']: (
      <span data-testid="badge-dot" className={styles[`${baseClass}__dot`]} />
    ),
  }[type];

  return (
    <span className={mergedClassNames} {...spanProps}>
      {content}
    </span>
  );
};
