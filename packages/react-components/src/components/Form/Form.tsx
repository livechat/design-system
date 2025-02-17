import * as React from 'react';

import cx from 'clsx';

import { Text, Heading } from '../Typography';

import * as styles from './styles';

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  /**
   * Set form label
   */
  labelText?: string;
  /**
   * Set form description
   */
  helperText?: string;
  /**
   * Footer element
   */
  formFooter?: React.ReactNode;
}

export const Form: React.FC<React.PropsWithChildren<FormProps>> = ({
  className,
  children,
  labelText,
  helperText,
  formFooter,
  ...restProps
}) => {
  return (
    <form className={cx(styles.form, className)} {...restProps}>
      {(labelText || helperText) && (
        <div className={styles.formSection}>
          {labelText && (
            <Heading size="sm" className={styles.formLabel}>
              {labelText}
            </Heading>
          )}
          {helperText && (
            <Text as="p" size="sm" className={styles.formHelper}>
              {helperText}
            </Text>
          )}
        </div>
      )}
      {children}
      {formFooter && <div className={styles.formSection}>{formFooter}</div>}
    </form>
  );
};
