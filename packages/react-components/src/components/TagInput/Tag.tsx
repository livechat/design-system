import * as React from 'react';
import cx from 'classnames';
import { Text } from '../Text';

const baseClass = 'lc-tag-input__tag';

export type ITagProps = React.HTMLAttributes<HTMLDivElement>;

export const Tag: React.FC<ITagProps> = ({
  className = '',
  children,
  ...restProps
}) => {
  const mergedClassNames = cx(baseClass, className);

  return (
    <Text className={mergedClassNames} {...restProps} as="div" size="md">
      {children}
    </Text>
  );
};
