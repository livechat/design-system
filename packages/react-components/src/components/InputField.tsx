import * as React from 'react';
import cx from 'classnames';
import { TextField } from './TextField';

const baseClass = 'lc-input-field';

interface IProps {
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

export type IInputFieldProps = IProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const InputField: React.FC<IInputFieldProps> = React.forwardRef(
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
      baseClass,
      {
        [`${baseClass}--error`]: error,
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
