import * as React from 'react';
import { TextField } from './TextField';
import { NumericInput } from './NumericInput';

interface IProps {
  id: string;
  labelText?: string;
  labelAdornment?: React.ReactNode;
  className?: string;
  inline?: boolean;
  errorText?: string;
  descriptionNode?: React.ReactNode;
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
  errorText,
  descriptionNode,
  labelRightNode,
  fieldClassName,
  style,
  ...restProps
}) => {
  const mergedStyle = style ? { ...style } : void 0;

  return (
    <TextField
      inline={inline}
      errorText={errorText}
      descriptionNode={descriptionNode}
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
        style={mergedStyle}
        error={errorText}
      />
    </TextField>
  );
};
