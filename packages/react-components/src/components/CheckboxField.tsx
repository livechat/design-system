import * as React from 'react';
import cx from 'classnames';
import { FieldDescription } from './FieldDescription';
import { Checkbox } from './Checkbox';

export interface IRadioButtonProps
  extends React.HTMLAttributes<HTMLInputElement> {
  description?: string;
  checked?: boolean;
  disabled?: boolean;
}

const baseClass = 'lc-checkbox';

export const RadioButton: React.FC<IRadioButtonProps> = ({
  children,
  className = '',
  description,
  checked,
  disabled,
  ...props
}) => {
  const mergedClassNames = cx({
    [baseClass]: true,
    [className]: !!className,
    [`${baseClass}--selected`]: checked,
    [`${baseClass}--disabled`]: disabled,
  });

  return (
    <div className={mergedClassNames}>
      <label className={`${baseClass}__label`}>
        <Checkbox {...props} checked={checked} disabled={disabled} />
        <div className={`${baseClass}__text`}>{children}</div>
      </label>
      {description && (
        <FieldDescription className={`${baseClass}__helper`}>
          {description}
        </FieldDescription>
      )}
    </div>
  );
};
