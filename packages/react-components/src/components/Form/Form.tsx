import * as React from 'react';

import cx from 'clsx';

import { Text, Heading } from '../Typography';

import styles from './Form.module.scss';

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

const baseClass = 'form';

export const Form: React.FC<React.PropsWithChildren<FormProps>> = ({
  className,
  children,
  labelText,
  helperText,
  formFooter,
  ...restProps
}) => {
  return (
    <form className={cx(styles[baseClass], className)} {...restProps}>
      {(labelText || helperText) && (
        <div className={styles[`${baseClass}__header`]}>
          {labelText && (
            <Heading size="sm" className={styles[`${baseClass}__label`]}>
              {labelText}
            </Heading>
          )}
          {helperText && (
            <Text as="p" size="sm" className={styles[`${baseClass}__helper`]}>
              {helperText}
            </Text>
          )}
        </div>
      )}
      {children}
      {formFooter && (
        <div className={styles[`${baseClass}__footer`]}>{formFooter}</div>
      )}
    </form>
  );
};
