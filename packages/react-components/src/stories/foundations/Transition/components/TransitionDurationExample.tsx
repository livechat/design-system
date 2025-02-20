import * as React from 'react';

import cx from 'clsx';

import { Text } from '../../../../components/Typography';

import styles from './TransitionExample.module.scss';

export const TransitionDurationExample: React.FC = () => {
  return (
    <div className={cx(styles['container'])}>
      <div className={cx(styles['row'])}>
        <Text className={styles['hint']}>
          ℹ️ Hover your mouse over the box to see the transition in action.
        </Text>
      </div>
      <div className={cx(styles['row'])}>
        <Text>Fast1</Text>
        <div className={cx(styles['example-box'], styles['duration-fast1'])} />
      </div>
      <div className={cx(styles['row'])}>
        <Text>Fast2</Text>
        <div className={cx(styles['example-box'], styles['duration-fast2'])} />
      </div>
      <div className={cx(styles['row'])}>
        <Text>Moderate1</Text>
        <div
          className={cx(styles['example-box'], styles['duration-moderate1'])}
        />
      </div>
      <div className={cx(styles['row'])}>
        <Text>Moderate2</Text>
        <div
          className={cx(styles['example-box'], styles['duration-moderate2'])}
        />
      </div>
      <div className={cx(styles['row'])}>
        <Text>Slow1</Text>
        <div className={cx(styles['example-box'], styles['duration-slow1'])} />
      </div>
      <div className={cx(styles['row'])}>
        <Text>Slow2</Text>
        <div className={cx(styles['example-box'], styles['duration-slow2'])} />
      </div>
    </div>
  );
};
