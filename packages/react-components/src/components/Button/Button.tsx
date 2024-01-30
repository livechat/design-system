import * as React from 'react';

import cx from 'clsx';

import { Loader } from '../Loader';

import { getSpinnerColors } from './helpers';
import { ButtonKind, ButtonSize } from './types';

import styles from './Button.module.scss';

export type ButtonProps = {
  /**
   * Specify the button kind
   */
  kind?: ButtonKind;
  /**
   * Specify the button size
   */
  size?: ButtonSize;
  /**
   * Set the loading state
   */
  loading?: boolean;
  /**
   * Set the button for full width
   */
  fullWidth?: boolean;
  /**
   * Text displayed in loading state
   */
  loaderLabel?: string;
  /**
   * Renders given element
   */
  icon?: React.ReactElement;
  /**
   * Specify the place to render element given in `icon` prop
   */
  iconPosition?: 'left' | 'right';
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const baseClass = 'btn';

export const Button = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps
>(
  (
    {
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
    },
    ref
  ) => {
    const isDisabled = loading || disabled;
    const isIconOnly = !children && icon;
    const isTextButton = ['text', 'link', 'link-light'].includes(kind);

    const Component = href ? 'a' : 'button';

    const mergedClassNames = cx(
      className,
      styles[baseClass],
      styles[`${baseClass}--${kind}`],
      styles[`${baseClass}--${size}`],
      {
        [styles[`${baseClass}--loading`]]: loading,
        [styles[`${baseClass}--full-width`]]: fullWidth,
        [styles[`${baseClass}--with-${iconPosition}-icon`]]:
          icon && !isIconOnly && !isTextButton,
        [styles[`${baseClass}--icon-only`]]: isIconOnly,
        [styles[`${baseClass}--icon-only--bg`]]: isIconOnly && isTextButton,
        [styles[`${baseClass}--disabled`]]: isDisabled,
      }
    );

    return (
      <Component
        ref={ref}
        className={mergedClassNames}
        aria-disabled={isDisabled}
        type={type}
        disabled={isDisabled}
        {...(!isDisabled && { href, onClick })}
        {...props}
      >
        {loading && (
          <Loader
            size="small"
            label={loaderLabel}
            className={styles[`${baseClass}__loader`]}
            {...getSpinnerColors(kind)}
          />
        )}
        {icon &&
          React.cloneElement(icon, {
            className: cx(
              icon.props.className,
              styles[`${baseClass}__icon`],
              styles[`${baseClass}__icon--${iconPosition}`]
            ),
            disabled,
          })}
        <div className={styles[`${baseClass}__content`]}>{children}</div>
      </Component>
    );
  }
);
