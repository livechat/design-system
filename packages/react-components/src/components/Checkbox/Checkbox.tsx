import cx from 'clsx';
import * as React from 'react';

import { Text } from '../Typography';
import { FieldDescription } from '../FieldDescription';

import styles from './Checkbox.module.scss';

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  checked?: boolean;
  description?: string;
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
          <input
            {...restInputProps}
            ref={ref}
            checked={checked}
            disabled={disabled}
            className={styles[`${baseClass}__input`]}
            type="checkbox"
          />
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
