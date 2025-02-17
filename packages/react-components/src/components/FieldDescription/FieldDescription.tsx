import * as React from 'react';

import cx from 'clsx';

import { Text } from '../Typography';

import * as styles from './styles';

export type FieldDescriptionProps = React.HTMLAttributes<HTMLSpanElement>;

export const FieldDescription: React.FC<
  React.PropsWithChildren<FieldDescriptionProps>
> = ({ children, className = '', ...props }) => {
  const mergedClassNames = cx(styles.fieldDescription, className);

  return (
    <Text as="span" size="sm" {...props} className={mergedClassNames}>
      {children}
    </Text>
  );
};
