import * as React from 'react';
import cx from 'classnames';

import { ProgressSize, ProgressStatus } from './constants';
import { getPercentNumber, getProgressStatus } from './helpers';

const baseClass = 'lc-progress-bar';

export interface IProps {
  className?: string;
  percent: number;
  status?: ProgressStatus;
  size?: ProgressSize;
}

export const ProgressBar: React.ExoticComponent<
  IProps & React.RefAttributes<HTMLInputElement>
> = React.forwardRef(
  (
    {
      status = ProgressStatus.Normal,
      percent,
      size = ProgressSize.Medium,
      className = '',
      ...restProps
    },
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const progressStatus = getProgressStatus(status, percent);
    const percentNumber = getPercentNumber(progressStatus, percent);

    const mergedClassNames = cx(
      baseClass,
      {
        [`${baseClass}--${size}`]: size,
        [`${baseClass}--error`]: progressStatus === ProgressStatus.Error,
        [`${baseClass}--success`]: progressStatus === ProgressStatus.Success,
        [`${baseClass}--normal`]: progressStatus === ProgressStatus.Normal,
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
          className={`${baseClass}__indicator--${status}`}
          style={{ width: `${percentNumber}%` }}
        />
      </div>
    );
  }
);
