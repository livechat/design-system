import * as React from 'react';

import {
  VisibilityOn as VisibilityOnIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@livechat/design-system-icons/react/tabler';
import cx from 'clsx';

import { Button } from '../Button';
import { Icon } from '../Icon';

import styles from './Input.module.scss';

interface InputIcon {
  source: React.ReactElement;
  place: 'left' | 'right';
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Specify the input size
   */
  inputSize?: 'xsmall' | 'compact' | 'medium' | 'large';
  /**
   * Specify whether the input should be in error state
   */
  error?: boolean;
  /**
   * Specify whether the input should be disabled
   */
  disabled?: boolean;
  /**
   * Set the icon and its position
   */
  icon?: InputIcon;
  /**
   * Set to enable ellipsis
   */
  cropOnBlur?: boolean;
}

const baseClass = 'input';

const renderIcon = (icon: InputIcon, disabled?: boolean) =>
  React.cloneElement(icon.source, {
    ['data-testid']: `input-icon-${icon.place}`,
    className: cx(
      styles[`${baseClass}__icon`],
      styles[`${baseClass}__icon--${icon.place}`],
      {
        [styles[`${baseClass}__icon--disabled`]]: disabled,
      }
    ),
  });

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = 'medium',
      error = false,
      disabled,
      icon = null,
      className,
      cropOnBlur = true,
      ...inputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const { type, onFocus, onBlur } = inputProps;
    const mergedClassNames = cx(
      className,
      styles[baseClass],
      styles[`${baseClass}--${inputSize}`],
      {
        [styles[`${baseClass}--disabled`]]: disabled,
        [styles[`${baseClass}--focused`]]: isFocused,
        [styles[`${baseClass}--error`]]: error,
        [styles[`${baseClass}--crop`]]: cropOnBlur,
      }
    );
    const iconCustomColor = !disabled
      ? 'var(--content-default)'
      : 'var(--content-disabled)';
    const iconSource = isPasswordVisible ? VisibilityOnIcon : VisibilityOffIcon;
    const shouldRenderLeftIcon = icon && icon.place === 'left';
    const shouldRenderRightIcon =
      icon && type !== 'password' && icon.place === 'right';

    return (
      <div className={mergedClassNames} aria-disabled={disabled} tab-index="0">
        {shouldRenderLeftIcon && renderIcon(icon, disabled)}
        <input
          {...inputProps}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          disabled={disabled}
          type={type && !isPasswordVisible ? type : 'text'}
        />
        {shouldRenderRightIcon && renderIcon(icon, disabled)}
        {type === 'password' && (
          <Button
            disabled={disabled}
            kind="subtle"
            icon={<Icon customColor={iconCustomColor} source={iconSource} />}
            onClick={() => setIsPasswordVisible((v) => !v)}
            className={styles[`${baseClass}__visibility-button`]}
          />
        )}
      </div>
    );
  }
);
