// <reference types="react" />

export interface ISelectProps {
  className?: string;
  id: string;
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
  onItemSelected(itemKey: string | number): void;
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

export var Select: React.ComponentType<ISelectProps>;
export var SelectField: React.ComponentType<ISelectFieldProps>;
