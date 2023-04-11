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
import { Icon, IconSource, IconKind } from '../Icon';

import styles from './Alert.module.scss';
import { FC, useEffect, useRef, useState } from 'react';

type AlertKind = 'info' | 'warning' | 'success' | 'error';

export interface AlertProps {
  className?: string;
  kind?: AlertKind;
  onClose?: () => void;
}

const IconConfig: Record<AlertKind, { source: IconSource; kind: IconKind }> = {
  info: {
    source: InfoIcon,
    kind: 'link',
  },
  warning: {
    source: WarningIcon,
    kind: 'warning',
  },
  success: {
    source: CheckIcon,
    kind: 'success',
  },
  error: {
    source: BlockIcon,
    kind: 'error',
  },
};

const baseClass = 'alert';

export const Alert: FC<AlertProps> = ({
  children,
  className,
  kind = 'info',
  onClose,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSmallContainer, setIsSmallContainer] = useState(false);

  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    isSmallContainer && styles[`${baseClass}--small`],
    className
  );

  useEffect(() => {
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
    <div ref={containerRef} className={mergedClassNames} {...props}>
      <div className={styles[`${baseClass}__content`]}>
        <Icon
          {...IconConfig[kind]}
          size="large"
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
          <Icon source={CloseIcon} size="large" kind="primary" />
        </button>
      )}
    </div>
  );
};
