import { DayPickerProps } from 'react-day-picker';

export interface IDatePickerProps extends DayPickerProps {
  innerRef?: React.Ref<Element>;
  range?: boolean;
}

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
  innerRef?: React.Ref<Element>;
  modifiers?: DayPickerProps['modifiers'];
  initialMonth?: Date;
  month: Date;
  range?: boolean;
  fromMonth?: Date;
  toMonth?: Date;
  selectedDays?: DayPickerProps['selectedDays'];
  disabledDays?: DayPickerProps['disabledDays'];
  onDayMouseEnter: DayPickerProps['onDayMouseEnter'];
  onDayClick(day: Date): void;
  onMonthChange(month: Date): void;
}

interface IRangeDatePickerChildrenPayloadSelect {
  selected: string | number;
  error?: string;
  onItemSelect(itemKey: string | number): void;
}

interface IRangeDatePickerChildrenPayloadInput extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: {
    current: HTMLElement;
  };
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface IRangeDatePickerChildrenPayload {
  select: IRangeDatePickerChildrenPayloadSelect;
  inputs: {
    fromDate: Date;
    toDate: Date;
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
  from: IRangeDatePickerChildrenPayloadInput;
  to: IRangeDatePickerChildrenPayloadInput;
}

export var DatePicker: React.ComponentType<IDatePickerProps>;
export var RangeDatePicker: RangeDatePickerComponentType<IRangeDatePickerProps>;
export var DatePickerRangeSelectInputs: React.ComponentType<IDatePickerRangeSelectInputsProps>;
export var DatePickerRangeCalendarsWrapper: React.ComponentType<{ children: React.ReactNode }>;
