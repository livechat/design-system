import * as React from 'react';
import ReactDayPicker from 'react-day-picker';
import cx from 'classnames';
import DatePickerNavbar from './DatePickerNavbar';
import { IDatePickerProps } from './types';
import { isDateWithinRange } from './helpers';

const baseClass = 'date-picker';

const defaultDayRenderer = (day: Date): JSX.Element => {
  const date = day.getDate();

  return (
    <div className={`${baseClass}__day-wrapper`}>
      <div className={`${baseClass}__day-content`}>{date}</div>
    </div>
  );
};

const DatePickerComponent: React.FC<IDatePickerProps> = (props) => {
  const [month, setMonth] = React.useState(props.month || new Date());

  React.useEffect(() => {
    if (props.month && props.month !== month) {
      setMonth(props.month);
    }
  }, [props.month, month]);

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
      if (props.onMonthChange && props.month) {
        props.onMonthChange(month);
        return;
      }

      setMonth(month);
    },
    [props.month, props.onMonthChange]
  );

  const getDatePickerClassNames = () => ({
    container: cx({
      [baseClass]: true,
      [`${baseClass}--range`]: props.range,
    }),
    wrapper: `${baseClass}__wrapper`,
    interactionDisabled: `${baseClass}--interaction-disabled`,
    months: `${baseClass}__months`,
    month: `${baseClass}__month`,
    navBar: `${baseClass}__nav-bar`,
    navButtonPrev: cx(
      `${baseClass}__nav-button`,
      `${baseClass}__nav-button--prev`
    ),
    navButtonNext: cx(
      `${baseClass}__nav-button`,
      `${baseClass}__nav-button--next`
    ),
    navButtonInteractionDisabled: `${baseClass}__nav-button--interaction-disabled`,
    caption: `${baseClass}__caption`,
    weekdays: `${baseClass}__weekdays`,
    weekdaysRow: `${baseClass}__weekdays-row`,
    weekday: `${baseClass}__weekday`,
    body: `${baseClass}__body`,
    week: `${baseClass}__week`,
    weekNumber: `${baseClass}__week-number`,
    day: `${baseClass}__day`,
    footer: `${baseClass}__footer`,
    todayButton: `${baseClass}__today-button`,
    today: `${baseClass}__day--today`,
    selected: `${baseClass}__day--selected`,
    disabled: `${baseClass}__day--disabled`,
    outside: `${baseClass}__day--outside`,
    start: `${baseClass}__day--start`,
    end: `${baseClass}__day--end`,
    ...props.classNames,
  });

  const {
    className,
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

  let firstDayOfWeek = 1;

  if (
    propsFirstDayOfWeek === 0 ||
    (propsFirstDayOfWeek && propsFirstDayOfWeek < 7)
  ) {
    firstDayOfWeek = propsFirstDayOfWeek;
  }

  const datePickerClassNames = React.useMemo(
    () => getDatePickerClassNames(),
    [props.range, props.classNames]
  );

  return (
    <ReactDayPicker
      navbarElement={
        navbarElement || (
          <DatePickerNavbar
            month={month}
            onNextClick={() => void 0}
            onPreviousClick={() => void 0}
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
