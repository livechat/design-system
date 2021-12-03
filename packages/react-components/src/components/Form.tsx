import * as React from 'react';
import cx from 'classnames';

import { Heading } from './Heading';
import { Text } from './Text';

export interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
  labelText?: string;
  helperText?: string;
  formFooter?: React.ReactNode;
}

const baseClass = 'lc-form';

export const Form: React.FC<IFormProps> = ({
  className,
  children,
  labelText,
  helperText,
  formFooter,
  ...restProps
}) => {
  return (
    <form className={cx(baseClass, className)} {...restProps}>
      {(labelText || helperText) && (
        <div className={`${baseClass}__header`}>
          {labelText && (
            <Heading size="sm" className={`${baseClass}__label`}>
              {labelText}
            </Heading>
          )}
          {helperText && (
            <Text as="p" size="sm" className={`${baseClass}__helper`}>
              {helperText}
            </Text>
          )}
        </div>
      )}
      {children}
      {formFooter && <div className={`${baseClass}__footer`}>{formFooter}</div>}
    </form>
  );
};
