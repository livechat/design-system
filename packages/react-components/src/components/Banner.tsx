import * as React from 'react';
import cx from 'classnames';
// TODO: remove and use the Icon wrapper with correct icon after migration
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import { BannerIcon } from './BannerIcon';

const baseClass = 'lc-banner';

export enum BannerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum BannerType {
  Info = 'info',
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
}

export interface IBannerProps {
  children: React.ReactElement;
  className?: string;
  size?: BannerSize;
  type: BannerType;
  onClose?: () => void;
}

export const Banner: React.FC<IBannerProps> = ({
  children,
  className,
  size = BannerSize.Small,
  type = BannerType.Info,
  onClose,
}) => {
  const mergedClassNames = cx(
    baseClass,
    {
      [`${baseClass}--${type}`]: type,
      [`${baseClass}--${size}`]: size,
    },
    className
  );

  return (
    <div className={mergedClassNames}>
      <div className={`${baseClass}__content`}>
        <BannerIcon type={type} />
        <div className={`${baseClass}__content-text`}>{children}</div>
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
