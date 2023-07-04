import * as React from 'react';
import cx from 'clsx';
import { ProgressSize, ProgressStatus } from './constants';
import { getPercentNumber, getProgressStatus } from './helpers';

import styles from './ProgressCircle.module.scss';

const THICKNESS_FROM_SIZE: Record<ProgressSize, number> = {
  small: 2,
  medium: 3,
  large: 4,
};

const SIZE_VALUE_FROM_SIZE = {
  small: 15,
  medium: 36,
  large: 56,
};

const baseClass = 'progress-circle';

export interface ProgressCircleProps {
  /**
   * The CSS class for container
   */
  className?: string;
  /**
   * Specify the value of current progress circle (0-100)
   */
  progressValue: number;
  /**
   * Specify the progress circle status
   */
  status?: ProgressStatus;
  /**
   * Specify the progress circle size
   */
  size?: ProgressSize;
}

export const ProgressCircle: React.ExoticComponent<
  ProgressCircleProps & React.RefAttributes<HTMLInputElement>
> = React.forwardRef(
  (
    {
      status = 'normal',
      progressValue,
      className,
      size = 'medium',
      ...restProps
    },
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const progressStatus = getProgressStatus(status, progressValue);
    const percentNumber = getPercentNumber(progressStatus, progressValue);
    const thickness = THICKNESS_FROM_SIZE[size];
    const sizeValue = SIZE_VALUE_FROM_SIZE[size];

    const mergedClassNames = cx(
      styles[baseClass],
      {
        [styles[`${baseClass}--${size}`]]: size,
        [styles[`${baseClass}--${status}`]]: status,
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
