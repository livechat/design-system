import * as React from 'react';
import cx from 'classnames';
import { Text } from './Text';

export type IFieldDescriptionProps = React.HTMLAttributes<HTMLSpanElement>;

const baseClass = 'lc-field-description';

export const FieldDescription: React.FC<IFieldDescriptionProps> = ({
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
