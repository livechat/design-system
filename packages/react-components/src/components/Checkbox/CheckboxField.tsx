import * as React from 'react';
import cx from 'clsx';
import { Text } from '../Typography';
import { FieldDescription } from '../FieldDescription';
import { Checkbox } from './Checkbox';

import styles from './Checkbox.module.scss';

export interface ICheckboxFieldProps
  extends React.HTMLAttributes<HTMLInputElement> {
  description?: string;
  checked?: boolean;
  disabled?: boolean;
}

const baseClass = 'checkbox';

export const CheckboxField: React.FC<ICheckboxFieldProps> = ({
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
        <Checkbox {...props} checked={checked} disabled={disabled} />
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
