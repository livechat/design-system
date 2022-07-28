import * as React from 'react';
import cx from 'clsx';

import {
  VisibilityOn as VisibilityOnIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@livechat/design-system-icons/react/material';

import styles from './Input.module.scss';
import { Button } from '../Button';
import { Icon } from '../Icon';

type InputSize = 'compact' | 'medium' | 'large';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  size?: InputSize | undefined;
  error?: boolean | undefined;
  disabled?: boolean | undefined;
  kind?: 'text' | 'password';
  icon?: React.ReactElement;
}

const baseClass = 'input';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'medium',
      error = false,
      disabled,
      kind = 'text',
      icon = null,
      className,
      ...inputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const mergedClassNames = cx(
      className,
      styles[baseClass],
      styles[`${baseClass}--${size}`],
      {
        [styles[`${baseClass}--disabled`]]: disabled,
        [styles[`${baseClass}--focused`]]: isFocused,
        [styles[`${baseClass}--error`]]: error,
      }
    );

    return (
      <div className={mergedClassNames}>
        {icon &&
          React.cloneElement(icon, {
            className: cx(styles[`${baseClass}__icon`], {
              [styles[`${baseClass}__icon--disabled`]]: disabled,
            }),
          })}
        <input
          type={!isPasswordVisible ? kind : 'text'}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          {...inputProps}
        />
        {kind === 'password' && (
          <Button
            disabled={disabled}
            kind="plain"
            icon={
              <Icon
                customColor={
                  !disabled
                    ? 'var(--content-default)'
                    : 'var(--content-disabled)'
                }
                source={
                  !isPasswordVisible ? VisibilityOnIcon : VisibilityOffIcon
                }
              />
            }
            onClick={() => setIsPasswordVisible((v) => !v)}
          />
        )}
      </div>
    );
  }
);
