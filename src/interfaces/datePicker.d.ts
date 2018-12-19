import { DayPickerProps } from 'react-day-picker';
import { ISelectProps } from './forms';

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
  onDayClick(day: Date): void;
  selectedDays?: DayPickerProps['selectedDays'];
  modifiers?: DayPickerProps['modifiers'];
  initialMonth?: Date;
  fromMonth?: Date;
  toMonth?: Date;
  disabledDays?: DayPickerProps['disabledDays'];
  onDayMouseEnter: DayPickerProps['onDayMouseEnter'];
}

interface IRangeDatePickerChildrenPayloadSelect {
  selected: string | number;
  error?: string;
  getItemBody(props: { [key: string]: any }): React.ReactNode;
  getSelectedItemBody(props: { [key: string]: any }): React.ReactNode;
  onItemSelect(itemKey: string | number): void;
}

export interface IRangeDatePickerChildrenPayload {
  select: IRangeDatePickerChildrenPayloadSelect;
  inputs: {
    from: {
      onChange(e: React.ChangeEvent<HTMLInputElement>): void;
      value: string;
      ref: {
        current: HTMLElement;
      };
      fromDate: Date;
      toDate: Date;
    };
    to: {
      onChange(e: React.ChangeEvent<HTMLInputElement>): void;
      value: string;
      onFocus(e: React.FocusEvent<HTMLInputElement>): void;
      fromDate: Date;
      toDate: Date;
    };
  };
  datepickers: {
    from: IRangeDatePickerChildrenPayloadDatePicker;
    to: IRangeDatePickerChildrenPayloadDatePicker;
  };
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
export var DatePickerRangeCalendarsWrapper: React.ComponentType<{ children: JSX.Element[] }>;
