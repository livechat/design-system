import * as React from 'react';
import cx from 'clsx';
import { TextField } from '../TextField';

import styles from './InputField.module.scss';

const baseClass = 'input-field';

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  labelText?: string;
  labelAdornment?: React.ReactNode;
  className?: string;
  inline?: boolean;
  error?: string;
  description?: React.ReactNode;
  labelRightNode?: React.ReactNode;
  fieldClassName?: string;
  maxLength?: number;
  onChange: () => void;
}

export const InputField: React.FC<InputFieldProps> = React.forwardRef(
  (
    {
      id,
      labelText,
      labelAdornment,
      className,
      inline,
      error,
      description,
      labelRightNode,
      fieldClassName,
      style,
      type = 'text',
      ...restProps
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
    const mergedClassNames = cx(
      styles[baseClass],
      {
        [styles[`${baseClass}--error`]]: error,
      },
      fieldClassName
    );

    return (
      <TextField
        inline={inline}
        error={error}
        description={description}
        labelText={labelText}
        labelAdornment={labelAdornment}
        className={className}
        labelFor={id}
        labelRightNode={labelRightNode}
      >
        <input
          {...restProps}
          id={id}
          ref={ref}
          className={mergedClassNames}
          style={style}
          type={type}
        />
      </TextField>
    );
  }
);
