import * as React from 'react';
import cx from 'classnames';
import { Loader } from '../Loader';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'basic' | 'primary' | 'secondary' | 'destructive' | 'text';
  size?: 'compact' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  loaderLabel?: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
}

const baseClass = 'lc-btn';

export const Button: React.FC<Props> = ({
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
      [`${baseClass}--disabled`]: disabled,
      [`${baseClass}--loading`]: loading,
      [`${baseClass}--full-width`]: fullWidth,
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
