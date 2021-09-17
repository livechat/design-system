import * as React from 'react';
import cx from 'classnames';
// TODO: remove and use the Icon wrapper with correct icon after migration
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

// TODO: Remove after `Button` component migration
interface IButtonProps {
  children: string;
  className?: string;
  onClick: () => void;
}
const Button = ({ children, className, onClick }: IButtonProps) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

const baseClass = 'lc-promo';

export enum PromoSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface IPromoProps {
  className?: string;
  buttonText?: string;
  children: React.ReactElement;
  header: string;
  img?: string;
  light?: boolean;
  linkText?: string;
  size?: PromoSize;
  onButtonClick?: () => void;
  onClose?: () => void;
  onLinkClick?: () => void;
}

export const Promo: React.FC<IPromoProps> = ({
  className,
  buttonText,
  children,
  header,
  img,
  light,
  linkText,
  size = PromoSize.Small,
  onButtonClick,
  onClose,
  onLinkClick,
}) => {
  const mergedClassNames = cx(
    {
      [`${baseClass}--light`]: light,
      [`${baseClass}--${size}`]: size,
      [`${baseClass}`]: true,
    },
    className
  );

  const shouldRenderLargeFooter = (buttonText || linkText) && size === 'large';
  const shouldRenderSmallOrMediumFooter =
    (buttonText || linkText) && size !== 'large';

  const footer = (
    <div className={`${baseClass}__footer`}>
      {buttonText && (
        // TODO: Use `Button` component after migration
        //
        // <Button
        //   kind="primary"
        //   size="compact"
        //   onClick={onButtonClick}
        //   className={styles[`${baseClass}__button-text`]}
        // >
        //   {buttonText}
        // </Button>

        <Button
          onClick={() => onButtonClick}
          className={`${baseClass}__button-text`}
        >
          {buttonText}
        </Button>
      )}
      {linkText && (
        // TODO: Use `Button` component after migration
        //
        // <Button size="compact" kind="text" onClick={onLinkClick}>
        //   {linkText}
        // </Button>

        <Button onClick={() => onLinkClick}>{linkText}</Button>
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
      <button
        type="button"
        className={`${baseClass}__close-icon`}
        onClick={onClose}
      >
        {/* TODO: remove and use the Icon wrapper with correct icon after migration */}
        <CloseIcon fill="#424d57" />
      </button>
    </div>
  );
};
