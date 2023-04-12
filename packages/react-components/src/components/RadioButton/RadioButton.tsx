import cx from 'clsx';
import { HTMLAttributes, forwardRef } from 'react';
import { FieldDescription } from '../FieldDescription';
import { Text } from '../Typography';

import styles from './RadioButton.module.scss';

export interface RadioButtonProps extends HTMLAttributes<HTMLInputElement> {
  description?: string;
  checked?: boolean;
  disabled?: boolean;
}

const baseClass = 'radio-button';

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    { children, className = '', description, checked, disabled, ...props },
    ref
  ) => {
    const mergedClassNames = cx(styles[baseClass], className, {
      [styles[`${baseClass}--selected`]]: checked,
      [styles[`${baseClass}--disabled`]]: disabled,
    });

    return (
      <div className={mergedClassNames}>
        <label className={styles[`${baseClass}__label`]}>
          <div className={styles[`${baseClass}__circle`]}>
            <span className={styles[`${baseClass}__inner-circle`]} />
            <input
              {...props}
              className={styles[`${baseClass}__input`]}
              ref={ref}
              type="radio"
              checked={checked}
              disabled={disabled}
            />
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
