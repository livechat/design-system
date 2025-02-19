import { FC, PropsWithChildren, useEffect } from 'react';

import cx from 'clsx';

import { Text } from '../Typography';

import { ListItemProps } from './types';

import styles from './ListItem.module.scss';

const baseClass = 'list-item';

export const ListItem: FC<PropsWithChildren<ListItemProps>> = ({
  leftNode,
  rightNode,
  children,
  kind,
}) => {
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

/**
 * @deprecated Use `ListItem` instead. This will be removed in a future release.
 */
export const ActionMenuItem: FC<PropsWithChildren<ListItemProps>> = (props) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.warn('`ActionMenuItem` is deprecated. Use `ListItem` instead.');
  }, []);

  return <ListItem {...props} />;
};
