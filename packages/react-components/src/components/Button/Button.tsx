import * as React from 'react';
import cx from 'clsx';
import { Loader } from '../Loader';
import { Size } from 'utils';
import styles from './Button.module.scss';

export type ButtonKind =
  | 'basic'
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'text'
  | 'plain'
  | 'plain-light';

export type ButtonProps = {
  kind?: ButtonKind;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  loaderLabel?: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const baseClass = 'btn';

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
  href,
  onClick,
  ...props
}) => {
  const isDisabled = loading || disabled;

  const Component = href ? 'a' : 'button';

  const mergedClassNames = cx(
    className,
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    styles[`${baseClass}--${size}`],
    {
      [styles[`${baseClass}--loading`]]: loading,
      [styles[`${baseClass}--full-width`]]: fullWidth,
      [styles[`${baseClass}--icon-only`]]: !children && icon,
      [styles[`${baseClass}--disabled`]]: isDisabled,
    }
  );

  return (
    <Component
      className={mergedClassNames}
      aria-disabled={isDisabled}
      type={type}
      href={isDisabled ? undefined : href}
      onClick={isDisabled ? undefined : onClick}
      {...props}
    >
      {loading && (
        <Loader
          size="small"
          label={loaderLabel}
          className={styles[`${baseClass}__loader`]}
        />
      )}
      {icon &&
        React.cloneElement(icon, {
          className: cx(
            styles[`${baseClass}__icon`],
            styles[`${baseClass}__icon--${iconPosition}`]
          ),
          disabled,
        })}
      <div className={styles[`${baseClass}__content`]}>{children}</div>
    </Component>
  );
};
