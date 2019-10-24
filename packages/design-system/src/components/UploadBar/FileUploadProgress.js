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
import {
  UPLOAD_PROGRESS_ACTIONS_STATES,
  UPLOAD_PROGRESS_ACTIONS_STATE
} from './constants';

const cx = classNames.bind(styles);

const baseClass = 'file-upload-progress';

const FileUploadProgressActions = props => {
  if (
    (!props.onRetryButtonClick && !props.onCloseButtonClick) ||
    !props.isVisible
  ) {
    return null;
  }

  return (
    <div className={styles[`${baseClass}__actions`]}>
      {props.onRetryButtonClick &&
        props.progressStatus === 'error' && (
          <button
            type="button"
            className={styles[`${baseClass}__retry`]}
            aria-label="Retry"
            onClick={props.onRetryButtonClick}
          >
            <RefreshIcon />
          </button>
        )}
      {props.onCloseButtonClick &&
        props.progressStatus !== PROGRESS_STATUS.success && (
          <button
            type="button"
            className={styles[`${baseClass}__close`]}
            aria-label="Close"
            onClick={props.onCloseButtonClick}
          >
            <CloseIcon />
          </button>
        )}
    </div>
  );
};

FileUploadProgressActions.propTypes = {
  /**
   * Useful to cancel the file upload or to remove the file when it's upload resulted in an error
   */
  onCloseButtonClick: PropTypes.func,
  /**
   * Useful to retry the file upload
   */
  onRetryButtonClick: PropTypes.func,
  progressStatus: PropTypes.oneOf(PROGRESS_STATUSES),
  isVisible: PropTypes.bool,
  className: PropTypes.string
};

const FileUploadProgress = React.forwardRef((props, ref) => {
  const {
    className,
    icon,
    percent,
    status,
    title,
    size,
    actionsVisibilityState,
    onCloseButtonClick,
    onRetryButtonClick,
    ...restProps
  } = props;

  const progressStatus = getProgressStatus(status, percent);
  const percentNumber = getPercentNumber(progressStatus, percent);

  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--with-icon`]: icon,
      [`${baseClass}--error`]: progressStatus === PROGRESS_STATUS.error,
      [`${baseClass}--success`]: progressStatus === PROGRESS_STATUS.success,
      [`${baseClass}--with-actions-on-hover`]:
        actionsVisibilityState === UPLOAD_PROGRESS_ACTIONS_STATE.hover
    }),
    className
  );

  return (
    <div {...restProps} className={mergedClassNames} ref={ref}>
      {icon &&
        progressStatus !== PROGRESS_STATUS.success && (
          <div className={styles[`${baseClass}__icon`]}>{icon}</div>
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

          <FileUploadProgressActions
            onRetryButtonClick={onRetryButtonClick}
            onCloseButtonClick={onCloseButtonClick}
            isVisible={props.actionsVisibilityState !== 'hidden'}
            progressStatus={progressStatus}
          />
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
  /**
   * Use `actionsVisibilityState` to control visibility of file upload actions (refresh and remove)
   */
  actionsVisibilityState: PropTypes.oneOf(UPLOAD_PROGRESS_ACTIONS_STATES),
  className: PropTypes.string,
  /**
   * Usually an icon of the uploaded file
   */
  icon: PropTypes.node,
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
