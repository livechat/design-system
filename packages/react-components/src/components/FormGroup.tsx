import * as React from 'react';
import cx from 'classnames';
import { Text } from './Text';
import { Heading } from './Heading';

export interface IFormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  labelText?: string;
  helperText?: string;
}

const baseClass = 'lc-form-group';

export const FormGroup: React.FC<IFormGroupProps> = ({
  className = '',
  children,
  labelText,
  helperText,
  ...props
}) => {
  const mergedClassNames = cx(baseClass, className);

  return (
    <div
      {...props}
      role="group"
      {...(labelText && { 'aria-label': labelText })}
      className={mergedClassNames}
    >
      <div className={`${baseClass}__header`}>
        <Heading as="div" size="sm" className={`${baseClass}__label`}>
          {labelText}
        </Heading>
        {helperText && (
          <Text as="div" size="sm" className={`${baseClass}__helper`}>
            {helperText}
          </Text>
        )}
      </div>
      {children}
    </div>
  );
};
