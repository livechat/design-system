import { FC, PropsWithChildren, useEffect } from 'react';

import { Text } from '../Typography';

import * as styles from './styles';
import { ListItemProps } from './types';

export const ListItem: FC<PropsWithChildren<ListItemProps>> = ({
  leftNode,
  rightNode,
  children,
  kind,
}) => {
  return (
    <div className={styles.listItem(kind === 'warning')}>
      {leftNode && <div className={styles.listItemLeftNode}>{leftNode}</div>}
      <Text as="div" className={styles.listItemLabel}>
        {children}
      </Text>
      {rightNode && <div className={styles.listItemRightNode}>{rightNode}</div>}
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
