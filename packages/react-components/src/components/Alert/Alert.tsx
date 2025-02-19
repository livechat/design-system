import * as React from 'react';

import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Block as BlockIcon,
  CheckCircle as CheckIcon,
} from '@livechat/design-system-icons';
import cx from 'clsx';
import debounce from 'lodash.debounce';

import { ComponentCoreProps } from '../../utils/types';
import { Button, ButtonProps } from '../Button';
import { Icon, IconSource, IconKind } from '../Icon';
import { Text } from '../Typography';

import styles from './Alert.module.scss';

type AlertKind = 'info' | 'warning' | 'success' | 'error';

type OldButtonProps = {
  handleClick: () => void;
  label: string;
};

export interface AlertProps extends ComponentCoreProps {
  /**
   * Specify the kind of Alert
   */
  kind?: AlertKind;
  /**
   * Shows the primary CTA button
   */
  primaryButton?: ButtonProps & OldButtonProps;
  /**
   * Shows the secondary CTA button
   */
  secondaryButton?: ButtonProps & OldButtonProps;
  /**
   * The optional event handler for close button
   */
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
    containerSize === 'large' && styles[`${baseClass}--large`],
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

      return setContainerSize('large');
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
      <div className={styles[`${baseClass}__content`]}>
        <div className={styles[`${baseClass}__content__wrapper`]}>
          <Icon
            {...IconConfig[kind]}
            size="large"
            className={styles[`${baseClass}__icon`]}
          />
          <Text
            as="div"
            className={styles[`${baseClass}__content__wrapper__text`]}
          >
            {children}
          </Text>
        </div>
        {(primaryButton || secondaryButton) && (
          <div className={styles[`${baseClass}__content__wrapper__cta`]}>
            {primaryButton && (
              <Button
                kind="high-contrast"
                onClick={primaryButton.handleClick}
                {...primaryButton}
              >
                {primaryButton.label}
              </Button>
            )}
            {secondaryButton && (
              <Button
                className={cx(
                  styles[`${baseClass}__content__wrapper__cta__link`],
                  secondaryButton.className
                )}
                kind="text"
                onClick={secondaryButton.handleClick}
                {...secondaryButton}
              >
                {secondaryButton.label}
              </Button>
            )}
          </div>
        )}
      </div>
      {onClose && (
        <Button
          aria-label="Close alert"
          className={styles[`${baseClass}__close-icon`]}
          size="compact"
          kind="plain"
          icon={<Icon source={CloseIcon} />}
          onClick={onClose}
        />
      )}
    </div>
  );
};
