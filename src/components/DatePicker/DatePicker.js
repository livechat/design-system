import * as React from 'react';
import ReactDayPicker from 'react-day-picker';
import cssClassNames from 'classnames/bind';
import styles from './style.scss';
import DatePickerNavbar from './DatePickerNavbar';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'date-picker';
const cx = cssClassNames.bind(styles);

class DatePicker extends React.PureComponent {
  datePickerRef = this.props.innerRef || React.createRef();

  renderDay = day => {
    const date = day.getDate();

    return (
      <div className={styles[`${baseClass}__day-wrapper`]}>
        <div className={styles[`${baseClass}__day-content`]}>{date}</div>
      </div>
    );
  };

  render() {
    const {
      className,
      range,
      toMonth,
      fromMonth,
      firstDayOfWeek,
      navbarElement,
      renderDay,
      classNames,
      ...restProps
    } = this.props;

    const datePickerClassNames = {
      container: cx({
        [baseClass]: true,
        [`${baseClass}--range`]: range
      }),
      wrapper: styles[`${baseClass}__wrapper`],
      interactionDisabled: styles[`${baseClass}--interaction-disabled`],
      months: styles[`${baseClass}__months`],
      month: styles[`${baseClass}__month`],
      navBar: styles[`${baseClass}__nav-bar`],
      navButtonPrev: getMergedClassNames(
        styles[`${baseClass}__nav-button`],
        styles[`${baseClass}__nav-button--prev`]
      ),
      navButtonNext: getMergedClassNames(
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
      ...classNames
    };

    return (
      <ReactDayPicker
        navbarElement={
          navbarElement || (
            <DatePickerNavbar
              classNames={datePickerClassNames}
              datePickerRef={this.datePickerRef}
              toMonth={toMonth}
              fromMonth={fromMonth}
            />
          )
        }
        ref={this.datePickerRef}
        classNames={datePickerClassNames}
        toMonth={toMonth}
        fromMonth={fromMonth}
        firstDayOfWeek={firstDayOfWeek || 1}
        renderDay={renderDay || this.renderDay}
        {...restProps}
      />
    );
  }
}

export default DatePicker;
