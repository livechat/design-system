import * as React from 'react';

import cx from 'clsx';

import { useReadOnlyFormFieldContext } from '../../providers/ReadOnlyFormFieldProvider';
import { FieldDescription } from '../FieldDescription';
import { Text } from '../Typography';

import styles from './RadioButton.module.scss';

export interface RadioButtonProps
  extends React.HTMLAttributes<HTMLInputElement> {
  description?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

const baseClass = 'radio-button';

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    { children, className = '', description, checked, disabled, ...props },
    ref
  ) => {
    const { readOnly } = useReadOnlyFormFieldContext();
    const computedReadOnly = readOnly || props.readOnly;

    const mergedClassNames = cx(styles[baseClass], className, {
      [styles[`${baseClass}--selected`]]: checked,
      [styles[`${baseClass}--disabled`]]: disabled,
      [styles[`${baseClass}--read-only`]]: computedReadOnly,
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
