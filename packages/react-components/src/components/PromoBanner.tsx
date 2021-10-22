import * as React from 'react';
import cx from 'classnames';

import { Button } from './Button';

// TODO: remove and use the Icon wrapper with correct icon after migration
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

const baseClass = 'lc-promo-banner';

export enum PromoBannerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface IPromoBannerProps {
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

export const PromoBanner: React.FC<IPromoBannerProps> = ({
  className,
  buttonText,
  children,
  header,
  img,
  light,
  linkText,
  size = PromoBannerSize.Small,
  onButtonClick,
  onClose,
  onLinkClick,
}) => {
  const mergedClassNames = cx(
    baseClass,
    {
      [`${baseClass}--light`]: light,
      [`${baseClass}--${size}`]: size,
    },
    className
  );

  const shouldRenderLargeFooter = (buttonText || linkText) && size === 'large';
  const shouldRenderSmallOrMediumFooter =
    (buttonText || linkText) && size !== 'large';

  const footer = (
    <div className={`${baseClass}__footer`}>
      {buttonText && (
        <Button
          kind="primary"
          size="compact"
          onClick={onButtonClick}
          className={`${baseClass}__button-text`}
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
      <div className={`${baseClass}__content`}>
        {img && <img src={img} className={`${baseClass}__img`} />}
        <div className={`${baseClass}__wrapper`}>
          <div className={`${baseClass}__header`}>{header}</div>
          <div>{children}</div>
          {shouldRenderSmallOrMediumFooter && footer}
        </div>
        {shouldRenderLargeFooter && footer}
      </div>
      {onClose && (
        <button
          type="button"
          className={`${baseClass}__close-icon`}
          onClick={onClose}
        >
          {/* TODO: remove and use the Icon wrapper with correct icon after migration */}
          <CloseIcon fill="#424d57" />
        </button>
      )}
    </div>
  );
};
