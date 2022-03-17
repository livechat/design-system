import * as React from 'react';
import cx from 'clsx';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Block as BlockIcon,
  CheckCircleSolid as CheckIcon,
} from '@livechat/design-system-icons/react/material';

import { Text } from '../Typography';
import { Icon, IconSizeName, IconTypeName } from '../Icon';

import styles from './Alert.module.scss';

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

export interface AlertProps {
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

const baseClass = 'alert';

export const Alert: React.FC<AlertProps> = ({
  children,
  className,
  size = AlertSize.Small,
  type = AlertType.Info,
  onClose,
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${type}`],
    styles[`${baseClass}--${size}`],
    className
  );

  return (
    <div className={mergedClassNames}>
      <div className={styles[`${baseClass}__content`]}>
        <Icon {...IconConfig[type]} />
        <Text as="div" className={styles[`${baseClass}__content-text`]}>
          {children}
        </Text>
      </div>
      {onClose && (
        <button
          type="button"
          className={styles[`${baseClass}__close-icon`]}
          onClick={onClose}
        >
          <Icon source={CloseIcon} size={IconSizeName.Large} />
        </button>
      )}
    </div>
  );
};
