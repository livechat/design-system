import * as React from 'react';

import cx from 'clsx';

import { Text } from '../../../../components/Typography';

import styles from './TransitionExample.module.scss';

export const TransitionDurationExample: React.FC = () => {
  return (
    <div className={cx(styles['container'])}>
      <div className={cx(styles['row'])}>
        <Text className={styles['hint']}>
          ℹ️ Hover your mouse cursor over the box to see the transition in
          action.
        </Text>
      </div>
      <div className={cx(styles['row'])}>
        <Text>Fast1</Text>
        <div className={cx(styles['duration-example'], styles['fast1'])} />
      </div>
      <div className={cx(styles['row'])}>
        <Text>Fast2</Text>
        <div className={cx(styles['duration-example'], styles['fast2'])} />
      </div>
      <div className={cx(styles['row'])}>
        <Text>Moderate1</Text>
        <div className={cx(styles['duration-example'], styles['moderate1'])} />
      </div>
    </div>
  );
};
