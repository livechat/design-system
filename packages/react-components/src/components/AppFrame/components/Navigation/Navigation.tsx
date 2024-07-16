import * as React from 'react';

import cx from 'clsx';

import { INavigationProps } from './types';

import styles from './Navigation.module.scss';

const baseClass = 'navigation';

export const Navigation: React.FC<INavigationProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <nav
      className={cx(styles[baseClass], className, 'lc-dark-theme')}
      {...props}
    >
      {children}
    </nav>
  );
};
