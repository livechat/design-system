import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactDayPickerInput from 'react-day-picker/DayPickerInput';
import { Input } from '../InputField';
import styles from './style.scss';
import DatePickerNavbar from './DatePickerNavbar';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'date-picker';

const DatePickerInput = props => {
  const { className, dayPickerProps, ...restProps } = props;

  const classNames = {
    container: styles[baseClass],
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
    outside: styles[`${baseClass}__day--outside`]
  };

  return (
    <ReactDayPickerInput
      hideOnDayClick={false}
      component={componentProps => <Input {...componentProps} />}
      classNames={classNames}
      dayPickerProps={{
        classNames,
        navbarElement: <DatePickerNavbar classNames={classNames} />,
        firstDayOfWeek: 1
      }}
      {...restProps}
    />
  );
};

DatePickerInput.propTypes = {
  className: PropTypes.string
};

export default DatePickerInput;
