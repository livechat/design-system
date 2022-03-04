import * as React from 'react';
import ReactDayPicker, { DayPickerProps } from 'react-day-picker';
import cx from 'classnames';
import DatePickerNavbar from './DatePickerNavbar';

const baseClass = 'date-picker';

export interface IDatePickerProps extends DayPickerProps {
  innerRef?: React.Ref<ReactDayPicker>;
  range?: boolean;
}

const DatePickerComponent: React.FC<IDatePickerProps> = (props) => {
  const [month, setMonth] = React.useState(props.month || new Date());

  React.useEffect(() => {
    if (props.month && props.month !== month) {
      setMonth(props.month);
    }
  }, [props.month, month]);

  const handleMonthChange = (month: Date) => {
    if (props.onMonthChange && props.month) {
      props.onMonthChange(month);
      return;
    }

    setMonth(month);
  };

  const renderDay = (day: Date) => {
    const date = day.getDate();

    return (
      <div className={`${baseClass}__day-wrapper`}>
        <div className={`${baseClass}__day-content`}>{date}</div>
      </div>
    );
  };

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
    renderDay: dayRenderer,
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

  const datePickerClassNames = getDatePickerClassNames();

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
      renderDay={dayRenderer || renderDay}
      {...restProps}
    />
  );
};

export const DatePicker = React.forwardRef<ReactDayPicker, IDatePickerProps>(
  (props, ref) => <DatePickerComponent innerRef={ref} {...props} />
);

DatePicker.displayName = 'DatePicker';
