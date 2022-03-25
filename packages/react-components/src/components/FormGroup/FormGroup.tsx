import * as React from 'react';
import cx from 'clsx';
import { Text, Heading } from '../Typography';

import styles from './FormGroup.module.scss';

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  labelText?: string;
  helperText?: string;
}

const baseClass = 'form-group';

export const FormGroup: React.FC<FormGroupProps> = ({
  className = '',
  children,
  labelText,
  helperText,
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <div
      {...props}
      role="group"
      {...(labelText && { 'aria-label': labelText })}
      className={mergedClassNames}
    >
      <div className={styles[`${baseClass}__header`]}>
        <Heading as="div" size="sm" className={styles[`${baseClass}__label`]}>
          {labelText}
        </Heading>
        {helperText && (
          <Text as="div" size="sm" className={styles[`${baseClass}__helper`]}>
            {helperText}
          </Text>
        )}
      </div>
      {children}
    </div>
  );
};
