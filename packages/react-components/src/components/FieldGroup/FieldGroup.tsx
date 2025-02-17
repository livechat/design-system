import * as React from 'react';

import cx from 'clsx';

import { FieldDescription } from '../FieldDescription';
import { FieldError } from '../FieldError';

import * as styles from './styles';

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: React.ReactNode;
  error?: string;
  inline?: boolean;
  stretch?: boolean;
}

export const FieldGroup: React.FC<React.PropsWithChildren<FieldGroupProps>> = ({
  className = '',
  children,
  description,
  error,
  inline,
  stretch,
  ...props
}) => {
  const mergedClassNames = cx(styles.fieldGroup(inline, stretch), className);

  return (
    <div {...props} className={mergedClassNames}>
      {children}
      {error && <FieldError>{error}</FieldError>}
      {description && <FieldDescription>{description}</FieldDescription>}
    </div>
  );
};
