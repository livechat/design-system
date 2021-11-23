import * as React from 'react';
import cx from 'classnames';
import { Loader } from './Loader';

export type ButtonSize = 'compact' | 'medium' | 'large';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'basic' | 'primary' | 'secondary' | 'destructive' | 'text';
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  loaderLabel?: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
}

const baseClass = 'lc-btn';

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled = false,
  type = 'button',
  fullWidth = false,
  kind = 'basic',
  size = 'medium',
  icon = null,
  iconPosition = 'left',
  loaderLabel,
  className,
  children,
  ...props
}) => {
  const isDisabled = loading || disabled;

  const mergedClassNames = cx(
    className,
    baseClass,
    `${baseClass}--${kind}`,
    `${baseClass}--${size}`,
    {
      [`${baseClass}--loading`]: loading,
      [`${baseClass}--full-width`]: fullWidth,
      [`${baseClass}--icon-only`]: !children && icon,
    }
  );

  return (
    <button
      className={mergedClassNames}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {loading && (
        <Loader
          size="small"
          label={loaderLabel}
          className={`${baseClass}__loader`}
        />
      )}
      {icon &&
        React.cloneElement(icon, {
          className: cx(
            `${baseClass}__icon`,
            `${baseClass}__icon--${iconPosition}`
          ),
          disabled,
        })}
      <div className={`${baseClass}__content`}>{children}</div>
    </button>
  );
};
