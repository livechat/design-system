import * as React from 'react';
import cx from 'classnames';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Block as BlockIcon,
  CheckCircleSolid as CheckIcon,
} from '@livechat/design-system-icons/dist/material';

import { Text } from './Text';
import { Icon, IconSizeName, IconTypeName } from './Icon';

const baseClass = 'lc-alert';

export enum AlertSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum AlertType {
  Info = 'info',
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
}

export interface IAlertProps {
  className?: string;
  size?: AlertSize;
  type?: AlertType;
  onClose?: () => void;
}

const IconConfig = {
  [AlertType.Info]: {
    source: InfoIcon,
    iconType: IconTypeName.Link,
  },
  [AlertType.Warning]: {
    source: WarningIcon,
    iconType: IconTypeName.Warning,
  },
  [AlertType.Success]: {
    source: CheckIcon,
    iconType: IconTypeName.Success,
  },
  [AlertType.Error]: {
    source: BlockIcon,
    iconType: IconTypeName.Error,
  },
};

export const Alert: React.FC<IAlertProps> = ({
  children,
  className,
  size = AlertSize.Small,
  type = AlertType.Info,
  onClose,
}) => {
  const mergedClassNames = cx(
    baseClass,
    `${baseClass}--${type}`,
    `${baseClass}--${size}`,
    className
  );

  return (
    <div className={mergedClassNames}>
      <div className={`${baseClass}__content`}>
        <Icon {...IconConfig[type]} />
        <Text as="div" className={`${baseClass}__content-text`}>
          {children}
        </Text>
      </div>
      {onClose && (
        <button
          type="button"
          className={`${baseClass}__close-icon`}
          onClick={onClose}
        >
          <Icon source={CloseIcon} size={IconSizeName.Large} />
        </button>
      )}
    </div>
  );
};
