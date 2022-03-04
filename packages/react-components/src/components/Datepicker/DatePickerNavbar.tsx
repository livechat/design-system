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
import { ClassNames } from 'react-day-picker/types/ClassNames';

export interface IProps {
  showPreviousButton?: boolean;
  showNextButton?: boolean;
  month: Date;
  fromMonth?: Date;
  toMonth?: Date;
  numberOfMonths?: number;
  className?: string;
  classNames: ClassNames;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onMonthChange: (newMonth: Date) => void;
}

const DatePickerNavbar: React.FC<IProps> = (props) => {
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

  const handlePrevClick = () => onPreviousClick();
  const handleNextClick = () => onNextClick();

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
          <Icon source={ChevronDoubleLeft} iconType={IconTypeName.Link} />
        </button>
        <button
          className={cx({
            [classNames.navButtonPrev]: true,
            [classNames.navButtonInteractionDisabled]: !showPreviousButton,
          })}
          onClick={handlePrevClick}
        >
          <Icon source={ChevronLeft} iconType={IconTypeName.Link} />
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
          <Icon source={ChevronRight} iconType={IconTypeName.Link} />
        </button>
        <button
          className={cx({
            [classNames.navButtonNext]: true,
            [classNames.navButtonInteractionDisabled]: !showNextButton,
          })}
          onClick={handleNextYearClick}
        >
          <Icon source={ChevronDoubleRight} iconType={IconTypeName.Link} />
        </button>
      </div>
    </div>
  );
};

export default DatePickerNavbar;
