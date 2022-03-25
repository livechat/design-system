import * as React from 'react';
import cx from 'clsx';
import { ProgressSize, ProgressStatus } from './constants';
import { getPercentNumber, getProgressStatus } from './helpers';

import styles from './ProgressCircle.module.scss';

const THICKNESS_FROM_SIZE = {
  [ProgressSize.Small]: 2,
  [ProgressSize.Medium]: 3,
  [ProgressSize.Large]: 4,
};

const SIZE_VALUE_FROM_SIZE = {
  [ProgressSize.Small]: 15,
  [ProgressSize.Medium]: 36,
  [ProgressSize.Large]: 56,
};

const baseClass = 'progress-circle';

export interface ProgressCircleProps {
  className?: string;
  percent: number;
  status?: ProgressStatus;
  size?: ProgressSize;
}

export const ProgressCircle: React.ExoticComponent<
  ProgressCircleProps & React.RefAttributes<HTMLInputElement>
> = React.forwardRef(
  (
    {
      status = ProgressStatus.Normal,
      percent,
      className,
      size = ProgressSize.Medium,
      ...restProps
    },
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const progressStatus = getProgressStatus(status, percent);
    const percentNumber = getPercentNumber(progressStatus, percent);
    const thickness = THICKNESS_FROM_SIZE[size];
    const sizeValue = SIZE_VALUE_FROM_SIZE[size];

    const mergedClassNames = cx(
      styles[baseClass],
      {
        [styles[`${baseClass}--${size}`]]: size,
        [styles[`${baseClass}--error`]]:
          progressStatus === ProgressStatus.Error,
        [styles[`${baseClass}--success`]]:
          progressStatus === ProgressStatus.Success,
        [styles[`${baseClass}--normal`]]:
          progressStatus === ProgressStatus.Normal,
      },
      className
    );

    const circumference = 2 * Math.PI * ((sizeValue - thickness) / 2);

    const indicatorStyle = {
      strokeDasharray: circumference.toFixed(3),
      strokeDashoffset: `${(
        ((100 - percentNumber) / 100) *
        circumference
      ).toFixed(3)}px`,
    };

    const svgViewBox = `${sizeValue / 2} ${
      sizeValue / 2
    } ${sizeValue} ${sizeValue}`;

    return (
      <div
        className={mergedClassNames}
        ref={ref}
        role="progressbar"
        {...restProps}
      >
        <svg viewBox={svgViewBox}>
          <circle
            className={styles[`${baseClass}__bg-line--${status}`]}
            cx={sizeValue}
            cy={sizeValue}
            r={(sizeValue - thickness) / 2}
            fill="none"
            strokeWidth={thickness}
          />
          <circle
            className={styles[`${baseClass}__indicator--${status}`]}
            style={indicatorStyle}
            cx={sizeValue}
            cy={sizeValue}
            r={(sizeValue - thickness) / 2}
            fill="none"
            strokeWidth={thickness}
          />
        </svg>
      </div>
    );
  }
);
