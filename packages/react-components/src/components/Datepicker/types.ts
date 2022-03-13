import { Reducer } from 'react';
import ReactDayPicker, { DayPickerProps } from 'react-day-picker';
import { ClassNames } from 'react-day-picker/types/ClassNames';

export interface IDatePickerProps
  extends Omit<DayPickerProps, 'todayButton' | 'showWeekNumbers'> {
  innerRef?: React.Ref<ReactDayPicker>;
  range?: boolean;
}

export interface IDatePickerNavbarProps {
  showPreviousButton?: boolean;
  showNextButton?: boolean;
  month: Date;
  fromMonth?: Date;
  toMonth?: Date;
  numberOfMonths?: number;
  className?: string;
  classNames: ClassNames;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onMonthChange: (newMonth: Date) => void;
}

export enum RangeDatePickerAction {
  NEW_SELECTED_ITEM = 'NEW_SELECTED_ITEM',
  NEW_TEMPORARY_TO_VALUE = 'NEW_TEMPORARY_TO_VALUE',
  CLEAR = 'CLEAR',
  SET_FROM = 'SET_FROM',
  SET_TO = 'SET_TO',
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
      type:
        | RangeDatePickerAction.NEW_TEMPORARY_TO_VALUE
        | RangeDatePickerAction.SELECT_FIRST_DAY
        | RangeDatePickerAction.SELECT_SECOND_DAY_AS_FROM
        | RangeDatePickerAction.SELECT_SECOND_DAY_AS_TO
        | RangeDatePickerAction.CURRENT_MONTH_CHANGE;
      payload: {
        date: Date;
      };
    }
  | {
      type: RangeDatePickerAction.SET_FROM | RangeDatePickerAction.SET_TO;
      payload: {
        date?: Date;
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
  } | null;
}

interface IRangeDatePickerChildrenPayloadDatePicker {
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

export interface IRangeDatePickerChildrenPayload {
  select: {
    selected: string | number;
    onItemSelect(itemKey: string | number): void;
  };
  inputs: {
    fromDate?: Date;
    toDate?: Date;
  };
  datepicker: IRangeDatePickerChildrenPayloadDatePicker;
  selectedOption?: IRangeDatePickerOption;
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
