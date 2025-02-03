import * as React from 'react';

import cx from 'clsx';

import { useReadOnlyFormFieldContext } from '../../providers/ReadOnlyFormFieldProvider';
import { FieldDescription } from '../FieldDescription';
import { Text } from '../Typography';

import styles from './Checkbox.module.scss';

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  /**
   * Specify whether the checkbox should be disabled
   */
  disabled?: boolean;
  /**
   * Specify whether the checkbox should be read only
   */
  readOnly?: boolean;
  /**
   * Specify whether the checkbox should be checked
   */
  checked?: boolean;
  /**
   * Set the checkbox description
   */
  description?: React.ReactNode;
  /**
   * Specify whether the checkbox should be in indeterminate state
   */
  indeterminate?: boolean;
}

const baseClass = 'checkbox';

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      indeterminate = false,
      disabled,
      children,
      description,
      className,
      ...restInputProps
    },
    ref
  ) => {
    const { readOnly } = useReadOnlyFormFieldContext();
    const computedReadOnly = readOnly || restInputProps.readOnly;

    return (
      <div
        className={cx(styles[baseClass], className, {
          [styles[`${baseClass}--selected`]]: checked,
          [styles[`${baseClass}--disabled`]]: disabled,
          [styles[`${baseClass}--indeterminate`]]: indeterminate,
          [styles[`${baseClass}--read-only`]]: computedReadOnly,
        })}
      >
        <label className={styles[`${baseClass}__label`]}>
          <input
            {...restInputProps}
            ref={(element) => {
              if (element) {
                element.indeterminate = indeterminate;
                if (typeof ref === 'function') {
                  ref(element);
                } else if (ref) {
                  ref.current = element;
                }
              }
            }}
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
