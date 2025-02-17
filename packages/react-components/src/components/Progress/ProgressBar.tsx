import * as React from 'react';

import cx from 'clsx';

import { ProgressSize, ProgressStatus } from './constants';
import { getPercentNumber } from './Progress.helpers';
import * as styles from './styles';

export interface ProgressBarProps {
  /**
   * The CSS class for container
   */
  className?: string;
  /**
   * Specify the value of current progress bar (0-100)
   */
  percent: number;
  /**
   * Specify the progress bar status
   */
  status?: ProgressStatus;
  /**
   * Specify the progress bar size
   */
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
    const percentNumber = getPercentNumber(status, percent);

    const mergedClassNames = cx(styles.progressBar(size, status), className);

    return (
      <div
        {...restProps}
        className={mergedClassNames}
        ref={ref}
        role="progressbar"
      >
        <div
          data-testid="progress-bar-indicator"
          className={styles.indicator(status)}
          style={{ width: `${percentNumber}%` }}
        />
      </div>
    );
  }
);
