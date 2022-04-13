import * as React from 'react';
import cx from 'clsx';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Block as BlockIcon,
  CheckCircleSolid as CheckIcon,
} from '@livechat/design-system-icons/react/material';
import debounce from 'lodash.debounce';

import { Text } from '../Typography';
import { Icon, IconSizeName, IconTypeName } from '../Icon';

import styles from './Alert.module.scss';

export enum AlertType {
  Info = 'info',
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
}

export interface AlertProps {
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

const baseClass = 'alert';

export const Alert: React.FC<AlertProps> = ({
  children,
  className,
  type = AlertType.Info,
  onClose,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isSmallContainer, setIsSmallContainer] = React.useState(false);

  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${type}`],
    isSmallContainer && styles[`${baseClass}--small`],
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
      <div className={styles[`${baseClass}__content`]}>
        <Icon
          {...IconConfig[type]}
          className={styles[`${baseClass}__content-icon`]}
        />
        <Text
          as="div"
          className={cx(
            styles[`${baseClass}__content-text`],
            onClose && styles[`${baseClass}__content-text--margin`]
          )}
        >
          {children}
        </Text>
      </div>
      {onClose && (
        <button
          type="button"
          className={styles[`${baseClass}__close-icon`]}
          onClick={onClose}
        >
          <Icon
            source={CloseIcon}
            size={IconSizeName.Large}
            iconType={IconTypeName.Primary}
          />
        </button>
      )}
    </div>
  );
};
