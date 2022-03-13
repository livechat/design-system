import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { subDays } from 'date-fns';

import { RangeDatePicker as RangeDatePickerComponent } from '../components/Datepicker/RangeDatePicker';
import {
  IRangeDatePickerOption,
  IRangeDatePickerProps,
} from '../components/Datepicker/types';
import { DatePicker } from '../components/Datepicker/DatePicker';
import { DatePickerRangeCalendarsWrapper } from '../components/Datepicker/DatePickerRangeCalendarsWrapper';

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
  const handleChange = (selectedOption: IRangeDatePickerOption | null) => {
    if (!selectedOption) {
      alert('Datepicker values cleared.');

      return;
    }

    if (
      selectedOption.value &&
      selectedOption.value.to &&
      selectedOption.value.from
    ) {
      alert(
        `Selected dates - from: ${selectedOption.value.from.toISOString()}, to: ${selectedOption.value.to.toISOString()}`
      );
    }
  };

  const isSelectedOptionManual = (itemKey: string | number) => {
    if (!Array.isArray(args.options)) {
      return;
    }

    const selectedOption = args.options.find((o) => o.id === itemKey);

    return Boolean(selectedOption && selectedOption.isManual);
  };

  return (
    <RangeDatePickerComponent
      {...args}
      toMonth={args.toMonth && new Date(args.toMonth)}
      initialFromDate={args.initialFromDate && new Date(args.initialFromDate)}
      initialToDate={args.initialToDate && new Date(args.initialToDate)}
      onChange={handleChange}
    >
      {({ datepicker, select }) => (
        <div style={{ maxWidth: '550px' }}>
          <select
            value={select.selected}
            onChange={(e) => {
              select.onItemSelect(e.target.value);
            }}
          >
            {args.options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          {isSelectedOptionManual(select.selected) && (
            <DatePickerRangeCalendarsWrapper>
              <DatePicker {...datepicker} />
            </DatePickerRangeCalendarsWrapper>
          )}
        </div>
      )}
    </RangeDatePickerComponent>
  );
};

export const RangeDatePicker = StoryTemplate.bind({});
