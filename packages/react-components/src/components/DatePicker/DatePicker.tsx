import * as React from 'react';
import ReactDayPicker from 'react-day-picker';

import DatePickerNavbar from './DatePickerNavbar';
import { IDatePickerProps } from './types';
import { getDatePickerClassNames, isDateWithinRange } from './helpers';
import styles from './DatePicker.module.scss';

const baseClass = 'date-picker';

const defaultDayRenderer = (day: Date): JSX.Element => {
  const date = day.getDate();

  return (
    <div className={styles[`${baseClass}__day-wrapper`]}>
      <div className={styles[`${baseClass}__day-content`]}>{date}</div>
    </div>
  );
};

const DatePickerComponent: React.FC<IDatePickerProps> = (props) => {
  const {
    classNames,
    range,
    toMonth,
    month,
    fromMonth,
    firstDayOfWeek: propsFirstDayOfWeek,
    numberOfMonths,
    navbarElement,
    renderDay,
    innerRef,
    ...restProps
  } = props;

  const [currentMonth, setCurrentMonth] = React.useState(month || new Date());

  React.useEffect(() => {
    if (month && month !== currentMonth) {
      setCurrentMonth(month);
    }
  }, [month, currentMonth]);

  React.useEffect(() => {
    if (toMonth) {
      if (!isDateWithinRange(currentMonth, { from: fromMonth, to: toMonth })) {
        setCurrentMonth(toMonth);
      }
    }
  }, [currentMonth, props.toMonth, props.fromMonth]);

  const handleMonthChange = React.useCallback(
    (month: Date) => {
      if (props.onMonthChange && month) {
        props.onMonthChange(month);
        return;
      }

      setCurrentMonth(month);
    },
    [month, props.onMonthChange]
  );

  let firstDayOfWeek = 1;

  if (
    propsFirstDayOfWeek === 0 ||
    (propsFirstDayOfWeek && propsFirstDayOfWeek < 7)
  ) {
    firstDayOfWeek = propsFirstDayOfWeek;
  }

  const datePickerClassNames = React.useMemo(
    () => getDatePickerClassNames(range, classNames),
    [range, classNames]
  );

  return (
    <ReactDayPicker
      navbarElement={
        navbarElement || (
          <DatePickerNavbar
            month={currentMonth}
            classNames={datePickerClassNames}
            numberOfMonths={numberOfMonths}
            onMonthChange={handleMonthChange}
            toMonth={toMonth}
            fromMonth={fromMonth}
          />
        )
      }
      ref={innerRef}
      classNames={datePickerClassNames}
      numberOfMonths={numberOfMonths}
      toMonth={toMonth}
      fromMonth={fromMonth}
      firstDayOfWeek={firstDayOfWeek}
      month={currentMonth}
      renderDay={renderDay || defaultDayRenderer}
      {...restProps}
    />
  );
};

export const DatePicker = React.forwardRef<ReactDayPicker, IDatePickerProps>(
  (props, ref) => <DatePickerComponent innerRef={ref} {...props} />
);

DatePicker.displayName = 'DatePicker';
