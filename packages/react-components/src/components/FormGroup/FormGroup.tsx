import * as React from 'react';

import cx from 'clsx';

import { Text, Heading } from '../Typography';

import * as styles from './styles';

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The CSS class for container
   */
  className?: string;
  /**
   * Set form label
   */
  labelText?: string;
  /**
   * Set form description
   */
  helperText?: string;
}

export const FormGroup: React.FC<React.PropsWithChildren<FormGroupProps>> = ({
  className = '',
  children,
  labelText,
  helperText,
  ...props
}) => {
  const mergedClassNames = cx(styles.formGroup, className);

  return (
    <div
      {...props}
      role="group"
      {...(labelText && { 'aria-label': labelText })}
      className={mergedClassNames}
    >
      {(labelText || helperText) && (
        <div className={styles.header}>
          {labelText && (
            <Heading as="div" size="sm" className={styles.label}>
              {labelText}
            </Heading>
          )}
          {helperText && (
            <Text as="div" size="sm" className={styles.helper}>
              {helperText}
            </Text>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
