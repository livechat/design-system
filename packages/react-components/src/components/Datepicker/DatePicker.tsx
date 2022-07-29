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
    fromMonth,
    firstDayOfWeek: propsFirstDayOfWeek,
    numberOfMonths,
    navbarElement,
    renderDay,
    innerRef,
    ...restProps
  } = props;

  const [month, setMonth] = React.useState(props.month || new Date());

  React.useEffect(() => {
    if (props.month && props.month !== month) {
      setMonth(props.month);
    }
  }, [props.month, month]);

  React.useEffect(() => {
    if (toMonth) {
      if (!isDateWithinRange(month, { from: fromMonth, to: toMonth })) {
        setMonth(toMonth);
      }
    }
  }, [month, props.toMonth, props.fromMonth]);

  const handleMonthChange = React.useCallback(
    (month: Date) => {
      if (props.onMonthChange && props.month) {
        props.onMonthChange(month);
        return;
      }

      setMonth(month);
    },
    [props.month, props.onMonthChange]
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
            month={month}
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
      month={month}
      renderDay={renderDay || defaultDayRenderer}
      {...restProps}
    />
  );
};

export const DatePicker = React.forwardRef<ReactDayPicker, IDatePickerProps>(
  (props, ref) => <DatePickerComponent innerRef={ref} {...props} />
);

DatePicker.displayName = 'DatePicker';
