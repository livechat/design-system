import * as React from 'react';
import cx from 'clsx';

import {
  Close,
  Info,
  Warning,
  CheckCircleSolid,
  Error,
} from '@livechat/design-system-icons/react/material';
import { Icon, IconKind, IconSource } from '../Icon';

import styles from './Toast.module.scss';

const baseClass = 'toast';

export type ToastKind =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'notification';

interface ToastAction {
  handler: () => void;
  label: string;
  closeOnClick?: boolean;
}

export interface ToastProps {
  action?: ToastAction;
  className?: string;
  removable?: boolean;
  kind?: ToastKind;
  onClose?: () => void;
}

const IconConfig: Record<ToastKind, { source: IconSource; kind?: IconKind }> = {
  success: {
    source: CheckCircleSolid,
    kind: 'inverted',
  },
  warning: {
    source: Warning,
  },
  error: {
    source: Error,
    kind: 'inverted',
  },
  info: {
    source: Info,
    kind: 'inverted',
  },
  notification: {
    source: Info,
    kind: 'link',
  },
};

export const Toast: React.FC<ToastProps> = ({
  action,
  className,
  children,
  removable,
  kind = 'info',
  onClose,
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    className
  );

  const onActionClick = (action: ToastAction) => {
    if (action && action.closeOnClick && onClose) {
      action.handler();
      return onClose();
    }

    return action.handler();
  };

  return (
    <div className={mergedClassNames}>
      <div className={styles[`${baseClass}__icon`]}>
        <Icon {...IconConfig[kind]} />
      </div>
      <div className={styles[`${baseClass}__content`]}>{children}</div>
      {(action || removable) && (
        <div className={styles[`${baseClass}__actions`]}>
          {action && (
            <button
              className={styles[`${baseClass}__actions-custom`]}
              onClick={() => onActionClick(action)}
            >
              {action.label}
            </button>
          )}
          {removable && (
            <div
              className={styles[`${baseClass}__actions-close`]}
              aria-label="Close toast"
              onClick={onClose}
            >
              <Icon
                source={Close}
                size="small"
                kind={
                  ['warning', 'notification'].includes(kind)
                    ? 'primary'
                    : 'inverted'
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
