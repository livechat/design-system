import { Reducer } from 'react';
import { DayPickerProps } from 'react-day-picker';

export enum RangeDatePickerAction {
  NEW_SELECTED_ITEM = 'NEW_SELECTED_ITEM',
  NEW_TEMPORARY_TO_VALUE = 'NEW_TEMPORARY_TO_VALUE',
  CLEAR = 'CLEAR',
  SELECT_FIRST_DAY = 'SELECT_FIRST_DAY',
  SELECT_SECOND_DAY_AS_FROM = 'SELECT_SECOND_DAY_AS_FROM',
  SELECT_SECOND_DAY_AS_TO = 'SELECT_SECOND_DAY_AS_TO',
  CURRENT_MONTH_CHANGE = 'CURRENT_MONTH_CHANGE',
}

export type IRangeDatePickerReducerAction =
  | {
      type: RangeDatePickerAction.NEW_SELECTED_ITEM;
      payload: {
        selectedItem: string | null;
      };
    }
  | {
      type: RangeDatePickerAction.CLEAR;
    }
  | {
      type:
        | RangeDatePickerAction.NEW_TEMPORARY_TO_VALUE
        | RangeDatePickerAction.SELECT_FIRST_DAY
        | RangeDatePickerAction.SELECT_SECOND_DAY_AS_FROM
        | RangeDatePickerAction.SELECT_SECOND_DAY_AS_TO
        | RangeDatePickerAction.CURRENT_MONTH_CHANGE;
      payload: {
        date: Date;
      };
    };

export interface IRangeDatePickerState {
  selectedItem: string | null;
  from?: Date;
  to?: Date;
  temporaryTo?: Date;
  currentMonth: Date;
}

export type RangeDatePickerReducer = Reducer<
  IRangeDatePickerState,
  IRangeDatePickerReducerAction
>;

export interface IRangeDatePickerOption {
  id: string;
  label: string;
  isManual?: boolean;
  value: {
    from?: Date;
    to?: Date;
  };
}

interface IRangeDatePickerChildrenPayloadDatePicker {
  innerRef?: React.Ref<Element>;
  modifiers?: DayPickerProps['modifiers'];
  initialMonth?: Date;
  month: Date;
  range?: boolean;
  numberOfMonths: number;
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
  onItemSelect(itemKey: string | number): void;
}

interface IRangeDatePickerChildrenPayloadInput
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: {
    current: HTMLElement;
  };
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface IRangeDatePickerChildrenPayload {
  select: IRangeDatePickerChildrenPayloadSelect;
  inputs: {
    fromDate?: Date;
    toDate?: Date;
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
  onChange: (selected: IRangeDatePickerOption | null) => void;
  children(payload: IRangeDatePickerChildrenPayload): React.ReactElement;
}
