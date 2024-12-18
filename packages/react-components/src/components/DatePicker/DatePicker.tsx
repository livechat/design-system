import * as React from 'react';

import cx from 'clsx';
import { DayPicker } from 'react-day-picker';

import { Text } from '../Typography';

import { DatePickerCustomNavigation } from './components/DatePickerCustomNavigation';
import { isDateWithinRange } from './helpers';
import { IDatePickerProps } from './types';

import 'react-day-picker/style.css';

import styles from './DatePicker.module.scss';

const baseClass = 'date-picker';

export const DatePicker: React.FC<IDatePickerProps> = ({
  month,
  weekStartsOn = 1,
  fromMonth,
  startMonth,
  toMonth,
  endMonth,
  onMonthChange,
  ...props
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(month || new Date());

  React.useEffect(() => {
    if (month && month !== currentMonth) {
      setCurrentMonth(month);
    }
  }, [month, currentMonth]);

  React.useEffect(() => {
    if (toMonth && month !== currentMonth) {
      if (!isDateWithinRange(currentMonth, { from: fromMonth, to: toMonth })) {
        setCurrentMonth(toMonth);
      }
    }
  }, [month, currentMonth, toMonth, fromMonth]);

  const handleMonthChange = React.useCallback(
    (newMonth: Date) => {
      if (onMonthChange) {
        onMonthChange(newMonth);

        return;
      }

      setCurrentMonth(newMonth);
    },
    [month, onMonthChange]
  );

  return (
    <DayPicker
      classNames={{
        weekday: cx(
          styles[`${baseClass}__wrapper`],
          styles[`${baseClass}__weekday`]
        ),
        day: cx(styles[`${baseClass}__wrapper`], styles[`${baseClass}__day`]),
        day_button: cx(styles[`${baseClass}__day-button`]),
        today: cx(styles[`${baseClass}__today`]),
        selected: cx(styles[`${baseClass}__selected`]),
        month_caption: cx(styles[`${baseClass}__month-caption`]),
        range_start: cx(styles[`${baseClass}__range-start`]),
        range_middle: cx(styles[`${baseClass}__range-middle`]),
        range_end: cx(styles[`${baseClass}__range-end`]),
        disabled: cx(styles[`${baseClass}__disabled`]),
      }}
      onMonthChange={handleMonthChange}
      month={currentMonth}
      components={{
        CaptionLabel: ({ children }) => (
          <Text as="span" bold>
            {children}
          </Text>
        ),
        Nav: () => (
          <DatePickerCustomNavigation
            currentMonth={currentMonth}
            setMonth={handleMonthChange}
            startMonth={startMonth || fromMonth}
            endMonth={endMonth || toMonth}
          />
        ),
      }}
      startMonth={startMonth || fromMonth}
      endMonth={endMonth || toMonth}
      weekStartsOn={weekStartsOn}
      {...props}
    />
  );
};
