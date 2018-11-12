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

export interface IMultiSelectProps {
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
  searchPlaceholder?: React.ReactNode;
  search?: boolean;
  disabled?: boolean;
  openedOnInit?: boolean;
  maxItemsContainerHeight: number;
  selected: string[] | number[];
  getItemBody(props: { [key: string]: any }): React.ReactNode;
  getSelectedItemBody(props: { [key: string]: any }): React.ReactNode;
  toggleAllOptions?: {
    selectLabel: string;
    clearLabel: string;
    onToggleAll(values?: string[] | number[]): any;
  };
  onDropdownToggle?(isOpen: boolean): any;
  onItemSelect(itemKey: string | number): any;
  onItemRemove(itemKey: string | number): any;
}

export interface IMultiSelectFieldProps extends IMultiSelectProps {
  labelText?: string;
  id: string;
  className?: string,
  inline?: boolean;
  error?: string;
  description?: React.ReactNode;
}

export var Select: React.ComponentType<ISelectProps>;
export var SelectField: React.ComponentType<ISelectFieldProps>;
export var MultiSelect: React.ComponentType<IMultiSelectProps>;
export var MultiSelectField: React.ComponentType<IMultiSelectFieldProps>;
