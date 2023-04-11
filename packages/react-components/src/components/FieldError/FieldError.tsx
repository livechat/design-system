import cx from 'clsx';
import { HTMLAttributes, FC } from 'react';
import { Text } from '../Typography';

import styles from './FieldError.module.scss';

export type FieldErrorProps = HTMLAttributes<HTMLSpanElement>;

const baseClass = 'field-error';

export const FieldError: FC<FieldErrorProps> = ({
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
