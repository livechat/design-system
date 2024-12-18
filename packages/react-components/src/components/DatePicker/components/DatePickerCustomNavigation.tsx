import * as React from 'react';

import {
  ChevronLeft,
  ChevronRight,
  DoubleArrowLeft,
  DoubleArrowRight,
} from '@livechat/design-system-icons';
import {
  subMonths,
  addMonths,
  differenceInCalendarMonths,
  isSameMonth,
} from 'date-fns';

import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { IDatePickerCustomNavigationProps } from '../types';

import styles from './DatePickerCustomNavigation.module.scss';

const baseClass = 'date-picker-custom-navigation';

export const DatePickerCustomNavigation: React.FC<
  IDatePickerCustomNavigationProps
> = ({ currentMonth, setMonth, startMonth, endMonth, numberOfMonths }) => {
  const shouldDisablePreviousButton =
    !startMonth || !isSameMonth(currentMonth, startMonth);
  const shouldDisableNextButton =
    !endMonth || !isSameMonth(currentMonth, endMonth);

  const handlePreviousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() - 1);
    setMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + 1);
    setMonth(newMonth);
  };

  const handlePreviousYearClick = () => {
    if (!startMonth) {
      const newMonth = subMonths(currentMonth, 12);

      return setMonth(newMonth);
    }

    const diff = Math.abs(differenceInCalendarMonths(currentMonth, startMonth));
    const newMonth = subMonths(
      currentMonth,
      !Number.isNaN(diff) && diff > 12 ? 12 : diff
    );

    return setMonth(newMonth);
  };

  const handleNextYearClick = () => {
    if (!endMonth) {
      const newMonth = addMonths(currentMonth, 12);

      return setMonth(newMonth);
    }

    const diff = Math.abs(differenceInCalendarMonths(endMonth, currentMonth));
    const newMonth = addMonths(
      currentMonth,
      !Number.isNaN(diff) && diff > 12 ? 12 : diff
    );

    if (numberOfMonths === 2 && isSameMonth(newMonth, endMonth)) {
      return setMonth(subMonths(newMonth, 1));
    }

    return setMonth(newMonth);
  };

  return (
    <div className={styles[baseClass]}>
      <div className={styles[`${baseClass}__nav-wrapper`]}>
        <Button
          data-testid="date-picker-prev-year-button"
          kind="plain"
          size="xcompact"
          icon={<Icon source={DoubleArrowLeft} />}
          onClick={handlePreviousYearClick}
          disabled={!shouldDisablePreviousButton}
        />
        <Button
          data-testid="date-picker-prev-month-button"
          kind="plain"
          size="xcompact"
          icon={<Icon source={ChevronLeft} />}
          onClick={handlePreviousMonth}
          disabled={!shouldDisablePreviousButton}
        />
      </div>
      <div className={styles[`${baseClass}__nav-wrapper`]}>
        <Button
          data-testid="date-picker-next-month-button"
          kind="plain"
          size="xcompact"
          icon={<Icon source={ChevronRight} />}
          onClick={handleNextMonth}
          disabled={!shouldDisableNextButton}
        />
        <Button
          data-testid="date-picker-next-year-button"
          kind="plain"
          size="xcompact"
          icon={<Icon source={DoubleArrowRight} />}
          onClick={handleNextYearClick}
          disabled={!shouldDisableNextButton}
        />
      </div>
    </div>
  );
};
