import * as React from 'react';

import styles from './Badge.module.scss';
import cx from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  secondary?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  secondary = false,
}) => {
  return (
    <span
      className={cx(styles.badge, className, {
        [styles['badge--secondary']]: secondary,
      })}
    >
      {children}
    </span>
  );
};
