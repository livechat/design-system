import * as React from 'react';
import cx from 'classnames';

export type IFieldDescriptionProps = React.HTMLAttributes<HTMLSpanElement>;

const baseClass = 'lc-field-description';

export const FieldDescription: React.FC<IFieldDescriptionProps> = ({
  children,
  className = '',
  ...props
}) => {
  const mergedClassNames = cx(baseClass, className);

  return (
    <span {...props} className={mergedClassNames}>
      {children}
    </span>
  );
};
