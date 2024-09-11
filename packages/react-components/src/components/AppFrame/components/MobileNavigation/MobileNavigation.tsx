import * as React from 'react';

import cx from 'clsx';

import { IMobileNavigationProps } from './types';

import styles from './MobileNavigation.module.scss';

const baseClass = 'mobile-navigation';

export const MobileNavigation: React.FC<IMobileNavigationProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <nav className={cx(styles[baseClass], className)} {...props}>
      {children}
    </nav>
  );
};
