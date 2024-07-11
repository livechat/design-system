import * as React from 'react';

import cx from 'clsx';

import { Heading } from '../../../Typography';

import { ISideNavigationProps } from './types';

import styles from './SideNavigation.module.scss';

const baseClass = 'side-navigation';

export const SideNavigation: React.FC<ISideNavigationProps> = ({
  children,
  className,
  title,
  customHeader,
  noGaps,
  rightNode,
}) => {
  const header = customHeader || (
    <div className={styles[`${baseClass}__header`]}>
      <Heading size="sm" className={styles[`${baseClass}__header__title`]}>
        {title}
      </Heading>
      {rightNode}
    </div>
  );

  return (
    <div className={cx(styles[`${baseClass}`], className)}>
      {header}
      <div
        className={cx(styles[`${baseClass}__nav-wrapper`], {
          [styles[`${baseClass}__nav-wrapper--no-gaps`]]: noGaps,
        })}
      >
        {children}
      </div>
    </div>
  );
};
