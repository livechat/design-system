import { within } from '@testing-library/react';
import * as React from 'react';
import { render, userEvent } from 'test-utils';
import { vi } from 'vitest';
import { DatePicker } from './DatePicker';
import { IDatePickerProps } from './types';

describe('<DatePicker> component', () => {
  function renderComponent(props: IDatePickerProps = {}) {
    return render(<DatePicker {...props} />);
  }

  it('should call advance a year by one on "next year" click', () => {
    const onMonthChange = vi.fn();
    const { getByTestId } = renderComponent({
      month: new Date(2022, 0, 1),
      onMonthChange,
    });

    const button = getByTestId('date-picker-next-year-button');

    userEvent.click(button);

    // Datepicker has 12 o'clock as default hour
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2023, 0, 1, 12));
  });

  it('should have Monday as a default first weekday', () => {
    const { getAllByRole } = renderComponent({ firstDayOfWeek: 9 });

    const weekdays = getAllByRole('columnheader');

    expect(weekdays).toHaveLength(7);

    const firstWeekday = within(weekdays[0]).getByTitle('Monday');

    expect(firstWeekday).toBeDefined();
  });
});
