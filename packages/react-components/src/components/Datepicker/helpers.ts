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

const baseClass = 'date-picker';

import styles from './DatePicker.module.scss';

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
//styles[`${baseClass}__day--start`]

export const getRangeDatePickerModifiers = (
  from?: Date,
  to?: Date
): Partial<Modifiers> => {
  const base = {
    [styles[`${baseClass}__day--monday`]]: { daysOfWeek: [1] },
    [styles[`${baseClass}__day--sunday`]]: { daysOfWeek: [0] },
    [styles[`${baseClass}__day--start`]]: from,
    [styles[`${baseClass}__day--end`]]: from,
  };

  if (to) {
    if (!from) {
      return {
        ...base,
        [styles[`${baseClass}__day--start`]]: to,
      };
    }

    const diff = differenceInCalendarDays(to, from);

    if (diff > 0) {
      return {
        ...base,
        [styles[`${baseClass}__day--end`]]: to,
      };
    } else if (diff < 0) {
      return {
        ...base,
        [styles[`${baseClass}__day--start`]]: to,
      };
    }
    return {
      ...base,
      [styles[`${baseClass}__day--start`]]: [from, to],
      [styles[`${baseClass}__day--end`]]: [from, to],
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
