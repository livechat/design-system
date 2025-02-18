import * as React from 'react';

import { Error } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Icon } from '../Icon';
import { Text } from '../Typography';

import * as styles from './styles';

export type FieldErrorProps = React.HTMLAttributes<HTMLSpanElement>;

export const FieldError: React.FC<React.PropsWithChildren<FieldErrorProps>> = ({
  children,
  className = '',
  ...props
}) => {
  const mergedClassNames = cx(styles.fieldError, className);

  return (
    <Text as="span" size="sm" {...props} className={mergedClassNames}>
      <Icon source={Error} className={styles.fieldErrorIcon} size="small" />
      {children}
    </Text>
  );
};
