import * as React from 'react';

import cx from 'clsx';

import { INavBarListProps } from '../../types';

import styles from './NavBarList.module.scss';

const baseClass = 'nav-bar-list';

export const NavBarList: React.FC<INavBarListProps> = ({
  children,
  className,
}) => {
  return <ul className={cx(styles[baseClass], className)}>{children}</ul>;
};
