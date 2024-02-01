import * as React from 'react';

import cx from 'clsx';

import { Text } from '../../../../components/Typography';

import styles from './TransitionExample.module.scss';

export const TransitionDelayExample: React.FC = () => {
  return (
    <div className={cx(styles['container'])}>
      <div className={cx(styles['row'])}>
        <Text className={styles['hint']}>
          ℹ️ Hover your mouse over the box to see the transition in action.
        </Text>
      </div>
      <div className={cx(styles['row'])}>
        <Text>Instant</Text>
        <div className={cx(styles['example-box'], styles['delay-instant'])} />
      </div>
      <div className={cx(styles['row'])}>
        <Text>Moderate</Text>
        <div className={cx(styles['example-box'], styles['delay-moderate'])} />
      </div>
      <div className={cx(styles['row'])}>
        <Text>Slow</Text>
        <div className={cx(styles['example-box'], styles['delay-slow'])} />
      </div>
    </div>
  );
};
