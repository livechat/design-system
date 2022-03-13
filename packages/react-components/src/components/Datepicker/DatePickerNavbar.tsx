import * as React from 'react';
import {
  subMonths,
  addMonths,
  differenceInCalendarMonths,
  isSameMonth,
} from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDoubleLeft,
  ChevronDoubleRight,
} from '@livechat/design-system-icons/dist/material';
import cx from 'classnames';
import Icon, { IconTypeName } from '../Icon';
import { IDatePickerNavbarProps } from './types';

const DatePickerNavbar: React.FC<IDatePickerNavbarProps> = (props) => {
  const {
    onPreviousClick,
    onMonthChange,
    onNextClick,
    showNextButton,
    showPreviousButton,
    className,
    classNames,
    numberOfMonths,
    month,
    fromMonth,
    toMonth,
  } = props;

  // prev and next button handler are passed by react-day-picker, added check to be safe
  // see: https://github.com/gpbl/react-day-picker/blob/v7/src/DayPicker.js#L529
  const handlePrevClick = () => {
    if (typeof onPreviousClick === 'function') {
      onPreviousClick();
    }
  };

  const handleNextClick = () => {
    if (typeof onNextClick === 'function') {
      onNextClick();
    }
  };

  const handlePrevYearClick = () => {
    if (!fromMonth) {
      const newMonth = subMonths(month, 12);
      return onMonthChange(newMonth);
    }
    const diff = Math.abs(differenceInCalendarMonths(month, fromMonth));
    const newMonth = subMonths(
      month,
      !Number.isNaN(diff) && diff > 12 ? 12 : diff
    );
    return onMonthChange(newMonth);
  };

  const handleNextYearClick = () => {
    if (!toMonth) {
      const newMonth = addMonths(month, 12);
      return onMonthChange(newMonth);
    }
    const diff = Math.abs(differenceInCalendarMonths(toMonth, month));
    const newMonth = addMonths(
      month,
      !Number.isNaN(diff) && diff > 12 ? 12 : diff
    );

    if (numberOfMonths === 2 && isSameMonth(newMonth, toMonth)) {
      return onMonthChange(subMonths(newMonth, 1));
    }
    return onMonthChange(newMonth);
  };

  return (
    <div className={className}>
      <div style={{ display: 'flex' }}>
        <button
          className={cx({
            [classNames.navButtonPrev]: true,
            [classNames.navButtonInteractionDisabled]: !showPreviousButton,
          })}
          onClick={handlePrevYearClick}
        >
          <Icon source={ChevronDoubleLeft} iconType={IconTypeName.Subtle} />
        </button>
        <button
          className={cx({
            [classNames.navButtonPrev]: true,
            [classNames.navButtonInteractionDisabled]: !showPreviousButton,
          })}
          onClick={handlePrevClick}
        >
          <Icon source={ChevronLeft} iconType={IconTypeName.Subtle} />
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <button
          className={cx({
            [classNames.navButtonNext]: true,
            [classNames.navButtonInteractionDisabled]: !showNextButton,
          })}
          onClick={handleNextClick}
        >
          <Icon source={ChevronRight} iconType={IconTypeName.Subtle} />
        </button>
        <button
          className={cx({
            [classNames.navButtonNext]: true,
            [classNames.navButtonInteractionDisabled]: !showNextButton,
          })}
          onClick={handleNextYearClick}
        >
          <Icon source={ChevronDoubleRight} iconType={IconTypeName.Subtle} />
        </button>
      </div>
    </div>
  );
};

export default DatePickerNavbar;
