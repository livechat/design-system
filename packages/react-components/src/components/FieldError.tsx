import * as React from 'react';
import cx from 'classnames';

export type IFieldErrorProps = React.HTMLAttributes<HTMLSpanElement>;

const baseClass = 'lc-field-error';

export const FieldError: React.FC<IFieldErrorProps> = ({
  children,
  className = '',
  ...props
}) => {
  const mergedClassNames = cx(baseClass, { [className]: !!className });

  return (
    <span {...props} className={mergedClassNames}>
      {children}
    </span>
  );
};
