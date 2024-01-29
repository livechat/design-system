import * as React from 'react';

import cx from 'clsx';

import { Text } from '../../../../components/Typography';

import styles from './TransitionExample.module.scss';

export const TransitionTimingExample: React.FC = () => {
  return (
    <div className={cx(styles['container'])}>
      <div className={cx(styles['row'])}>
        <Text className={styles['hint']}>
          ℹ️ Hover your mouse over the box to see the transition in action.
        </Text>
      </div>
      <div className={cx(styles['row'])}>
        <Text>Ease In</Text>
        <div className={cx(styles['example-box'], styles['timing-ease-in'])} />
      </div>
      <div className={cx(styles['row'])}>
        <Text>Ease Out</Text>
        <div className={cx(styles['example-box'], styles['timing-ease-out'])} />
      </div>
    </div>
  );
};
