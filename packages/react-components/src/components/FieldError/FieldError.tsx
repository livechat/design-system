import * as React from 'react';
import cx from 'clsx';
import { Text } from '../Typography';

import styles from './FieldError.module.scss';

export type FieldErrorProps = React.HTMLAttributes<HTMLSpanElement>;

const baseClass = 'field-error';

export const FieldError: React.FC<FieldErrorProps> = ({
  children,
  className = '',
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <Text as="span" size="sm" {...props} className={mergedClassNames}>
      {children}
    </Text>
  );
};
