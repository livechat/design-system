import * as React from 'react';
import cx from 'clsx';
import { FieldDescription } from '../FieldDescription';
import { Text } from '../Typography';

import styles from './RadioButton.module.scss';

export interface RadioButtonProps
  extends React.HTMLAttributes<HTMLInputElement> {
  description?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
}

const baseClass = 'radio-button';

export const RadioButton: React.FC<RadioButtonProps> = ({
  children,
  className = '',
  description,
  checked,
  disabled,
  ...props
}) => {
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
            className={styles[`${baseClass}__input`]}
            {...props}
            type="radio"
            checked={checked}
            disabled={disabled}
          />
        </div>
        <Text as="div" size="md" className={styles[`${baseClass}__text`]}>
          {children}
        </Text>
      </label>
      {description && (
        <FieldDescription className={styles[`${baseClass}__helper`]}>
          {description}
        </FieldDescription>
      )}
    </div>
  );
};
