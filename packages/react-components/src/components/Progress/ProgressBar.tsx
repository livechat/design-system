import * as React from 'react';
import cx from 'clsx';

import { ProgressSize, ProgressStatus } from './constants';
import { getPercentNumber, getProgressStatus } from './helpers';

import styles from './ProgressBar.module.scss';

const baseClass = 'progress-bar';

export interface ProgressBarProps {
  className?: string;
  percent: number;
  status?: ProgressStatus;
  size?: ProgressSize;
}

export const ProgressBar: React.ExoticComponent<
  ProgressBarProps & React.RefAttributes<HTMLInputElement>
> = React.forwardRef(
  (
    {
      status = 'normal',
      percent,
      size = 'medium',
      className = '',
      ...restProps
    },
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const progressStatus = getProgressStatus(status, percent);
    const percentNumber = getPercentNumber(progressStatus, percent);

    const mergedClassNames = cx(
      styles[baseClass],
      {
        [styles[`${baseClass}--${size}`]]: size,
        [styles[`${baseClass}--${status}`]]: status,
      },
      className
    );

    return (
      <div
        {...restProps}
        className={mergedClassNames}
        ref={ref}
        role="progressbar"
      >
        <div
          className={styles[`${baseClass}__indicator--${status}`]}
          style={{ width: `${percentNumber}%` }}
        />
      </div>
    );
  }
);
