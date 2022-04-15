import * as React from 'react';
import cx from 'clsx';

import {
  Close,
  Info,
  Warning,
  CheckCircleSolid,
  Error,
} from '@livechat/design-system-icons/react/material';
import { Icon } from '../Icon';

import styles from './Toast.module.scss';

const baseClass = 'toast';

export const enum Variants {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
  Notification = 'notification',
}

interface ToastAction {
  handler: () => void;
  label: string;
  closeOnClick?: boolean;
}

export interface ToastProps {
  action?: ToastAction;
  className?: string;
  removable?: boolean;
  variant?: Variants;
  onClose?: () => void;
}

const IconConfig = {
  [Variants.Success]: {
    source: CheckCircleSolid,
    kind: 'inverted',
  },
  [Variants.Warning]: {
    source: Warning,
  },
  [Variants.Error]: {
    source: Error,
    kind: 'inverted',
  },
  [Variants.Info]: {
    source: Info,
    kind: 'inverted',
  },
  [Variants.Notification]: {
    source: Info,
    kind: 'link',
  },
};

export const Toast: React.FC<ToastProps> = ({
  action,
  className,
  children,
  removable,
  variant = Variants.Info,
  onClose,
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${variant}`],
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
        <Icon {...IconConfig[variant]} />
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
                  [Variants.Warning, Variants.Notification].includes(variant)
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
