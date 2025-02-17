import * as React from 'react';

import cx from 'clsx';

import { Loader } from '../Loader';

import {
  buttonRef,
  getSpinnerColors,
  handleKeyboardInteraction,
  handleMouseInteraction,
} from './Button.helpers';
import { ButtonKind, ButtonSize } from './types';

import styles from './Button.module.scss';

export type ButtonProps = {
  /**
   * Specify the button kind
   * @note The 'basic' kind is deprecated and will be removed in a future release. Please use 'secondary' instead.
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
  /**
   * Set to enable animation that will show label on button hover if icon is present
   */
  animatedLabel?: boolean;
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
      kind = 'secondary',
      size = 'medium',
      icon = null,
      iconPosition = 'left',
      loaderLabel,
      className,
      children,
      href,
      onClick,
      animatedLabel,
      ...props
    },
    ref
  ) => {
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [isLabelOpen, setIsLabelOpen] = React.useState(false);
    const isDisabled = loading || disabled;
    const isIconOnly = !children && icon;
    const isAnimatedLabel = animatedLabel && children && icon;
    const isTextButton = ['text', 'link', 'link-light'].includes(kind);

    const Component = href ? 'a' : 'button';

    const mergedClassNames = cx(
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
        [styles[`${baseClass}--animated-label`]]: isAnimatedLabel,
        [styles[`${baseClass}--animated-label--expanded`]]:
          isAnimatedLabel && isLabelOpen,
      },
      className
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
        {...(isAnimatedLabel && {
          onMouseEnter: (e) =>
            handleMouseInteraction(
              e,
              () => setIsLabelOpen(true),
              props?.onMouseEnter
            ),
          onMouseLeave: (e) =>
            handleMouseInteraction(
              e,
              () => setIsLabelOpen(false),
              props?.onMouseLeave
            ),
          onBlur: (e) =>
            handleKeyboardInteraction(
              e,
              () => setIsLabelOpen(false),
              props?.onBlur
            ),
          onKeyUp: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsLabelOpen(true);
            }
            if (e.key === 'Escape') {
              setIsLabelOpen(false);
            }
            props?.onKeyUp?.(e as React.KeyboardEvent<HTMLButtonElement>);
          },
        })}
      >
        {loading && (
          <Loader
            data-testid="button-loader"
            size="small"
            label={loaderLabel}
            className={styles[`${baseClass}__loader`]}
            {...getSpinnerColors(kind)}
          />
        )}
        {icon &&
          React.cloneElement(icon, {
            className: cx(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              icon.props.className,
              styles[`${baseClass}__icon`],
              styles[`${baseClass}__icon--${iconPosition}`],
              {
                [styles[`${baseClass}__icon--small`]]: size === 'xcompact',
              }
            ),
            disabled,
            size: size === 'xcompact' ? 'small' : 'medium',
          })}
        <div
          className={styles[`${baseClass}__content`]}
          style={
            isAnimatedLabel
              ? { maxWidth: isLabelOpen ? labelWidth : 0 }
              : undefined
          }
        >
          {isAnimatedLabel ? (
            <span ref={(node) => buttonRef(node, setLabelWidth)}>
              {children}
            </span>
          ) : (
            children
          )}
        </div>
      </Component>
    );
  }
);
