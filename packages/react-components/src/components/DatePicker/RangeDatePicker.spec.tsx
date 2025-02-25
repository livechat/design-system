import { format } from 'date-fns';
import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import { DatePicker } from './DatePicker';
import { DatePickerRangeCalendarsWrapper } from './DatePickerRangeCalendarsWrapper';
import { RangeDatePicker } from './RangeDatePicker';
import {
  IRangeDatePickerProps,
  IRangeDatePickerChildrenPayload,
} from './types';

const formattedDate = (date: Date) => format(date, 'EEEE, MMMM do, yyyy');

const options = [
  {
    id: 'custom_date',
    isManual: true,
    label: 'Custom date',
    value: null,
  },
];

const children = (payload: IRangeDatePickerChildrenPayload) => {
  return (
    <DatePickerRangeCalendarsWrapper>
      <DatePicker {...payload.datepicker} />
    </DatePickerRangeCalendarsWrapper>
  );
};

const renderComponent = (props: IRangeDatePickerProps) =>
  render(<RangeDatePicker {...props} />);

describe('<RangeDatePicker> component', () => {
  it('should call onChange callback if user chooses custom date', () => {
    const onChange = vi.fn();
    const { getByLabelText } = renderComponent({
      toMonth: new Date(2022, 1, 1),
      onChange,
      options,
      initialSelectedItemKey: 'custom_date',
      children,
    });
    const startDate = getByLabelText(formattedDate(new Date(2022, 0, 1)));
    const endDate = getByLabelText(formattedDate(new Date(2022, 1, 1)));

    userEvent.click(startDate);
    userEvent.click(endDate);
    // onChange callback has been called when user has chosen custom date range
    expect(onChange).toHaveBeenCalled();
  });
});
