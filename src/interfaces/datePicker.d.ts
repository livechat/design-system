import { DayPickerProps } from 'react-day-picker';

export interface ISelectDatePickerOption {
  id: string;
  label: string;
  isManual?: boolean;
  value: {
    from: Date;
    to: Date;
  }
}

export interface ISelectDatePickerProps {
  options: ISelectDatePickerOption[];
  initialSelectedItemKey?: string;
  initialFromDate?: Date;
  initialToDate?: Date;
  onChange(selected: ISelectDatePickerOption): void;
}

export interface IRangeDatePickerProps {
  options: ISelectDatePickerOption[];
  initialSelectedItemKey?: string;
  initialFromDate?: Date;
  initialToDate?: Date;
  toMonth?: Date;
  onChange(selected: ISelectDatePickerOption): void;
}

export interface IDatePickerProps {
  options: ISelectDatePickerOption[];
  initialSelectedItemKey?: string;
  initialFromDate?: Date;
  initialToDate?: Date;
  toMonth?: Date;
  onChange(selected: ISelectDatePickerOption): void;
}

interface RangeDatePickerClass<P> extends React.ComponentClass<P> {
  Select: React.ComponentType<{ children: React.ReactNode }>;
  DatePickers: React.ComponentType<{ children: React.ReactNode }>;
}

type RangeDatePickerComponentType<P = {}> = RangeDatePickerClass<P>;

export var DatePicker: React.ComponentType<DayPickerProps>;
export var RangeDatePicker: RangeDatePickerComponentType<IRangeDatePickerProps>;
export var DatePickerRangeCalendarsWrapper: React.ComponentType<{ children: JSX.Element[] }>;
export var SelectDatePicker: React.ComponentType<ISelectDatePickerProps>;
