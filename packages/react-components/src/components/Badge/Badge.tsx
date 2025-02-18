import * as React from 'react';

import cx from 'clsx';

import { formatCount } from './Badge.helpers';
import * as styles from './styles';
import { IBadgeProps } from './types';

export const Badge: React.FC<IBadgeProps> = ({
  className,
  count = 0,
  max = 99,
  kind = 'primary',
  size = 'medium',
  type = 'counter',
  ...spanProps
}) => {
  const mergedClassNames = cx(styles.baseStyles(kind, size), className);

  const content = {
    ['counter']: formatCount(count, max),
    ['alert']: '!',
    ['dot']: (
      <span data-testid="badge-dot" className={`${styles.baseClass}-dot`} />
    ),
  }[type];

  return (
    <span className={mergedClassNames} {...spanProps}>
      {content}
    </span>
  );
};
