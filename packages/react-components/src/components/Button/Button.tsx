import * as React from 'react';
import cx from 'classnames';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
  kind?: 'basic' | 'primary' | 'secondary' | 'destructive' | 'text';
  size?: 'compact' | 'medium' | 'large';
}

const baseClass = 'lc-btn';

export const Button: React.FC<Props> = ({
  loading = false,
  disabled = false,
  type = 'button',
  fullWidth = false,
  kind = 'basic',
  size = 'medium',
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
      {children}
    </button>
  );
};
