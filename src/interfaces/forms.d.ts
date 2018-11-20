// <reference types="react" />

export interface ISelectProps {
  className?: string;
  id?: string;
  error?: string;
  items: {
    key: string;
    props: {
      [key: string]: any;
    }
  }[];
  searchProperty?: string;
  search?: boolean;
  placeholder?: React.ReactNode;
  searchPlaceholder?: React.ReactNode;
  selected: string | number;
  openedOnInit?: boolean;
  disabled?: boolean;
  required?: boolean;
  getItemBody(props: { [key: string]: any }): React.ReactNode;
  getSelectedItemBody(props: { [key: string]: any }): React.ReactNode;
  onItemSelect(itemKey: string | number): void;
  onDropdownToggle?(isOpen: boolean): any;
}

export interface ISelectFieldProps extends ISelectProps {
  labelText?: string;
  id: string;
  className?: string,
  inline?: boolean;
  error?: string;
  description?: React.ReactNode;
}

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export interface IInputFieldProps extends IInputProps {
  labelText?: string;
  id: string;
  inline?: boolean;
  description?: React.ReactNode;
}

export interface INumericInputProps {
  value: number;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  error?: string;
  max?: number;
  min?: number;
  noControls?: boolean;
  width?: boolean;
  onChange(value: number): void;
}

export interface INumericInputFieldProps extends INumericInputProps {
  id: string;
  labelText?: string;
  inline?: boolean;
  description?: React.ReactNode;
}

export var Select: React.ComponentType<ISelectProps>;
export var SelectField: React.ComponentType<ISelectFieldProps>;
export var Input: React.ComponentType<IInputProps>;
export var InputField: React.ComponentType<IInputFieldProps>;
export var NumericInput: React.ComponentType<INumericInputProps>;
export var NumericInputField: React.ComponentType<INumericInputFieldProps>;
