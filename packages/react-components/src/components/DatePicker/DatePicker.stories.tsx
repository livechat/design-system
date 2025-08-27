import * as React from 'react';

import { Meta, StoryFn } from '@storybook/react-vite';

import { DatePicker } from './DatePicker';
import { IDatePickerProps } from './types';

const DISABLED_RANGE_OPTIONS = [
  'No Disabled Dates',
  'Disable Before Current Date',
  'Disable After Current Date',
];

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    weekStartsOn: {
      description: 'Number representing first day of the week',
      table: {
        type: {
          summary: 'number: 0-6',
          detail: '0 - Sunday, 1 - Monday and so on, up to 6 - Saturday',
        },
      },
      defaultValue: 1,
      control: {
        type: 'number',
      },
    },
    disabled: {
      description: 'Range of disabled dates',
      control: {
        type: 'select',
      },
      options: DISABLED_RANGE_OPTIONS,
      defaultValue: DISABLED_RANGE_OPTIONS[0],
      table: {
        type: {
          summary: 'object',
          detail:
            '{ before: Date } | { after: Date } | { dayOfWeek: []: array of numbers 0-6 } | undefined',
        },
      },
    },
    month: {
      description: 'Providing this prop will make the date picker controlled',
      control: {
        type: 'date',
      },
    },
    startMonth: {
      description: 'Start month for the date picker',
      control: {
        type: 'date',
      },
    },
    endMonth: {
      description: 'End month for the date picker',
      control: {
        type: 'date',
      },
    },
  },
} as Meta<typeof DatePicker>;

const StoryTemplate = (args: IDatePickerProps) => {
  const { month, ...restArgs } = args;

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedMonth, setSelectedMonth] = React.useState<Date | undefined>();
  const [initialMonth] = React.useState<Date | undefined>(
    month ? new Date(month) : undefined
  );

  React.useEffect(() => {
    const newMonth = month ? new Date(month) : undefined;

    if (newMonth !== initialMonth) {
      setSelectedMonth(newMonth);
    }
  }, [month, initialMonth]);

  const getDisabledDates = () => {
    switch (restArgs.disabled as unknown) {
      case DISABLED_RANGE_OPTIONS[1]:
        return { before: new Date() };
      case DISABLED_RANGE_OPTIONS[2]:
        return { after: new Date() };
      default:
        return undefined;
    }
  };

  return (
    <DatePicker
      {...restArgs}
      mode="single"
      selected={selectedDate}
      month={selectedMonth || initialMonth}
      onSelect={setSelectedDate}
      onMonthChange={setSelectedMonth}
      disabled={getDisabledDates()}
    />
  );
};

export const Default: StoryFn = StoryTemplate.bind({});
Default.args = {};

export const WithCustomCurrentDate: StoryFn = StoryTemplate.bind({});
WithCustomCurrentDate.args = {
  today: new Date('01/20/2024'),
};

export const WithDatesBetweenTwoMonths: StoryFn = StoryTemplate.bind({});
WithDatesBetweenTwoMonths.args = {
  startMonth: new Date('11/20/2023'),
  endMonth: new Date('01/20/2024'),
};

export const WithCustomFirstDayOfWeek: StoryFn = StoryTemplate.bind({});
WithCustomFirstDayOfWeek.args = {
  weekStartsOn: 0,
};
