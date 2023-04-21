import * as React from 'react';
import cx from 'clsx';
import { Close as CloseIcon } from '@livechat/design-system-icons/react/material';
import debounce from 'lodash.debounce';

import { Button } from '../Button';
import { Icon } from '../Icon';

import styles from './PromoBanner.module.scss';

const SMALL_CONTAINER_WIDTH_TRESHOLD = 400;
const LARGE_CONTAINER_WIDTH_TRESHOLD = 800;
const RESIZE_DEBOUNCE_TRESHOLD = 500;

const baseClass = 'promo-banner';

export interface PromoBannerProps {
  className?: string;
  buttonText?: string;
  header: string;
  img?: string;
  light?: boolean;
  linkText?: string;
  onButtonClick?: () => void;
  onClose?: () => void;
  onLinkClick?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  className,
  buttonText,
  children,
  header,
  img,
  light = false,
  linkText,
  onButtonClick,
  onClose,
  onLinkClick,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = React.useState<
    'small' | 'medium' | 'large'
  >('medium');

  const mergedClassNames = cx(
    styles[baseClass],
    {
      [styles[`${baseClass}--light`]]: light,
      [styles[`${baseClass}--small`]]: containerSize === 'small',
      [styles[`${baseClass}--large`]]: containerSize === 'large',
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

      if (
        containerRef.current &&
        containerRef.current.offsetWidth >= LARGE_CONTAINER_WIDTH_TRESHOLD
      ) {
        return setContainerSize('large');
      }

      return setContainerSize('medium');
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

  const footer = (
    <div className={styles[`${baseClass}__footer`]}>
      {buttonText && (
        <Button
          kind="primary"
          size="compact"
          onClick={onButtonClick}
          className={styles[`${baseClass}__button-text`]}
        >
          {buttonText}
        </Button>
      )}
      {linkText && (
        <Button size="compact" kind="text" onClick={onLinkClick}>
          {linkText}
        </Button>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className={mergedClassNames}>
      <div className={styles[`${baseClass}__content`]}>
        {img && <img src={img} className={styles[`${baseClass}__img`]} />}
        <div className={styles[`${baseClass}__wrapper`]}>
          <div className={styles[`${baseClass}__header`]}>{header}</div>
          <div>{children}</div>
          {containerSize !== 'large' && footer}
        </div>
        {containerSize === 'large' && footer}
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
