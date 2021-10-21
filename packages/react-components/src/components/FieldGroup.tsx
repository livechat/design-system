import * as React from 'react';
import cx from 'classnames';
import { FieldError } from './FieldError';
import { FieldDescription } from './FieldDescription';

export interface IFieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  inline?: boolean;
  stretch?: boolean;
}

const baseClass = 'lc-field-group';

export const FieldGroup: React.FC<IFieldGroupProps> = ({
  className = '',
  children,
  description,
  error,
  inline,
  stretch,
  ...props
}) => {
  const mergedClassNames = cx(baseClass, {
    [className]: !!className,
    [`${baseClass}--inline`]: inline,
    [`${baseClass}--stretched`]: stretch,
  });

  return (
    <div {...props} className={mergedClassNames}>
      {children}
      {error && <FieldError>{error}</FieldError>}
      {description && <FieldDescription>{description}</FieldDescription>}
    </div>
  );
};
