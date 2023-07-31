import * as React from 'react';

import cx from 'clsx';

import { Text } from '../Typography';

import styles from './FieldDescription.module.scss';

export type FieldDescriptionProps = React.HTMLAttributes<HTMLSpanElement>;

const baseClass = 'field-description';

export const FieldDescription: React.FC<FieldDescriptionProps> = ({
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
