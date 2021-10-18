import * as React from 'react';
import cx from 'classnames';

export type IFieldDescriptionProps = React.HTMLAttributes<HTMLSpanElement>;

export const FieldDescription: React.FC<IFieldDescriptionProps> = ({
  children,
  className = '',
  ...props
}) => {
  const baseClass = 'lc-field-description';
  const mergedClassNames = cx(baseClass, {
    [className]: !!className,
  });

  return (
    <span {...props} className={mergedClassNames}>
      {children}
    </span>
  );
};
