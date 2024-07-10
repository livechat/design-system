import * as React from 'react';

import cx from 'clsx';

import { INavBarProps } from '../types';

import styles from './NavBar.module.scss';

const baseClass = 'nav-bar';

export const NavBar: React.FC<INavBarProps> = ({
  className,
  topNavBarNode,
  bottomNavBarNode,
}) => {
  return (
    <div role="navigation" className={cx(styles[baseClass], className)}>
      {topNavBarNode}
      {bottomNavBarNode}
    </div>
  );
};
