import * as React from 'react';
import cx from 'clsx';
import {
  Check as CheckIcon,
  Error as ErrorIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
} from '@livechat/design-system-icons/react/tabler';

import {
  FileUploadProgress,
  FileUploadProgressActions,
} from '../FileUploadProgress';
import { ProgressStatus, ProgressSize } from '../Progress/constants';
import { Icon } from '../Icon';
import { ProgressCircle } from '../Progress';
import { Text } from '../Typography';

import styles from './UploadBar.module.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const baseClass = 'upload-bar';
const wrapperHeaderClass = `${baseClass}__wrapper__header`;
const TRANSITION_TIMEOUT = 300;

export interface UploadBarProps {
  /**
   * The CSS class for container
   */
  className?: string;
  /**
   * Specify the value of current progress circle (0-100)
   */
  progressValue: number;
  /**
   * Specify the upload bar title
   */
  title: string;
  /**
   * Define if upload bar should be open
   */
  isExpanded?: boolean;
  /**
   * Specify the error message
   */
  errorMessage?: string;
  /**
   * Specify the upload bar status
   */
  status?: ProgressStatus;
  /**
   * Renders given element
   */
  icon?: React.ReactNode;
  /**
   * Specify the upload bar size
   */
  size?: ProgressSize;
  /**
   * Set the component's mode to `multiple` to specify whether the upload bar should display multiple elements
   */
  mode?: 'single' | 'multiple';
  /**
   * The event handler for close icon click
   */
  onCloseButtonClick?: () => void;
  /**
   * The event handler for retry icon click
   */
  onRetryButtonClick?: () => void;
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
      className={styles[`${wrapperHeaderClass}__loader`]}
      status={status}
      progressValue={progressValue}
    />
  );
};

export const UploadBar: React.FC<React.PropsWithChildren<UploadBarProps>> = ({
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
            <Text size="sm" as="div">
              {withError ? errorMessage || title : title}
            </Text>
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
