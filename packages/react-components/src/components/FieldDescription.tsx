import * as React from 'react';
import cx from 'classnames';

export type IFieldDescriptionProps = React.HTMLAttributes<HTMLSpanElement>;

export const FieldDescription: React.FC<IFieldDescriptionProps> = ({
  children,
  className: extraClassName = '',
  ...props
}) => {
  const baseClass = 'lc-field-description';
  const mergedClassNames = cx({
    [baseClass]: true,
    [extraClassName]: !!extraClassName,
  });

  return (
    <span className={mergedClassNames} {...props}>
      {children}
    </span>
  );
};
