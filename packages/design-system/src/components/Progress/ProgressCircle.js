import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import {
  PROGRESS_STATUSES,
  PROGRESS_STATUS,
  SIZE_VALUE_FROM_SIZE,
  THICKNESS_FROM_SIZE,
  PROGRESS_SIZE,
  PROGRESS_SIZES
} from './constants';
import { getPercentNumber, getProgressStatus } from './helpers';

const cx = classNames.bind(styles);

const baseClass = 'progress-circle';

const ProgressCircle = React.forwardRef(
  ({ status, percent, className, size, ...restProps }, ref) => {
    const progressStatus = getProgressStatus(status, percent);
    const percentNumber = getPercentNumber(progressStatus, percent);
    const thickness = THICKNESS_FROM_SIZE[size];
    const sizeValue = SIZE_VALUE_FROM_SIZE[size];

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--${size}`]: size,
        [`${baseClass}--error`]: progressStatus === PROGRESS_STATUS.error,
        [`${baseClass}--success`]: progressStatus === PROGRESS_STATUS.success
      }),
      className
    );

    const circumference = 2 * Math.PI * ((sizeValue - thickness) / 2);

    const indicatorStyle = {
      strokeDasharray: circumference.toFixed(3),
      strokeDashoffset: `${(
        ((100 - percentNumber) / 100) *
        circumference
      ).toFixed(3)}px`
    };

    const svgViewBox = `${sizeValue / 2} ${sizeValue /
      2} ${sizeValue} ${sizeValue}`;

    return (
      <div
        className={mergedClassNames}
        ref={ref}
        role="progressbar"
        {...restProps}
      >
        <svg viewBox={svgViewBox}>
          <circle
            className={styles[`${baseClass}__bg-line`]}
            cx={sizeValue}
            cy={sizeValue}
            r={(sizeValue - thickness) / 2}
            fill="none"
            strokeWidth={thickness}
          />
          <circle
            className={styles[`${baseClass}__indicator`]}
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

ProgressCircle.propTypes = {
  className: PropTypes.string,
  /**
   * Progress of upload presented on the `ProgressBar`
   */
  percent: PropTypes.number.isRequired,
  /**
   * Upload status of the file
   */
  status: PropTypes.oneOf(PROGRESS_STATUSES),
  /**
   * The size of the `ProgressBar`
   */
  size: PropTypes.oneOf(PROGRESS_SIZES)
};

ProgressCircle.defaultProps = {
  size: PROGRESS_SIZE.medium
};

export default ProgressCircle;
