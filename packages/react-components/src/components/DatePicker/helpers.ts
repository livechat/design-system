import { isAfter, isSameDay, isSameMonth, subMonths } from 'date-fns';

import {
  IRangeDatePickerProps,
  IRangeDatePickerState,
  IRangeDatePickerOption,
} from './types';

export const isDateWithinRange = (
  date: Date,
  range: { from?: Date; to?: Date }
): boolean => {
  const { from, to } = range;
  if (to && !isSameDay(date, to) && isAfter(date, to)) {
    return false;
  }
  // noinspection RedundantIfStatementJS
  if (from && !isSameDay(date, from) && !isAfter(date, from)) {
    return false;
  }

  return true;
};

export const calculateDatePickerMonth = (
  initialFromDate?: Date,
  initialToDate?: Date,
  toMonth?: Date
): Date => {
  if (!initialToDate) {
    return subMonths(toMonth || new Date(), 1);
  }

  const forcePreviousMonth =
    initialFromDate && !isSameMonth(initialFromDate, initialToDate);

  if (forcePreviousMonth || (toMonth && isSameMonth(initialToDate, toMonth))) {
    return subMonths(initialToDate, 1);
  }

  return initialToDate;
};

export const getSelectedOption = (
  itemId: string | null,
  options: IRangeDatePickerOption[]
): IRangeDatePickerOption | undefined => {
  const selectedOption = options.find((item) => {
    return item.id === itemId;
  });

  return selectedOption ? selectedOption : void 0;
};

export const isSelectingFirstDay = (from?: Date, to?: Date): boolean => {
  const isRangeSelected = from && to;

  return Boolean(!from || isRangeSelected);
};

export const getInitialStateFromProps = (
  props: IRangeDatePickerProps
): Partial<IRangeDatePickerState> => {
  const state: Partial<IRangeDatePickerState> = {};

  if (!props.initialSelectedItemKey) {
    return state;
  }

  const selectedOption = getSelectedOption(
    props.initialSelectedItemKey,
    props.options
  );

  if (!selectedOption) {
    return {};
  }

  state.selectedItem = props.initialSelectedItemKey;

  if (!selectedOption.isManual) {
    return state;
  }

  if (props.initialFromDate) {
    state.from = props.initialFromDate;
  }
  if (props.initialToDate) {
    state.to = props.initialToDate;
    state.temporaryTo = props.initialToDate;
  }

  return state;
};
