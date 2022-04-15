import * as React from 'react';
import cx from 'clsx';
import { Close as CloseIcon } from '@livechat/design-system-icons/react/material';

import { Button } from '../Button';
import { Icon } from '../Icon';

import styles from './PromoBanner.module.scss';

const baseClass = 'promo-banner';

type PromoBannerSize = 'small' | 'medium' | 'large';

export interface PromoBannerProps {
  className?: string;
  buttonText?: string;
  header: string;
  img?: string;
  light?: boolean;
  linkText?: string;
  size?: PromoBannerSize;
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
  size = 'small',
  onButtonClick,
  onClose,
  onLinkClick,
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    {
      [styles[`${baseClass}--light`]]: light,
      [styles[`${baseClass}--${size}`]]: size,
    },
    className
  );

  const shouldRenderLargeFooter = (buttonText || linkText) && size === 'large';
  const shouldRenderSmallOrMediumFooter =
    (buttonText || linkText) && size !== 'large';

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
    <div className={mergedClassNames}>
      <div className={styles[`${baseClass}__content`]}>
        {img && <img src={img} className={styles[`${baseClass}__img`]} />}
        <div className={styles[`${baseClass}__wrapper`]}>
          <div className={styles[`${baseClass}__header`]}>{header}</div>
          <div>{children}</div>
          {shouldRenderSmallOrMediumFooter && footer}
        </div>
        {shouldRenderLargeFooter && footer}
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
