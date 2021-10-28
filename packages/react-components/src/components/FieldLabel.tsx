import * as React from 'react';
import cx from 'classnames';

export type IFieldLabelProps = React.HTMLAttributes<HTMLSpanElement>;

const baseClass = 'lc-field-label';

export const FieldLabel: React.FC<IFieldLabelProps> = ({
  className = '',
  ...props
}) => {
  const mergedClassNames = cx(baseClass, { [className]: !!className });

  return <label {...props} className={mergedClassNames} />;
};
