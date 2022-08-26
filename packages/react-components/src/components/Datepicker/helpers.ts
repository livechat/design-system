import {
  isAfter,
  isSameDay,
  isSameMonth,
  subMonths,
  differenceInCalendarDays,
} from 'date-fns';
import { Modifiers } from 'react-day-picker';
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
  if (initialToDate) {
    const forcePreviousMonth =
      initialFromDate && !isSameMonth(initialFromDate, initialToDate);

    if (
      forcePreviousMonth ||
      (toMonth && isSameMonth(initialToDate, toMonth))
    ) {
      return subMonths(initialToDate, 1);
    }

    return initialToDate;
  }

  return subMonths(toMonth || new Date(), 1);
};

export const getRangeDatePickerModifiers = (
  from?: Date,
  to?: Date
): Partial<Modifiers> => {
  const base = {
    'date-picker__day--monday': { daysOfWeek: [1] },
    'date-picker__day--sunday': { daysOfWeek: [0] },
    'date-picker__day--start': from,
    'date-picker__day--end': from,
  };

  if (to) {
    if (!from) {
      return {
        ...base,
        'date-picker__day--start': to,
      };
    }

    const diff = differenceInCalendarDays(to, from);

    if (diff > 0) {
      return {
        ...base,
        'date-picker__day--end': to,
      };
    } else if (diff < 0) {
      return {
        ...base,
        'date-picker__day--start': to,
      };
    }
    return {
      ...base,
      'date-picker__day--start': [from, to],
      'date-picker__day--end': [from, to],
    };
  }

  return base;
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

  if (props.initialSelectedItemKey) {
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
  }
  return state;
};
