import * as React from 'react';
import cx from 'clsx';
import { Close as CloseIcon } from '@livechat/design-system-icons/react/material';
import { debounce } from 'lodash';

import { Button } from '../Button';
import { Icon } from '../Icon';

import styles from './PromoBanner.module.scss';

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
  const [isSmallContainer, setIsSmallContainer] = React.useState(false);
  const [isLargeContainer, setIsLargeContainer] = React.useState(false);

  const mergedClassNames = cx(
    styles[baseClass],
    {
      [styles[`${baseClass}--light`]]: light,
      [styles[`${baseClass}--small`]]: isSmallContainer,
      [styles[`${baseClass}--large`]]: isLargeContainer,
    },
    className
  );

  React.useEffect(() => {
    const handleResize = debounce(() => {
      if (containerRef.current && containerRef.current.offsetWidth <= 400) {
        return setIsSmallContainer(true);
      }

      if (containerRef.current && containerRef.current.offsetWidth >= 800) {
        return setIsLargeContainer(true);
      }

      setIsLargeContainer(false);
      return setIsSmallContainer(false);
    }, 500);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

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
          {!isLargeContainer && footer}
        </div>
        {isLargeContainer && footer}
      </div>
      {onClose && (
        <button
          type="button"
          className={styles[`${baseClass}__close-icon`]}
          onClick={onClose}
        >
          <Icon source={CloseIcon} size="large" />
        </button>
      )}
    </div>
  );
};
