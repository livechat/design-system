// <reference types="react" />

export interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
  children: React.ReactNode;
  labelText?: string;
  helperText?: string;
  formFooter?: React.ReactNode;
}

export interface IWithTextFieldProps {
  labelText?: string;
  inline?: boolean;
  description?: React.ReactNode;
  error?: string;
  labelAdornment?: React.ReactNode;
  labelRightNode?: React.ReactNode;
  fieldClassName?: string;
}

export interface IFormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  labelText?: string;
  helperText?: string;
  children: React.ReactNode;
}

export interface ISelectProps {
  className?: string;
  dataTestId?: string;
  id?: string;
  error?: string;
  isOpen?: boolean;
  searchEmptyState?: React.ReactNode;
  items: {
    key: string;
    props: {
      [key: string]: any;
    };
  }[];
  searchProperty?: string | string[];
  search?: boolean;
  placeholder?: React.ReactNode;
  searchPlaceholder?: string;
  selected: string | number;
  openedOnInit?: boolean;
  disabled?: boolean;
  required?: boolean;
  getItemBody(props: { [key: string]: any }): React.ReactNode;
  getSelectedItemBody(props: { [key: string]: any }): React.ReactNode;
  onItemSelect(itemKey: string | number): void;
  onDropdownToggle?(isOpen: boolean): any;
  onSearchPhraseChange?: (searchPhrase: string) => void;
  selectHeader?: string;
}

export interface ISelectFieldProps extends ISelectProps, IWithTextFieldProps {
  id: string;
  className?: string;
}

export interface IMultiSelectProps {
  className?: string;
  dataTestId?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  isOpen?: boolean;
  items: {
    key: string;
    props: {
      [key: string]: any;
    };
  }[];
  maxItemsContainerHeight: number;
  openedOnInit?: boolean;
  placeholder?: string;
  search?: boolean;
  searchProperty?: string | string[];
  selected: string[] | number[];
  shouldCloseOnSelect?: boolean;
  toggleAllOptions?: {
    selectLabel: string;
    clearLabel: string;
    onToggleAll(values?: string[] | number[]): any;
  };
  getItemBody(props: { [key: string]: any }): React.ReactNode;
  getSelectedItemBody(props: { [key: string]: any }): React.ReactNode;
  onDropdownToggle?(isOpen: boolean): any;
  onItemSelect(itemKey: string | number): any;
  onItemRemove(itemKey: string | number): any;
}

export interface IMultiSelectFieldProps
  extends IMultiSelectProps,
  IWithTextFieldProps {
  id: string;
  className?: string;
}

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement> | React.Ref<React.Component<IInputProps>>;
}

export interface IInputFieldProps extends IInputProps, IWithTextFieldProps {
  id: string;
  inputWidth?: string;
}

export interface ITextFieldProps extends IWithTextFieldProps {
  className?: string;
}

export interface ITextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  width?: string;
  ref?:
  | React.Ref<HTMLTextAreaElement>
  | React.Ref<React.Component<ITextAreaProps>>;
}

export interface ITextAreaFieldProps
  extends ITextAreaProps,
  IWithTextFieldProps {
  id: string;
  textareaWidth?: string;
}

export interface INumericInputProps {
  value: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  error?: string;
  max?: number;
  min?: number;
  noControls?: boolean;
  width?: string;
  onChange(value: string): void;
}

export interface INumericInputFieldProps
  extends INumericInputProps,
  IWithTextFieldProps {
  id: string;
}

export interface ICheckboxFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  description?: React.ReactNode;
}

export interface IRadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  description?: React.ReactNode;
}

export interface IFieldGroupProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  inline?: boolean;
  stretch?: boolean;
}

type ISearchBarHtmlProps = Omit<Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>, 'onSubmit'>;

export interface ISearchBarProps extends ISearchBarHtmlProps {
  placeholder?: string;
  value?: string;
  loading?: boolean;
  collapsable?: boolean;
  expandOnFocus?: boolean;
  collapseOnBlur?: boolean;
  debounceTime?: number;
  error?: string;
  onChange?(value: string): void;
  onSubmit?(value: string): void;
  onClear?(value: string): void;
  onKeyDown?(event): void;
  onCollapse?(): void;
  onExpand?(): void;
}

export var CheckboxField: React.ComponentType<ICheckboxFieldProps>;
export var FieldGroup: React.ComponentType<IFieldGroupProps>;
export var Form: React.ComponentType<IFormProps>;
export var FormGroup: React.ComponentType<IFormGroupProps>;
export var Input: React.ComponentType<IInputProps>;
export var InputField: React.ComponentType<IInputFieldProps>;
export var MultiSelect: React.ComponentType<IMultiSelectProps>;
export var MultiSelectField: React.ComponentType<IMultiSelectFieldProps>;
export var NumericInput: React.ComponentType<INumericInputProps>;
export var NumericInputField: React.ComponentType<INumericInputFieldProps>;
export var RadioButton: React.ComponentType<IRadioButtonProps>;
export var Select: React.ComponentType<ISelectProps>;
export var SelectField: React.ComponentType<ISelectFieldProps>;
export var TextField: React.ComponentType<ITextFieldProps>;
export var TextArea: React.ComponentType<ITextAreaProps>;
export var TextAreaField: React.ComponentType<ITextAreaFieldProps>;
export var SearchBar: React.ComponentType<ISearchBarProps>;