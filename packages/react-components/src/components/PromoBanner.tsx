import * as React from 'react';
import cx from 'classnames';
// TODO: remove and use the Icon wrapper with correct icon after migration
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

// TODO: Remove after `Button` component migration
interface IButtonProps {
  children: string;
  className?: string;
  testId: string;
  onClick?(): void;
}
const Button = ({ children, className, testId, onClick }: IButtonProps) => (
  <button data-testid={testId} className={className} onClick={onClick}>
    {children}
  </button>
);

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
          testId="button"
          onClick={onButtonClick}
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

        <Button testId="link" onClick={onLinkClick}>
          {linkText}
        </Button>
      )}
    </div>
  );

  return (
    <div className={mergedClassNames}>
      <div className={`${baseClass}__content`}>
        {img && (
          <img src={img} data-testid="img" className={`${baseClass}__img`} />
        )}
        <div className={`${baseClass}__wrapper`}>
          <div className={`${baseClass}__header`}>{header}</div>
          <div>{children}</div>
          {shouldRenderSmallOrMediumFooter && footer}
        </div>
        {shouldRenderLargeFooter && footer}
      </div>
      {onClose && (
        <button
          data-testid="close"
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
