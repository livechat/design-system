import * as React from 'react';
import cx from 'clsx';
import { Check as CheckIcon } from '@livechat/design-system-icons/react/material';

import { ProgressBar } from '../Progress';
import { ProgressSize, ProgressStatus } from '../Progress/constants';

import styles from './FileUploadProgress.module.scss';
import { Icon } from '../Icon';
import { FileUploadProgressActions } from './FileUploadProgressActions';

export type UploadProgressActionState = 'visible' | 'hover' | 'hidden';

const baseClass = 'file-upload-progress';
const wrapperHeaderTitleClass = `${baseClass}__wrapper__header__title`;

export interface FileUploadProgressProps {
  actionsVisibility?: UploadProgressActionState;
  className?: string;
  icon?: React.ReactNode;
  title: string;
  progressValue: number;
  size?: ProgressSize;
  status?: ProgressStatus;
  onCloseButtonClick?: () => void;
  onRetryButtonClick?: () => void;
}

export const FileUploadProgress: React.ExoticComponent<
  FileUploadProgressProps & React.RefAttributes<HTMLInputElement>
> = React.forwardRef(
  (
    {
      actionsVisibility = 'hidden',
      className,
      icon,
      title,
      progressValue: percent,
      size,
      status = 'normal',
      onCloseButtonClick,
      onRetryButtonClick,
    },
    ref
  ) => {
    return (
      <div className={styles[baseClass]} ref={ref}>
        {icon && status !== 'success' && (
          <div className={styles[`${baseClass}__icon`]}>{icon}</div>
        )}
        {status === 'success' && (
          <div className={styles[`${baseClass}__icon`]}>
            <Icon source={CheckIcon} kind="success" />
          </div>
        )}
        <div
          className={cx(styles[`${baseClass}__wrapper`], {
            [styles[`${baseClass}__wrapper--with-icon`]]: icon,
          })}
        >
          <div className={styles[`${baseClass}__wrapper__header`]}>
            {title && (
              <div
                className={cx(styles[wrapperHeaderTitleClass], {
                  [styles[`${wrapperHeaderTitleClass}--success`]]:
                    status === 'success',
                  [styles[`${wrapperHeaderTitleClass}--error`]]:
                    status === 'error',
                })}
              >
                {title}
              </div>
            )}
            {actionsVisibility !== 'hidden' && (
              <div
                className={cx({
                  [styles[`${baseClass}__wrapper__header__actions`]]:
                    actionsVisibility === 'hover',
                })}
              >
                <FileUploadProgressActions
                  status={status}
                  onCloseButtonClick={onCloseButtonClick}
                  onRetryButtonClick={onRetryButtonClick}
                />
              </div>
            )}
          </div>
          {status !== 'success' && (
            <ProgressBar
              className={className}
              percent={percent}
              status={status}
              size={size}
            />
          )}
        </div>
      </div>
    );
  }
);
