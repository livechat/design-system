import * as React from 'react';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import RefreshIcon from 'react-material-icon-svg/dist/RefreshIcon';
import CheckIcon from 'react-material-icon-svg/dist/CheckIcon';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { ProgressBar } from '../Progress';
import { getProgressStatus, getPercentNumber } from '../Progress/helpers';
import {
  PROGRESS_SIZES,
  PROGRESS_STATUS,
  PROGRESS_STATUSES
} from '../Progress/constants';

const cx = classNames.bind(styles);

const baseClass = 'file-upload-progress';

const FileUploadProgress = React.forwardRef((props, ref) => {
  const {
    className,
    iconSrc,
    percent,
    status,
    title,
    size,
    onCloseButtonClick,
    onRetryButtonClick,
    ...restProps
  } = props;

  const progressStatus = getProgressStatus(status, percent);
  const percentNumber = getPercentNumber(progressStatus, percent);

  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--with-icon`]: iconSrc,
      [`${baseClass}--error`]: progressStatus === PROGRESS_STATUS.error,
      [`${baseClass}--success`]: progressStatus === PROGRESS_STATUS.success
    }),
    className
  );

  return (
    <div {...restProps} className={mergedClassNames} ref={ref}>
      {iconSrc &&
        progressStatus !== PROGRESS_STATUS.success && (
          <img src={iconSrc} className={styles[`${baseClass}__icon`]} />
        )}
      {progressStatus === PROGRESS_STATUS.success && (
        <div className={styles[`${baseClass}__success-icon`]}>
          <CheckIcon />
        </div>
      )}
      <div className={styles[`${baseClass}__wrapper`]}>
        <div className={styles[`${baseClass}__header`]}>
          {title && (
            <div className={styles[`${baseClass}__title`]}>{title}</div>
          )}
          {(onRetryButtonClick || onCloseButtonClick) && (
            <div className={styles[`${baseClass}__actions`]}>
              {onRetryButtonClick &&
                progressStatus === 'error' && (
                  <button
                    type="button"
                    className={styles[`${baseClass}__retry`]}
                    aria-label="Retry"
                    onClick={onRetryButtonClick}
                  >
                    <RefreshIcon />
                  </button>
                )}
              {onCloseButtonClick &&
                progressStatus !== PROGRESS_STATUS.success && (
                  <button
                    type="button"
                    className={styles[`${baseClass}__close`]}
                    aria-label="Close"
                    onClick={onCloseButtonClick}
                  >
                    <CloseIcon />
                  </button>
                )}
            </div>
          )}
        </div>
        {progressStatus !== PROGRESS_STATUS.success && (
          <ProgressBar
            size={size}
            percent={percentNumber}
            status={progressStatus}
          />
        )}
      </div>
    </div>
  );
});

FileUploadProgress.propTypes = {
  className: PropTypes.string,
  /**
   * Usually a url to the icon of the uploaded file
   */
  iconSrc: PropTypes.string,
  /**
   * Usually a name of the uploaded file
   */
  title: PropTypes.string,
  /**
   * Progress of upload presented on the `ProgressBar`
   */
  percent: PropTypes.number,
  /**
   * The size of the `ProgressBar`
   */
  size: PropTypes.oneOf(PROGRESS_SIZES),
  /**
   * Upload status of the file
   */
  status: PropTypes.oneOf(PROGRESS_STATUSES),
  /**
   * Useful to cancel the file upload or to remove the file when it's upload resulted in an error
   */
  onCloseButtonClick: PropTypes.func,
  /**
   * Useful to retry the file upload
   */
  onRetryButtonClick: PropTypes.func
};

export default FileUploadProgress;
