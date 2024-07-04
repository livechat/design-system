import * as React from 'react';

import cx from 'clsx';

import { Heading } from '../../Typography';
import { ISubNavBarProps } from '../types';

import styles from './SubNavBar.module.scss';

const baseClass = 'sub-nav-bar';

export const SubNavBar: React.FC<ISubNavBarProps> = ({
  children,
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
    <div className={styles[`${baseClass}`]}>
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
