import * as React from 'react';
import ReactDayPicker from 'react-day-picker';
import cx from 'classnames';
import DatePickerNavbar from './DatePickerNavbar';
import { IDatePickerProps } from './types';
import { isDateWithinRange } from './helpers';
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
    month: propsMonth,
    toMonth,
    fromMonth,
    firstDayOfWeek: propsFirstDayOfWeek,
    numberOfMonths,
    navbarElement,
    renderDay,
    innerRef,
    ...restProps
  } = props;

  const [month, setMonth] = React.useState(propsMonth || new Date());

  React.useEffect(() => {
    if (propsMonth && propsMonth !== month) {
      setMonth(propsMonth);
    }
  }, [propsMonth, month]);

  React.useEffect(() => {
    if (props.toMonth) {
      if (
        !isDateWithinRange(month, { from: props.fromMonth, to: props.toMonth })
      ) {
        setMonth(props.toMonth);
      }
    }
  }, [month, props.toMonth, props.fromMonth]);

  const handleMonthChange = React.useCallback(
    (month: Date) => {
      if (props.onMonthChange && propsMonth) {
        props.onMonthChange(month);
        return;
      }

      setMonth(month);
    },
    [propsMonth, props.onMonthChange]
  );

  const getDatePickerClassNames = () => ({
    container: cx({
      [styles[`${baseClass}`]]: true,
      [styles[`${baseClass}--range`]]: props.range,
    }),
    wrapper: styles[`${baseClass}__wrapper`],
    interactionDisabled: styles[`${baseClass}--interaction-disabled`],
    months: styles[`${baseClass}__months`],
    month: styles[`${baseClass}__month`],
    navBar: styles[`${baseClass}__nav-bar`],
    navButtonPrev: cx(
      styles[`${baseClass}__nav-button`],
      styles[`${baseClass}__nav-button--prev`]
    ),
    navButtonNext: cx(
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
    ...props.classNames,
  });

  let firstDayOfWeek = 1;

  if (
    propsFirstDayOfWeek === 0 ||
    (propsFirstDayOfWeek && propsFirstDayOfWeek < 7)
  ) {
    firstDayOfWeek = propsFirstDayOfWeek;
  }

  const datePickerClassNames = React.useMemo(
    () => getDatePickerClassNames(),
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
