import * as React from 'react';
import cx from 'clsx';
import {
  Check as CheckIcon,
  Error as ErrorIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
} from '@livechat/design-system-icons/react/material';

import {
  FileUploadProgress,
  FileUploadProgressActions,
} from '../FileUploadProgress';
import { ProgressStatus, ProgressSize } from '../Progress/constants';
import { Icon } from '../Icon';
import { ProgressCircle } from '../Progress';

import styles from './UploadBar.module.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const baseClass = 'upload-bar';
const wrapperHeaderClass = `${baseClass}__wrapper__header`;
const TRANSITION_TIMEOUT = 300;

export interface UploadBarProps {
  className?: string;
  progressValue: number;
  title: string;
  isExpanded?: boolean;
  errorMessage?: string;
  status?: ProgressStatus;
  icon?: React.ReactNode;
  size?: ProgressSize;
  mode?: 'single' | 'multiple';
  onCloseButtonClick?: () => void;
  onRetryButtonClick?: () => void;
  children?: React.ReactNode;
}

const getHeaderIcon = (status: ProgressStatus, progressValue: number) => {
  if (status === 'success') {
    return (
      <div className={styles[`${wrapperHeaderClass}__success-icon`]}>
        <Icon source={CheckIcon} />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={styles[`${wrapperHeaderClass}__error-icon`]}>
        <Icon source={ErrorIcon} />
      </div>
    );
  }

  return (
    <ProgressCircle
      status={status}
      progressValue={progressValue}
      size="small"
    />
  );
};

export const UploadBar: React.FC<UploadBarProps> = ({
  children,
  className,
  progressValue,
  title,
  isExpanded,
  errorMessage,
  status = 'normal',
  icon,
  size,
  mode = 'multiple',
  onCloseButtonClick,
  onRetryButtonClick,
}) => {
  const [expanded, setExpanded] = React.useState(isExpanded || false);
  const withError = status === 'error';
  const withSuccess = status === 'success';
  const mergedClassNames = cx(styles[baseClass], className, {
    [styles[`${baseClass}--error`]]: withError,
    [styles[`${baseClass}--success`]]: withSuccess,
  });
  const shouldShowCollapseButton = !(
    withError &&
    (onRetryButtonClick || onCloseButtonClick)
  );

  const handleOnWrapperClick = () => setExpanded(!expanded);

  if (mode === 'single') {
    return (
      <div className={mergedClassNames}>
        <div className={styles[`${baseClass}__wrapper`]}>
          <div className={styles[`${wrapperHeaderClass}`]}>
            <FileUploadProgress
              title={withError ? errorMessage || title : title}
              progressValue={progressValue}
              status={status}
              icon={icon}
              size={size}
            />
          </div>
          {status === 'error' && (
            <FileUploadProgressActions
              status={status}
              onCloseButtonClick={onCloseButtonClick}
              onRetryButtonClick={onRetryButtonClick}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={mergedClassNames}>
      <div
        className={styles[`${baseClass}__wrapper`]}
        onClick={handleOnWrapperClick}
      >
        <div className={styles[`${wrapperHeaderClass}`]}>
          <div className={styles[`${wrapperHeaderClass}__icon`]}>
            {getHeaderIcon(status, progressValue)}
          </div>
          <div className={styles[`${wrapperHeaderClass}__title`]}>
            {withError ? errorMessage || title : title}
          </div>
          {shouldShowCollapseButton && (
            <button
              className={styles[`${wrapperHeaderClass}__collapse-button`]}
              type="button"
              onClick={handleOnWrapperClick}
            >
              {expanded ? (
                <Icon source={ChevronUpIcon} />
              ) : (
                <Icon source={ChevronDownIcon} />
              )}
            </button>
          )}
          {status === 'error' && (
            <div className={styles[`${wrapperHeaderClass}__actions-container`]}>
              <FileUploadProgressActions
                status={status}
                onCloseButtonClick={onCloseButtonClick}
                onRetryButtonClick={onRetryButtonClick}
              />
            </div>
          )}
        </div>
      </div>
      <TransitionGroup component={null}>
        {expanded && (
          <CSSTransition
            timeout={TRANSITION_TIMEOUT}
            classNames={{
              enter: styles[`${baseClass}__files--enter`],
              enterActive: styles[`${baseClass}__files--enter-active`],
              exit: styles[`${baseClass}__files--exit`],
              exitActive: styles[`${baseClass}__files--exit-active`],
              exitDone: styles[`${baseClass}__files--exit-done`],
            }}
          >
            <div className={styles[`${baseClass}__files`]}>
              <div className={styles[`${baseClass}__files-wrapper`]}>
                <div className={styles[`${baseClass}__files__list`]}>
                  {children}
                </div>
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};
