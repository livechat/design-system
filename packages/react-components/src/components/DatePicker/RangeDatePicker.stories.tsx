import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { subDays } from 'date-fns';

import { RangeDatePicker as RangeDatePickerComponent } from './RangeDatePicker';
import { IRangeDatePickerProps } from './types';
import { DatePicker } from './DatePicker';
import { DatePickerRangeCalendarsWrapper } from './DatePickerRangeCalendarsWrapper';

const options = [
  { id: 'today', label: 'Today', value: { from: new Date(), to: new Date() } },
  {
    id: 'yesterday',
    label: 'Yesterday',
    value: { from: subDays(new Date(), 1), to: subDays(new Date(), 1) },
  },
  {
    id: 'last_7_days',
    label: 'Last 7 days',
    value: { from: subDays(new Date(), 7), to: new Date() },
  },
  { id: 'custom_date', isManual: true, label: 'Custom date', value: null },
];

export default {
  title: 'Components/RangeDatePicker',
  component: RangeDatePickerComponent,
  argTypes: {
    initialFromDate: {
      control: {
        type: 'date',
      },
    },
    initialToDate: {
      control: {
        type: 'date',
      },
    },
    toMonth: {
      control: {
        type: 'date',
      },
    },
    initialSelectedItemKey: {
      options: options.map((o) => o.id),
      mapping: options.map((o) => o.id),
      control: {
        type: 'select',
        labels: options.map((o) => o.label),
      },
      defaultValue: 'custom_date',
    },
    options: {
      defaultValue: options,
    },
    resetStateOnPropsChange: {
      defaultValue: true,
    },
  },
} as ComponentMeta<typeof RangeDatePickerComponent>;

const StoryTemplate: Story<IRangeDatePickerProps> = (
  args: IRangeDatePickerProps
) => {
  return (
    <RangeDatePickerComponent
      {...args}
      toMonth={args.toMonth && new Date(args.toMonth)}
      initialFromDate={args.initialFromDate && new Date(args.initialFromDate)}
      initialToDate={args.initialToDate && new Date(args.initialToDate)}
    >
      {({ datepicker }) => (
        <DatePickerRangeCalendarsWrapper>
          <DatePicker {...datepicker} />
        </DatePickerRangeCalendarsWrapper>
      )}
    </RangeDatePickerComponent>
  );
};

export const RangeDatePicker = StoryTemplate.bind({});
RangeDatePicker.args = {
  initialFromDate: subDays(new Date(), 7),
  initialToDate: new Date(),
};
