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
   */
  kind?: 'primary' | 'secondary' | 'tertiary';
  /**
   * The maximum value after which a "+" will be displayed next to the number
   */
  max?: number;
  /**
   * Specify the badge size
   */
  size?: 'large' | 'medium' | 'compact';
  /**
   * Specify the badge type
   */
  type?: 'counter' | 'alert' | 'dot';
}

export const Badge: React.FC<React.PropsWithChildren<BadgeProps>> = ({
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
    ['dot']: <span className={styles[`${baseClass}__dot`]} />,
  }[type];

  return (
    <span className={mergedClassNames} {...spanProps}>
      {content}
    </span>
  );
};
