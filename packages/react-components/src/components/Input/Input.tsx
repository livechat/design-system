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

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  kind?: InputSize;
  error?: boolean;
  disabled?: boolean;
  icon?: React.ReactElement;
}

const baseClass = 'input';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      kind = 'medium',
      error = false,
      disabled,
      icon = null,
      className,
      ...inputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const { type } = inputProps;
    const mergedClassNames = cx(
      className,
      styles[baseClass],
      styles[`${baseClass}--${kind}`],
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
          {...inputProps}
          data-testid="input"
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          type={type && !isPasswordVisible ? type : 'text'}
        />
        {type === 'password' && (
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
