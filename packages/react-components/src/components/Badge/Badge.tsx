import * as React from 'react';
import cx from 'clsx';

import styles from './Badge.module.scss';
import { formatCount } from './Badge.helpers';

const baseClass = 'badge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: number;
  limit?: number;
  kind?: 'primary' | 'secondary' | 'tertiary';
  size?: 'large' | 'medium' | 'compact';
  type?: 'counter' | 'alert' | 'dot';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  count = 0,
  limit = 99,
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
    ['counter']: formatCount(count, limit),
    ['alert']: '!',
    ['dot']: <span className={styles[`${baseClass}__dot`]} />,
  }[type];

  return (
    <span className={mergedClassNames} {...spanProps}>
      {content}
    </span>
  );
};
