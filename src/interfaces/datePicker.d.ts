import { DayPickerProps } from 'react-day-picker';

export interface IRangeDatePickerOption {
  id: string;
  label: string;
  isManual?: boolean;
  value: {
    from: Date;
    to: Date;
  }
}

export interface IRangeDatePickerChildrenPayload {
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

export var DatePicker: React.ComponentType<DayPickerProps>;
export var RangeDatePicker: RangeDatePickerComponentType<IRangeDatePickerProps>;
export var RangeDatePickerConsumer: RangeDatePickerComponentType<{}>;
export var DatePickerRangeCalendarsWrapper: React.ComponentType<{ children: JSX.Element[] }>;
