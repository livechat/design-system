import cx from 'clsx';
import * as React from 'react';
import { Check } from '@livechat/design-system-icons/react/material';

import { Icon } from '../Icon';
import { Text } from '../Typography';
import { FieldDescription } from '../FieldDescription';

import styles from './Checkbox.module.scss';

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  checked?: boolean;
  description?: string;
  children?: React.ReactNode;
}

const baseClass = 'checkbox';

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { checked, disabled, children, description, className, ...restInputProps },
    ref
  ) => {
    return (
      <div
        className={cx(styles[baseClass], className, {
          [styles[`${baseClass}--selected`]]: checked,
          [styles[`${baseClass}--disabled`]]: disabled,
        })}
      >
        <label className={styles[`${baseClass}__label`]}>
          <div>
            <input
              {...restInputProps}
              ref={ref}
              checked={checked}
              disabled={disabled}
              className={styles[`${baseClass}__input`]}
              type="checkbox"
            />
            <div className={styles[`${baseClass}__square`]}>
              <Icon
                source={Check}
                kind="inverted"
                size="xsmall"
                className={styles[`${baseClass}__checkmark`]}
              />
            </div>
          </div>
          {children && (
            <Text as="div" size="md" className={styles[`${baseClass}__text`]}>
              {children}
            </Text>
          )}
        </label>
        {description && (
          <FieldDescription className={styles[`${baseClass}__helper`]}>
            {description}
          </FieldDescription>
        )}
      </div>
    );
  }
);
