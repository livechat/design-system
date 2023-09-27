import * as React from 'react';

import { Icon } from '@livechat/design-system-icons';

import { ProgressStatus } from '../Progress/constants';

import styles from './FileUploadProgressActions.module.scss';

const baseClass = 'file-upload-progress-actions';

interface FileUploadProgressActionsProps {
  status: ProgressStatus;
  onCloseButtonClick?: () => void;
  onRetryButtonClick?: () => void;
}

export const FileUploadProgressActions: React.FC<
  FileUploadProgressActionsProps
> = ({ status, onCloseButtonClick, onRetryButtonClick }) => {
  return (
    <div className={styles[`${baseClass}`]}>
      {onRetryButtonClick && status === 'error' && (
        <button
          type="button"
          className={styles[`${baseClass}__retry-button`]}
          aria-label="Retry"
          onClick={onRetryButtonClick}
        >
          <Icon size="small" name="Refresh" set="tabler" />
        </button>
      )}
      {onCloseButtonClick && status !== 'success' && (
        <button
          type="button"
          className={styles[`${baseClass}__close-button`]}
          aria-label="Close"
          onClick={onCloseButtonClick}
        >
          <Icon size="small" name="Close" set="tabler" />
        </button>
      )}
    </div>
  );
};
