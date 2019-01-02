import { DayPickerProps } from 'react-day-picker';

export interface IDatePickerProps extends DayPickerProps {}

export interface IRangeDatePickerOption {
  id: string;
  label: string;
  isManual?: boolean;
  value: {
    from: Date;
    to: Date;
  }
}

interface IRangeDatePickerChildrenPayloadDatePicker {
  innerRef: React.Ref<Element>;
  modifiers?: DayPickerProps['modifiers'];
  initialMonth?: Date;
  fromMonth?: Date;
  toMonth?: Date;
  selectedDays?: DayPickerProps['selectedDays'];
  disabledDays?: DayPickerProps['disabledDays'];
  onDayMouseEnter: DayPickerProps['onDayMouseEnter'];
  onDayClick(day: Date): void;
}

interface IRangeDatePickerChildrenPayloadSelect {
  selected: string | number;
  error?: string;
  onItemSelect(itemKey: string | number): void;
}

interface IRangeDatePickerChildrenPayloadInput {
  ref?: {
    current: HTMLElement;
  };
  value: string;
  fromDate: Date;
  toDate: Date;
  onFocus?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface IRangeDatePickerChildrenPayload {
  select: IRangeDatePickerChildrenPayloadSelect;
  inputs: {
    from: IRangeDatePickerChildrenPayloadInput;
    to: IRangeDatePickerChildrenPayloadInput;
  };
  datepicker: IRangeDatePickerChildrenPayloadDatePicker;
  [k: string]: any;
}

export interface IRangeDatePickerProps {
  options: IRangeDatePickerOption[];
  initialSelectedItemKey?: string;
  initialFromDate?: Date;
  initialToDate?: Date;
  toMonth?: Date;
  onChange(selected: IRangeDatePickerOption): void;
  children(payload: IRangeDatePickerChildrenPayload): React.ReactNode;
}

interface RangeDatePickerClass<P> extends React.ComponentClass<P> {
  Select: React.ComponentType<{ children: React.ReactNode }>;
  DatePickers: React.ComponentType<{ children: React.ReactNode }>;
}

type RangeDatePickerComponentType<P = {}> = RangeDatePickerClass<P>;


interface IDatePickerRangeSelectInputsProps extends React.HTMLAttributes<HTMLDivElement>{
  from: {
    [key: string]: any;
  };
  to: {
    [key: string]: any;
  }
}

export var DatePicker: React.ComponentType<IDatePickerProps>;
export var RangeDatePicker: RangeDatePickerComponentType<IRangeDatePickerProps>;
export var DatePickerRangeSelectInputs: React.ComponentType<IDatePickerRangeSelectInputsProps>;
export var DatePickerRangeCalendarsWrapper: React.ComponentType<{ children: React.ReactNode }>;
