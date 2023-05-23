import * as React from 'react';
import cx from 'clsx';
import { FieldError } from '../FieldError';
import { FieldDescription } from '../FieldDescription';

import styles from './FieldGroup.module.scss';

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: React.ReactNode;
  error?: string;
  inline?: boolean;
  stretch?: boolean;
}

const baseClass = 'field-group';

export const FieldGroup: React.FC<React.PropsWithChildren<FieldGroupProps>> = ({
  className = '',
  children,
  description,
  error,
  inline,
  stretch,
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className, {
    [styles[`${baseClass}--inline`]]: inline,
    [styles[`${baseClass}--stretched`]]: stretch,
  });

  return (
    <div {...props} className={mergedClassNames}>
      {children}
      {error && <FieldError>{error}</FieldError>}
      {description && <FieldDescription>{description}</FieldDescription>}
    </div>
  );
};
