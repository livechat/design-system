import * as React from 'react';

import { Error } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Icon } from '../Icon';
import { Text } from '../Typography';

import styles from './FieldError.module.scss';

export type FieldErrorProps = React.HTMLAttributes<HTMLSpanElement>;

const baseClass = 'field-error';

export const FieldError: React.FC<React.PropsWithChildren<FieldErrorProps>> = ({
  children,
  className = '',
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <Text as="span" size="sm" {...props} className={mergedClassNames}>
      <Icon
        source={Error}
        className={styles[`${baseClass}__icon`]}
        size="small"
      />
      {children}
    </Text>
  );
};
