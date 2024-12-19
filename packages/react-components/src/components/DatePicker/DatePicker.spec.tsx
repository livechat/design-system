import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import { DatePicker } from './DatePicker';
import { IDatePickerProps } from './types';

const renderComponent = (props: IDatePickerProps) =>
  render(<DatePicker {...props} />);

describe('<DatePicker> component', () => {
  it('should call onMonthChange when next and previous year button user click', () => {
    const onMonthChange = vi.fn();
    const { getByTestId } = renderComponent({
      month: new Date(2022, 0, 1),
      onMonthChange,
    });
    const nextYearButton = getByTestId('date-picker-next-year-button');
    const previousYearButton = getByTestId('date-picker-prev-year-button');

    userEvent.click(nextYearButton);
    // Datepicker has 12 o'clock as default hour
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2023, 0, 1));
    userEvent.click(previousYearButton);
    // Datepicker has 12 o'clock as default hour
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2021, 0, 1));
  });

  it('should call onMonthChange when next and previous month button user click', () => {
    const onMonthChange = vi.fn();
    const { getByTestId } = renderComponent({
      month: new Date(2022, 0, 1),
      onMonthChange,
    });
    const nextMonthButton = getByTestId('date-picker-next-month-button');
    const previousMonthButton = getByTestId('date-picker-prev-month-button');

    userEvent.click(nextMonthButton);
    // Datepicker has 12 o'clock as default hour
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2022, 1, 1));
    userEvent.click(previousMonthButton);
    // Datepicker has 12 o'clock as default hour
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2021, 11, 1));
  });

  it('should call onDayClick when user click on a day', () => {
    const onDayClick = vi.fn();
    const { getByText } = renderComponent({
      month: new Date(2022, 0, 1),
      onDayClick,
    });
    const day = getByText('1');

    userEvent.click(day);
    expect(onDayClick).toHaveBeenCalled();
  });

  it('should have Monday as a default first weekday', () => {
    const { container } = renderComponent({ weekStartsOn: undefined });
    const weekdays = container.querySelectorAll('th');

    expect(weekdays).toHaveLength(7);
    expect(weekdays[0]).toHaveAttribute('aria-label', 'Monday');
  });
});
