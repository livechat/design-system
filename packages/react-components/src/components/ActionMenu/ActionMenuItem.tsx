import * as React from 'react';

import cx from 'clsx';

import { Text } from '../Typography';

import { ActionMenuItemProps } from './types';

import styles from './ActionMenuItem.module.scss';

const baseClass = 'action-menu-item';

export const ActionMenuItem: React.FC<
  React.PropsWithChildren<ActionMenuItemProps>
> = ({ leftNode, rightNode, children, kind }) => {
  return (
    <div
      className={cx(styles[baseClass], {
        [styles[`${baseClass}--warning`]]: kind === 'warning',
      })}
    >
      {leftNode && (
        <div className={styles[`${baseClass}__left-node`]}>{leftNode}</div>
      )}
      <Text as="div" className={styles[`${baseClass}__label`]}>
        {children}
      </Text>
      {rightNode && (
        <div className={styles[`${baseClass}__right-node`]}>{rightNode}</div>
      )}
    </div>
  );
};
