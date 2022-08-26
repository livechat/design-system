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
import clsx from 'clsx';
const baseClass = 'date-picker';

import styles from './DatePicker.module.scss';
import { ClassNames } from 'react-day-picker/types/ClassNames';

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

  if (!to || !from) return base;

  const diff = differenceInCalendarDays(to, from);

  if (diff > 0) {
    return {
      ...base,
      [styles[`${baseClass}__day--end`]]: to,
    };
  }

  if (diff < 0) {
    return {
      ...base,
      [styles[`${baseClass}__day--start`]]: to,
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

export const getDatePickerClassNames = (
  range?: boolean,
  classNames?: ClassNames
) => ({
  container: clsx({
    [styles[`${baseClass}`]]: true,
    [styles[`${baseClass}--range`]]: range,
  }),
  wrapper: styles[`${baseClass}__wrapper`],
  interactionDisabled: styles[`${baseClass}--interaction-disabled`],
  months: styles[`${baseClass}__months`],
  month: styles[`${baseClass}__month`],
  navBar: styles[`${baseClass}__nav-bar`],
  navButtonPrev: clsx(
    styles[`${baseClass}__nav-button`],
    styles[`${baseClass}__nav-button--prev`]
  ),
  navButtonNext: clsx(
    styles[`${baseClass}__nav-button`],
    styles[`${baseClass}__nav-button--next`]
  ),
  navButtonInteractionDisabled:
    styles[`${baseClass}__nav-button--interaction-disabled`],
  caption: styles[`${baseClass}__caption`],
  weekdays: styles[`${baseClass}__weekdays`],
  weekdaysRow: styles[`${baseClass}__weekdays-row`],
  weekday: styles[`${baseClass}__weekday`],
  body: styles[`${baseClass}__body`],
  week: styles[`${baseClass}__week`],
  weekNumber: styles[`${baseClass}__week-number`],
  day: styles[`${baseClass}__day`],
  footer: styles[`${baseClass}__footer`],
  todayButton: styles[`${baseClass}__today-button`],
  today: styles[`${baseClass}__day--today`],
  selected: styles[`${baseClass}__day--selected`],
  disabled: styles[`${baseClass}__day--disabled`],
  outside: styles[`${baseClass}__day--outside`],
  start: styles[`${baseClass}__day--start`],
  end: styles[`${baseClass}__day--end`],
  ...classNames,
});
