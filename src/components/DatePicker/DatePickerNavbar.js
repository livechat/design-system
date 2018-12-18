import * as React from 'react';
import * as PropTypes from 'prop-types';
import { subMonths, addMonths, differenceInCalendarMonths } from 'date-fns';
import ChevronLeftIcon from 'react-material-icon-svg/dist/ChevronLeftIcon';
import ChevronRightIcon from 'react-material-icon-svg/dist/ChevronRightIcon';
import ChevronDoubleLeftIcon from 'react-material-icon-svg/dist/ChevronDoubleLeftIcon';
import ChevronDoubleRightIcon from 'react-material-icon-svg/dist/ChevronDoubleRightIcon';
import cx from 'classnames';
import DayPicker from 'react-day-picker';

const DatePickerNavbar = props => {
  const {
    onPreviousClick,
    onNextClick,
    showNextButton,
    showPreviousButton,
    className,
    classNames,
    datePickerRef,
    month,
    fromMonth,
    toMonth
  } = props;

  const handlePrevClick = () => onPreviousClick();
  const handleNextClick = () => onNextClick();

  const handlePrevYearClick = () => {
    const diff = Math.abs(differenceInCalendarMonths(month, fromMonth));
    const newMonth = subMonths(month, diff > 12 ? 12 : diff);
    datePickerRef.current.showMonth(newMonth);
  };

  const handleNextYearClick = () => {
    const diff = Math.abs(differenceInCalendarMonths(toMonth, month));
    const newMonth = addMonths(month, diff > 12 ? 12 : diff);
    datePickerRef.current.showMonth(newMonth);
  };

  return (
    <div className={className}>
      <div style={{ display: 'flex' }}>
        <button
          className={cx({
            [classNames.navButtonPrev]: true,
            [classNames.navButtonInteractionDisabled]: !showPreviousButton
          })}
          onClick={handlePrevYearClick}
        >
          <ChevronDoubleLeftIcon width="20px" height="20px" fill="#4384f5" />
        </button>
        <button
          className={cx({
            [classNames.navButtonPrev]: true,
            [classNames.navButtonInteractionDisabled]: !showPreviousButton
          })}
          onClick={handlePrevClick}
        >
          <ChevronLeftIcon width="20px" height="20px" fill="#4384f5" />
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <button
          className={cx({
            [classNames.navButtonNext]: true,
            [classNames.navButtonInteractionDisabled]: !showNextButton
          })}
          onClick={handleNextClick}
        >
          <ChevronRightIcon width="20px" height="20px" fill="#4384f5" />
        </button>
        <button
          className={cx({
            [classNames.navButtonNext]: true,
            [classNames.navButtonInteractionDisabled]: !showNextButton
          })}
          onClick={handleNextYearClick}
        >
          <ChevronDoubleRightIcon width="20px" height="20px" fill="#4384f5" />
        </button>
      </div>
    </div>
  );
};

DatePickerNavbar.propTypes = {
  className: PropTypes.string,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  month: PropTypes.instanceOf(Date),
  fromMonth: PropTypes.instanceOf(Date),
  toMonth: PropTypes.instanceOf(Date),
  showNextButton: PropTypes.bool,
  showPreviousButton: PropTypes.bool,
  classNames: PropTypes.objectOf(PropTypes.string),
  datePickerRef: PropTypes.shape({
    current: PropTypes.instanceOf(DayPicker)
  })
};

export default DatePickerNavbar;
