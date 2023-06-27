import * as React from 'react';
import {
  Close,
  Info,
  Warning,
  CheckCircleSolid,
  Block,
} from '@livechat/design-system-icons/react/tabler';
import cx from 'clsx';

import { Button } from '../Button';
import { Icon, IconKind, IconSource } from '../Icon';

import styles from './Toast.module.scss';

type ToastKind = 'success' | 'warning' | 'error' | 'info';

type ToastAction = {
  onClick: () => void;
  label: string;
  closesOnClick?: boolean;
};

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: ToastAction;
  className?: string;
  removable?: boolean;
  kind?: ToastKind;
  onClose?: () => void;
}

const iconConfig: Record<ToastKind, { source: IconSource; kind?: IconKind }> = {
  success: {
    source: CheckCircleSolid,
  },
  warning: {
    source: Warning,
  },
  error: {
    source: Block,
  },
  info: {
    source: Info,
  },
};

const baseClass = 'toast';

export const Toast: React.FC<React.PropsWithChildren<ToastProps>> = ({
  action,
  className,
  children,
  removable,
  kind = 'info',
  onClose,
  ...divProps
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    className
  );

  const onActionClick = (action: ToastAction) => {
    if (action && action.closesOnClick && onClose) {
      action.onClick();
      return onClose();
    }

    return action.onClick();
  };

  return (
    <div className={mergedClassNames} {...divProps}>
      <div className={styles[`${baseClass}__icon`]}>
        <Icon {...iconConfig[kind]} size="medium" />
      </div>
      <div className={styles[`${baseClass}__content`]}>{children}</div>
      {(action || removable) && (
        <div className={styles[`${baseClass}__actions`]}>
          {action && (
            <Button
              className={styles[`${baseClass}__actions--custom`]}
              kind="plain"
              onClick={() => onActionClick(action)}
            >
              {action.label}
            </Button>
          )}
          {removable && (
            <div
              className={styles[`${baseClass}__actions`]}
              aria-label="Close toast"
              onClick={onClose}
            >
              <Icon
                className={styles[`${baseClass}__actions__close`]}
                source={Close}
                size="medium"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
