import cx from 'clsx';
import { Loader } from '../Loader';
import { Size } from 'utils';
import styles from './Button.module.scss';
import {
  ReactElement,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  FC,
  cloneElement,
} from 'react';

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
  loading?: boolean;
  fullWidth?: boolean;
  loaderLabel?: string;
  icon?: ReactElement;
  iconPosition?: 'left' | 'right';
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const baseClass = 'btn';

export const Button: FC<ButtonProps> = ({
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
  const isIconOnly = !children && icon;
  const isTextButton = ['text', 'plain', 'plain-light'].includes(kind);

  const Component = href ? 'a' : 'button';

  const getSpinnerColors = () => {
    if (kind === 'primary' || kind === 'destructive') {
      return {
        primaryColor: 'var(--action-primary-default)',
        secondaryColor: 'var(--border-invert-primary)',
      };
    }
  };

  const mergedClassNames = cx(
    className,
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    styles[`${baseClass}--${size}`],
    {
      [styles[`${baseClass}--loading`]]: loading,
      [styles[`${baseClass}--full-width`]]: fullWidth,
      [styles[`${baseClass}--icon-only`]]: isIconOnly,
      [styles[`${baseClass}--icon-only--bg`]]: isIconOnly && isTextButton,
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
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <Loader
          size="small"
          label={loaderLabel}
          className={styles[`${baseClass}__loader`]}
          {...getSpinnerColors()}
        />
      )}
      {icon &&
        cloneElement(icon, {
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
