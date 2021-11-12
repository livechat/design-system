import * as React from 'react';
import cx from 'classnames';

import {
  Close,
  Info,
  Warning,
  CheckCircleSolid,
  Error,
} from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName, IconTypeName } from './Icon';

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

const IconConfig = {
  [Variants.Success]: {
    source: CheckCircleSolid,
    iconType: IconTypeName.Inverted,
  },
  [Variants.Warning]: {
    source: Warning,
  },
  [Variants.Error]: {
    source: Error,
    iconType: IconTypeName.Inverted,
  },
  [Variants.Info]: {
    source: Info,
    iconType: IconTypeName.Inverted,
  },
  [Variants.Notification]: {
    source: Info,
    iconType: IconTypeName.Link,
  },
};

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
      action.handler();
      return onClose();
    }

    return action.handler();
  };

  return (
    <div className={mergedClassNames}>
      <div className={`${baseClass}__icon`}>
        <Icon {...IconConfig[variant]} />
      </div>
      <div className={`${baseClass}__content`}>{children}</div>
      {(action || removable) && (
        <div className={`${baseClass}__actions`}>
          {action && (
            <button
              className={`${baseClass}__actions-custom`}
              onClick={() => onActionClick(action)}
            >
              {action.label}
            </button>
          )}
          {removable && (
            <div
              className={`${baseClass}__actions-close`}
              aria-label="Close toast"
              onClick={onClose}
            >
              <Icon
                source={Close}
                size={IconSizeName.Small}
                iconType={
                  [Variants.Warning, Variants.Notification].includes(variant)
                    ? IconTypeName.Primary
                    : IconTypeName.Inverted
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
