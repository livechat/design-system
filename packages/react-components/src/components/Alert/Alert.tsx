import * as React from 'react';

import { Icon, IconKind, Tabler } from '@livechat/design-system-icons';
import cx from 'clsx';
import debounce from 'lodash.debounce';

import { Button } from '../Button';
import { Text } from '../Typography';

import styles from './Alert.module.scss';

type AlertKind = 'info' | 'warning' | 'success' | 'error';

export interface AlertProps {
  /**
   * The CSS class for container
   */
  className?: string;
  /**
   * Specify the kind of Alert
   */
  kind?: AlertKind;
  /**
   * Shows the primary CTA button
   */
  primaryButton?: {
    handleClick: () => void;
    label: string;
  };
  /**
   * Shows the secondary CTA button
   */
  secondaryButton?: {
    handleClick: () => void;
    label: string;
  };
  /**
   * The optional event handler for close button
   */
  onClose?: () => void;
}

const IconConfig: Record<AlertKind, { name: string; kind: IconKind }> = {
  info: {
    name: 'InfoIcon',
    kind: 'link',
  },
  warning: {
    name: 'WarningIcon',
    kind: 'warning',
  },
  success: {
    name: 'CheckIcon',
    kind: 'success',
  },
  error: {
    name: 'BlockIcon',
    kind: 'error',
  },
};

const baseClass = 'alert';

export const Alert: React.FC<React.PropsWithChildren<AlertProps>> = ({
  children,
  className,
  primaryButton,
  secondaryButton,
  kind = 'info',
  onClose,
  ...props
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = React.useState<string | null>(null);

  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    containerSize === 'medium' && styles[`${baseClass}--medium`],
    containerSize === 'small' && styles[`${baseClass}--small`],
    className
  );

  React.useEffect(() => {
    const resize = () => {
      if (containerRef.current && containerRef.current.offsetWidth <= 400) {
        return setContainerSize('small');
      }

      if (
        containerRef.current &&
        containerRef.current.offsetWidth > 400 &&
        containerRef.current.offsetWidth <= 800
      ) {
        return setContainerSize('medium');
      }

      return setContainerSize(null);
    };

    const handleResize = debounce(() => {
      resize();
    }, 500);

    window.addEventListener('resize', handleResize);
    resize();

    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <div ref={containerRef} className={mergedClassNames} {...props}>
      <Icon
        set="tabler"
        {...IconConfig[kind]}
        name={IconConfig[kind].name as Tabler}
        size="large"
        className={styles[`${baseClass}__icon`]}
      />
      <div className={styles[`${baseClass}__content`]}>
        <Text as="div" className={styles[`${baseClass}__content__text`]}>
          {children}
        </Text>
        {(primaryButton || secondaryButton) && (
          <div className={styles[`${baseClass}__content__cta`]}>
            {primaryButton && (
              <Button kind="high-contrast" onClick={primaryButton.handleClick}>
                {primaryButton.label}
              </Button>
            )}
            {secondaryButton && (
              <Button
                className={styles[`${baseClass}__content__cta__link`]}
                kind="text"
                onClick={secondaryButton.handleClick}
              >
                {secondaryButton.label}
              </Button>
            )}
          </div>
        )}
      </div>
      {onClose && (
        <Button
          type="button"
          className={styles[`${baseClass}__close-icon`]}
          size="compact"
          kind="plain"
          icon={<Icon name="Close" />}
          onClick={onClose}
        />
      )}
    </div>
  );
};
