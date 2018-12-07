import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactDayPicker from 'react-day-picker';
import classNames from 'classnames/bind';
import styles from './style.scss';
import DatePickerNavbar from './DatePickerNavbar';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'date-picker';
const cx = classNames.bind(styles);

const DatePicker = props => {
  const { className, range, ...restProps } = props;

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
    start: styles[`${baseClass}__day--start`]
  };

  return (
    <ReactDayPicker
      classNames={datePickerClassNames}
      navbarElement={<DatePickerNavbar classNames={classNames} />}
      firstDayOfWeek={1}
      {...restProps}
    />
  );
};

DatePicker.propTypes = {
  className: PropTypes.string,
  range: PropTypes.bool
};

export default DatePicker;
