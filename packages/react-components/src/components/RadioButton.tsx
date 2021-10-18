import * as React from 'react';
import cx from 'classnames';
import { FieldDescription } from './FieldDescription';

export interface IRadioButtonProps
  extends React.HTMLAttributes<HTMLInputElement> {
  description?: string;
  checked?: boolean;
  disabled?: boolean;
}

export const RadioButton: React.FC<IRadioButtonProps> = ({
  children,
  className: extraClassName = '',
  description,
  checked,
  disabled,
  ...props
}) => {
  const baseClass = 'lc-radio-button';
  const mergedClassNames = cx({
    [baseClass]: true,
    [extraClassName]: !!extraClassName,
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
