import * as React from 'react';
import cx from 'clsx';

import styles from './ActionMenuItem.module.scss';
import { Text } from '../Typography';

export interface ActionMenuItemProps {
  /**
   * Renders given element on the left of element
   */
  leftNode?: React.ReactNode;
  /**
   * Renders given element on the right of element
   */
  rightNode?: React.ReactNode;
  /**
   * Specify the kind of menu item
   */
  kind?: 'warning' | undefined;
}

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
