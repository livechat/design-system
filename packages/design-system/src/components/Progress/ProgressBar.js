import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import {
  PROGRESS_STATUSES,
  PROGRESS_STATUS,
  PROGRESS_SIZES
} from './constants';
import { getPercentNumber, getProgressStatus } from './helpers';

const cx = classNames.bind(styles);

const baseClass = 'progress-bar';

const ProgressBar = React.forwardRef(
  ({ status, percent, size, className, ...restProps }, ref) => {
    const progressStatus = getProgressStatus(status, percent);
    const percentNumber = getPercentNumber(progressStatus, percent);

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--${size}`]: size,
        [`${baseClass}--error`]: progressStatus === PROGRESS_STATUS.error,
        [`${baseClass}--success`]: progressStatus === PROGRESS_STATUS.success
      }),
      className
    );

    return (
      <div {...restProps} className={mergedClassNames} ref={ref}>
        <div
          className={styles[`${baseClass}__indicator`]}
          style={{ width: `${percentNumber}%` }}
        />
      </div>
    );
  }
);

ProgressBar.propTypes = {
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

export default ProgressBar;
