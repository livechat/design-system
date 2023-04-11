import cx from 'clsx';
import { HTMLAttributes, FC } from 'react';
import { Text } from '../Typography';

import styles from './FieldDescription.module.scss';

export type FieldDescriptionProps = HTMLAttributes<HTMLSpanElement>;

const baseClass = 'field-description';

export const FieldDescription: FC<FieldDescriptionProps> = ({
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
