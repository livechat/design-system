import * as React from 'react';

import { Close } from '@livechat/design-system-icons/react/tabler';
import cx from 'clsx';
import debounce from 'lodash.debounce';

import { Button, ButtonKind } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Typography';

import styles from './PromoBannerV2.module.scss';

const SMALL_CONTAINER_WIDTH_TRESHOLD = 559;
const RESIZE_DEBOUNCE_TRESHOLD = 500;

const baseClass = 'promo-banner-v2';

export interface IPromoBannerV2Props {
  /**
   * Specify an optional className to be applied to the main container node
   */
  className?: string;
  /**
   * Element with additional content for second column
   */
  additionalContent?: React.ReactNode;
  /**
   * Shows the primary CTA button
   */
  primaryButton?: {
    handleClick: () => void;
    label: string;
    kind?: ButtonKind;
  };
  /**
   * Shows the secondary CTA button
   */
  secondaryButton?: {
    handleClick: () => void;
    label: string;
    kind?: ButtonKind;
  };
  /**
   * Event handler for close button press
   */
  onClose?: () => void;
}

export const PromoBannerV2: React.FC<
  React.PropsWithChildren<IPromoBannerV2Props>
> = ({
  children,
  className,
  additionalContent,
  primaryButton,
  secondaryButton,
  onClose,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = React.useState<'small' | null>(
    null
  );

  const mergedClassNames = cx(
    styles[baseClass],
    {
      [styles[`${baseClass}--small`]]: containerSize === 'small',
      'promo-banner-size-small': containerSize === 'small',
    },
    className
  );

  React.useEffect(() => {
    const handleResize = () => {
      if (
        containerRef.current &&
        containerRef.current.offsetWidth <= SMALL_CONTAINER_WIDTH_TRESHOLD
      ) {
        return setContainerSize('small');
      }

      return setContainerSize(null);
    };

    const debouncedHandleResize = debounce(
      handleResize,
      RESIZE_DEBOUNCE_TRESHOLD
    );
    window.addEventListener('resize', debouncedHandleResize);
    handleResize();

    return () => {
      debouncedHandleResize.cancel();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={mergedClassNames}>
      <div className={styles[`${baseClass}__content`]}>
        <Text as="div" className={styles[`${baseClass}__content__text`]}>
          {children}
        </Text>
        <div className={styles[`${baseClass}__content__cta`]}>
          {primaryButton && (
            <Button
              kind={primaryButton?.kind || 'primary'}
              onClick={primaryButton.handleClick}
            >
              {primaryButton.label}
            </Button>
          )}
          {secondaryButton && (
            <Button
              kind={secondaryButton?.kind || 'text'}
              onClick={secondaryButton.handleClick}
            >
              {secondaryButton.label}
            </Button>
          )}
        </div>
      </div>
      {additionalContent && (
        <div className={styles[`${baseClass}__additional-content`]}>
          {additionalContent}
        </div>
      )}
      {onClose && (
        <div className={styles[`${baseClass}__close`]}>
          <button
            type="button"
            className={styles[`${baseClass}__close__btn`]}
            onClick={onClose}
          >
            <Icon source={Close} kind="primary" />
          </button>
        </div>
      )}
    </div>
  );
};
