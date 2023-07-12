import * as React from 'react';
import cx from 'clsx';

import styles from './ActionMenuItem.module.scss';
import { Text } from '../Typography';

export interface ActionMenuItemProps {
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
}

const baseClass = 'action-menu-item';

export const ActionMenuItem: React.FC<
  React.PropsWithChildren<ActionMenuItemProps>
> = ({ leftNode, rightNode, children }) => {
  return (
    <div className={styles[baseClass]}>
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
