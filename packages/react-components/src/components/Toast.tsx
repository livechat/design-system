import * as React from 'react';
import cx from 'classnames';

// TODO: remove and use the Icon wrapper with correct icon after migration
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import { ToastIcon } from './ToastIcon';

const baseClass = 'lc-toast';

export enum Variants {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
  Notification = 'notification',
}

interface IToastActionProps {
  handler: () => void;
  label: string;
  closeOnClick?: boolean;
}

export interface IToastProps {
  action?: IToastActionProps;
  className?: string;
  removable?: boolean;
  variant?: Variants;
  onClose?: () => void;
}

export const Toast: React.FC<IToastProps> = ({
  action,
  className,
  children,
  removable,
  variant = Variants.Info,
  onClose,
}) => {
  const mergedClassNames = cx(
    baseClass,
    {
      [`${baseClass}--${variant}`]: variant,
    },
    className
  );

  const onActionClick = (action: IToastActionProps) => {
    if (action && action.closeOnClick && onClose) {
      action.handler;
      return onClose;
    }

    return action.handler;
  };

  return (
    <div className={mergedClassNames}>
      <div className={`${baseClass}__icon`}>
        <ToastIcon variant={variant} />
      </div>
      <div className={`${baseClass}__content`}>{children}</div>
      {(action || removable) && (
        <div className={`${baseClass}__actions`}>
          {action && action.label && action.handler && (
            <button
              data-testid="actionButton"
              className={`${baseClass}__actions-custom`}
              onClick={onActionClick(action)}
            >
              {action.label}
            </button>
          )}
          {removable && (
            <div
              data-testid="closeButton"
              className={`${baseClass}__actions-close`}
              aria-label="Close toast"
              onClick={onClose}
            >
              <CloseIcon />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
