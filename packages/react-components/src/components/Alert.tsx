import * as React from 'react';
import cx from 'classnames';
// TODO: remove and use the Icon wrapper with correct icon after migration
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import { AlertIcon } from './AlertIcon';

const baseClass = 'lc-alert';

export enum AlertSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum AlertType {
  Info = 'info',
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
}

export interface IAlertProps {
  className?: string;
  size?: AlertSize;
  type?: AlertType;
  onClose?: () => void;
}

export const Alert: React.FC<IAlertProps> = ({
  children,
  className,
  size = AlertSize.Small,
  type = AlertType.Info,
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
        <AlertIcon type={type} />
        <div className={`${baseClass}__content-text`}>{children}</div>
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
