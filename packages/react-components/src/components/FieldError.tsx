import * as React from 'react';
import cx from 'classnames';
import { Text } from './Text';

export type IFieldErrorProps = React.HTMLAttributes<HTMLSpanElement>;

const baseClass = 'lc-field-error';

export const FieldError: React.FC<IFieldErrorProps> = ({
  children,
  className = '',
  ...props
}) => {
  const mergedClassNames = cx(baseClass, className);

  return (
    <Text as="span" size="sm" {...props} className={mergedClassNames}>
      {children}
    </Text>
  );
};
