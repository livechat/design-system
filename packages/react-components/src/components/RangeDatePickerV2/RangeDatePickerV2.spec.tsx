import { startOfToday, subDays } from 'date-fns';

import { render, vi, userEvent } from 'test-utils';

import { RangeDatePickerV2 } from './RangeDatePickerV2';
import { IRangeDatePickerV2Props } from './types';

const DEFAULT_PROPS = {
  onRangeSelect: vi.fn(),
  initialToDate: new Date(2025, 0, 1), // to prevent changing the date on each test run
};

const renderComponent = (props: IRangeDatePickerV2Props) => {
  return render(<RangeDatePickerV2 {...props} />);
};

describe('<RangeDatePickerV2> component', () => {
  it('should allow to pass custom classes', () => {
    const { getByTestId } = renderComponent({
      ...DEFAULT_PROPS,
      initiallyOpen: true,
      triggerClassName: 'trigger-class',
      rangeDatePickerClassName: 'range-class',
    });

    expect(getByTestId('range-date-picker-trigger')).toHaveClass(
      'trigger-class'
    );
    expect(getByTestId('range-date-picker')).toHaveClass('range-class');
  });

  it('should render as closed by default', () => {
    const { queryByTestId } = renderComponent(DEFAULT_PROPS);

    expect(queryByTestId('range-date-picker')).not.toBeInTheDocument();
  });

  it('should render as open if initiallyOpen is set true', () => {
    const { getByTestId } = renderComponent({
      ...DEFAULT_PROPS,
      initiallyOpen: true,
    });

    expect(getByTestId('range-date-picker')).toBeInTheDocument();
  });

  it('should open on user click', () => {
    const { getByTestId, queryByTestId } = renderComponent(DEFAULT_PROPS);

    expect(queryByTestId('range-date-picker')).not.toBeInTheDocument();
    userEvent.click(getByTestId('range-date-picker-trigger'));
    expect(getByTestId('range-date-picker')).toBeInTheDocument();
  });

  it('should call onRangeSelect with selected range', () => {
    const onRangeSelect = vi.fn();
    const { getByLabelText } = renderComponent({
      ...DEFAULT_PROPS,
      onRangeSelect,
      initiallyOpen: true,
    });

    userEvent.click(getByLabelText('Thursday, January 16th, 2025'));
    userEvent.click(getByLabelText('Thursday, February 6th, 2025'));

    expect(onRangeSelect).toHaveBeenCalledWith(
      {
        from: new Date(2025, 0, 16),
        to: new Date(2025, 1, 6),
      },
      undefined
    );
  });

  it('should call onRangeSelect with selected range if selected start date is after after end date', () => {
    const onRangeSelect = vi.fn();
    const { getByLabelText } = renderComponent({
      ...DEFAULT_PROPS,
      onRangeSelect,
      initiallyOpen: true,
    });

    userEvent.click(getByLabelText('Thursday, February 6th, 2025'));
    userEvent.click(getByLabelText('Thursday, January 16th, 2025'));

    expect(onRangeSelect).toHaveBeenCalledWith(
      {
        from: new Date(2025, 0, 16),
        to: new Date(2025, 1, 6),
      },
      undefined
    );
  });

  it('should call onRangeSelect with selected range if selected same date twice', () => {
    const onRangeSelect = vi.fn();
    const { getByLabelText } = renderComponent({
      ...DEFAULT_PROPS,
      onRangeSelect,
      initiallyOpen: true,
    });

    userEvent.click(getByLabelText('Thursday, January 16th, 2025'));
    userEvent.click(getByLabelText('Thursday, January 16th, 2025, selected'));

    expect(onRangeSelect).toHaveBeenCalledWith(
      {
        from: new Date(2025, 0, 16),
        to: new Date(2025, 0, 16),
      },
      undefined
    );
  });

  it('should call onRangeSelect with selected range and option id', () => {
    const onRangeSelect = vi.fn();
    const { getByText } = renderComponent({
      ...DEFAULT_PROPS,
      onRangeSelect,
      initiallyOpen: true,
    });
    const todayDate = startOfToday();

    userEvent.click(getByText('Last 7 days'));

    expect(onRangeSelect).toHaveBeenCalledWith(
      {
        from: subDays(todayDate, 6),
        to: todayDate,
      },
      'last7days'
    );
  });
});
