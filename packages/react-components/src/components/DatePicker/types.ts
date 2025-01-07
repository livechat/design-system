import { Reducer, ReactElement } from 'react';

import { DayPickerProps, DateRange } from 'react-day-picker';

export type IDatePickerProps = DayPickerProps;

export interface IDatePickerCustomNavigationProps {
  currentMonth: Date;
  setMonth: (date: Date) => void;
  startMonth?: Date;
  endMonth?: Date;
  numberOfMonths?: number;
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
  SET_CUSTOM_TEMP_RANGE = 'SET_CUSTOM_TEMP_RANGE',
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
    }
  | {
      type: RangeDatePickerAction.SET_CUSTOM_TEMP_RANGE;
      payload: {
        customTempFrom?: Date;
        customTempTo?: Date;
      };
    };

export interface IRangeDatePickerState {
  selectedItem: string | null;
  from?: Date;
  to?: Date;
  temporaryTo?: Date;
  currentMonth: Date;
  customTempFrom?: Date;
  customTempTo?: Date;
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

export interface IRangeDatePickerChildrenPayload {
  select: {
    selected: string | number;
    onItemSelect(itemKey: string | number): void;
  };
  inputs: {
    fromDate?: Date;
    toDate?: Date;
  };
  datepicker: DayPickerProps;
  selectedOption?: IRangeDatePickerOption;
}

export interface IRangeDatePickerV1Props {
  onChange: (selected: IRangeDatePickerOption | null) => void;
  options: IRangeDatePickerOption[];
  initialSelectedItemKey?: string;
  onRangeSelect?: never;
  customTempFromDate?: never;
  customTempToDate?: never;
}

export interface IRangeDatePickerV2Props {
  onRangeSelect: (selected: DateRange | null) => void;
  customTempFromDate?: Date;
  customTempToDate?: Date;
  options?: never;
  onChange?: never;
  initialSelectedItemKey?: never;
}

export interface IRangeDatePickerCoreProps {
  initialFromDate?: Date;
  initialToDate?: Date;
  toMonth?: Date;
  onSelect?: (selected: DateRange | null) => void;
  children(payload: IRangeDatePickerChildrenPayload): ReactElement;
}

export type IRangeDatePickerProps = IRangeDatePickerCoreProps &
  (IRangeDatePickerV1Props | IRangeDatePickerV2Props);
