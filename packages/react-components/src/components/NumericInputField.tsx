import * as React from 'react';
import { TextField } from './TextField';
import { NumericInput } from './NumericInput';

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
  value: string;
  max?: number;
  min?: number;
  onChange: (value: string) => void;
}

export type INumericInputFieldProps = IProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const NumericInputField: React.FC<INumericInputFieldProps> = ({
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
  ...restProps
}) => {
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
      <NumericInput
        {...restProps}
        id={id}
        className={fieldClassName}
        style={style}
        error={error}
      />
    </TextField>
  );
};
