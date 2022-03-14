import * as React from 'react';
import cx from 'classnames';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Block as BlockIcon,
  CheckCircleSolid as CheckIcon,
} from '@livechat/design-system-icons/dist/material';
import { debounce } from 'lodash';

import { Text } from './Text';
import { Icon, IconSizeName, IconTypeName } from './Icon';

const baseClass = 'lc-alert';

export enum AlertType {
  Info = 'info',
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
}

export interface IAlertProps {
  className?: string;
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
  type = AlertType.Info,
  onClose,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isSmallContainer, setIsSmallContainer] = React.useState(false);

  const mergedClassNames = cx(
    baseClass,
    `${baseClass}--${type}`,
    isSmallContainer && `${baseClass}--small`,
    className
  );

  React.useEffect(() => {
    const handleResize = debounce(() => {
      if (containerRef.current && containerRef.current.offsetWidth <= 400) {
        return setIsSmallContainer(true);
      }
      return setIsSmallContainer(false);
    }, 500);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <div ref={containerRef} className={mergedClassNames}>
      <div className={`${baseClass}__content`}>
        <Icon {...IconConfig[type]} className={`${baseClass}__content-icon`} />
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
