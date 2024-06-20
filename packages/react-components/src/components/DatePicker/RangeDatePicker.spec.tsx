import * as React from 'react';

import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import { DatePicker } from './DatePicker';
import { DatePickerRangeCalendarsWrapper } from './DatePickerRangeCalendarsWrapper';
import { RangeDatePicker } from './RangeDatePicker';
import {
  IRangeDatePickerProps,
  IRangeDatePickerChildrenPayload,
} from './types';

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
      initialFromDate: new Date(2022, 0, 1),
      initialToDate: new Date(2022, 1, 1),
      onChange,
      options,
      initialSelectedItemKey: 'custom_date',
      children,
    });
    const startDate = getByLabelText(new Date(2022, 0, 1).toDateString());
    const endDate = getByLabelText(new Date(2022, 1, 1).toDateString());

    userEvent.click(startDate);
    userEvent.click(endDate);
    // onChange callback has been called when user has chosen custom date range
    expect(onChange).toHaveBeenCalled();
  });
});
