import {
  endOfMonth,
  startOfMonth,
  startOfToday,
  subDays,
  subMonths,
} from 'date-fns';
import { DateRange } from 'react-day-picker';

import { RANGE_DATE_PICKER_OPTION_ID } from './types';

const todayDate = startOfToday();

type RangeDatePickerSelectOptions = {
  id: RANGE_DATE_PICKER_OPTION_ID;
  label: string;
  value: { from: Date; to: Date };
};

export const OPTIONS: RangeDatePickerSelectOptions[] = [
  {
    id: 'today',
    label: 'Today',
    value: { from: todayDate, to: todayDate },
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    value: { from: subDays(todayDate, 1), to: subDays(todayDate, 1) },
  },
  {
    id: 'last7days',
    label: 'Last 7 days',
    value: { from: subDays(todayDate, 6), to: todayDate },
  },
  {
    id: 'last30days',
    label: 'Last 30 days',
    value: { from: subDays(todayDate, 29), to: todayDate },
  },
  {
    id: 'lastMonth',
    label: 'Last month',
    value: {
      from: startOfMonth(subMonths(todayDate, 1)),
      to: endOfMonth(subMonths(todayDate, 1)),
    },
  },
  {
    id: 'currentMonth',
    label: 'Current month',
    value: { from: startOfMonth(todayDate), to: todayDate },
  },
];

type IsSameDate = (range?: DateRange, date?: DateRange) => boolean;

export const isSameDate: IsSameDate = (range, date) => {
  if (date?.from && date.to && range?.from && range.to) {
    return (
      date.from.getTime() === range.from.getTime() &&
      date.to.getTime() === range.to.getTime()
    );
  }

  return false;
};
