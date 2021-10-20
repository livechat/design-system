import * as React from 'react';
import cx from 'classnames';
import { FieldDescription } from './FieldDescription';

export interface IRadioButtonProps
  extends React.HTMLAttributes<HTMLInputElement> {
  description?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
}

const baseClass = 'lc-radio-button';

export const RadioButton: React.FC<IRadioButtonProps> = ({
  children,
  className = '',
  description,
  checked,
  disabled,
  ...props
}) => {
  const mergedClassNames = cx(baseClass, {
    [className]: !!className,
    [`${baseClass}--selected`]: checked,
    [`${baseClass}--disabled`]: disabled,
  });

  return (
    <div className={mergedClassNames}>
      <label className={`${baseClass}__label`}>
        <div className={`${baseClass}__circle`}>
          <span className={`${baseClass}__inner-circle`} />
          <input
            className={`${baseClass}__input`}
            {...props}
            type="radio"
            checked={checked}
            disabled={disabled}
          />
        </div>
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
