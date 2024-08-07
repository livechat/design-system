import * as React from 'react';

import { Check as CheckIcon } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Icon } from '../Icon';
import { ProgressBar } from '../Progress';
import { ProgressSize, ProgressStatus } from '../Progress/constants';
import { Text } from '../Typography';

import { FileUploadProgressActions } from './FileUploadProgressActions';

import styles from './FileUploadProgress.module.scss';

export type UploadProgressActionState = 'visible' | 'hover' | 'hidden';

const baseClass = 'file-upload-progress';
const wrapperHeaderTitleClass = `${baseClass}__wrapper__header__title`;

export interface FileUploadProgressProps {
  /**
   * Define if action buttons should be visible, visible on hover, or hidden
   */
  actionsVisibility?: UploadProgressActionState;
  /**
   * The CSS class for progress bar
   */
  className?: string;
  /**
   * Renders given element
   */
  icon?: React.ReactNode;
  /**
   * Specify the uploading file name
   */
  title: string;
  /**
   * Specify the value of current file upload progress (0-100)
   */
  progressValue: number;
  /**
   * Specify the progress bar size
   */
  size?: ProgressSize;
  /**
   * Specify the uploading file status
   */
  status?: ProgressStatus;
  /**
   * The event handler for close icon click
   */
  onCloseButtonClick?: () => void;
  /**
   * The event handler for retry icon click
   */
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
          <div
            className={cx(
              styles[`${baseClass}__icon`],
              styles[`${baseClass}__icon--success`]
            )}
          >
            <Icon source={CheckIcon} />
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
                <Text size="sm" as="div">
                  {title}
                </Text>
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
