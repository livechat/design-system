import * as React from 'react';

import {
  Check as CheckIcon,
  Error as ErrorIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
} from '@livechat/design-system-icons';
import cx from 'clsx';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
  FileUploadProgress,
  FileUploadProgressActions,
} from '../FileUploadProgress';
import { Icon } from '../Icon';
import { ProgressCircle } from '../Progress';
import { ProgressStatus, ProgressSize } from '../Progress/constants';
import { Text } from '../Typography';

import * as styles from './styles';

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
      <div
        data-testid="success-icon"
        className={styles.wrapperHeaderSuccessIcon}
      >
        <Icon source={CheckIcon} />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div data-testid="error-icon" className={styles.wrapperHeaderErrorIcon}>
        <Icon source={ErrorIcon} />
      </div>
    );
  }

  return (
    <ProgressCircle
      className={styles.loader}
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
  const mergedClassNames = cx(styles.uploadBar(withError), className);
  const shouldShowCollapseButton = !(
    withError &&
    (onRetryButtonClick || onCloseButtonClick)
  );

  const handleOnWrapperClick = () => setExpanded(!expanded);

  if (mode === 'single') {
    return (
      <div className={mergedClassNames}>
        <div className={styles.wrapper}>
          <div className={styles.wrapperHeader}>
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
      <div className={styles.wrapper} onClick={handleOnWrapperClick}>
        <div className={styles.wrapperHeader}>
          <div className={styles.wrapperHeaderIcon}>
            {getHeaderIcon(status, progressValue)}
          </div>
          <div className={styles.wrapperHeaderTitle}>
            <Text size="sm" as="div">
              {withError ? errorMessage : title}
            </Text>
          </div>
          {shouldShowCollapseButton && (
            <button
              className={styles.wrapperHeaderCollapseButton}
              type="button"
              aria-label="Collapse button"
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
            <div className={styles.wrapperHeaderActionsContainer}>
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
              enter: styles.filesEnter,
              enterActive: styles.filesEnterActive,
              exit: styles.filesExit,
              exitActive: styles.filesExitActive,
              exitDone: styles.filesExitActive,
            }}
          >
            <div className={styles.files}>
              <div className={styles.filesWrapper}>
                <div className={styles.filesList}>{children}</div>
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};
