import cx from 'clsx';

import styles from './Badge.module.scss';
import { formatCount } from './Badge.helpers';
import { FC, HTMLAttributes } from 'react';

const baseClass = 'badge';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  count?: number;
  kind?: 'primary' | 'secondary' | 'tertiary';
  max?: number;
  size?: 'large' | 'medium' | 'compact';
  type?: 'counter' | 'alert' | 'dot';
}

export const Badge: FC<BadgeProps> = ({
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
