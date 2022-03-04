import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  DatePicker as DatePickerComponent,
  IDatePickerProps,
} from '../components/Datepicker/DatePicker';

export default {
  title: 'Components/DatePicker',
  component: DatePickerComponent,
  argTypes: {
    innerRef: {
      table: {
        disable: true,
      },
    },
    range: {
      table: {
        disable: true,
      },
    },
    firstDayOfWeek: {
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
    disabledDays: {
      description:
        'You can disable choosen dates. Pass either a date or array of dates',
      table: {
        type: {
          summary: 'Date | Array<Date>',
        },
      },
      control: {
        type: 'date',
      },
    },
  },
} as ComponentMeta<typeof DatePickerComponent>;

const StoryTemplate: Story<IDatePickerProps> = (args: IDatePickerProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const argsSelectedDate = args.selectedDays
    ? new Date(args.selectedDays)
    : void 0;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const argsDisabledDays = args.disabledDays
    ? new Date(args.disabledDays)
    : void 0;
  const [selectedDate, setSelectedDate] = React.useState<
    IDatePickerProps['selectedDays'] | undefined
  >(argsSelectedDate);

  return (
    <div style={{ width: '300px' }}>
      <DatePickerComponent
        {...args}
        disabledDays={argsDisabledDays}
        onDayClick={(date: Date) => {
          setSelectedDate(date);
        }}
        selectedDays={selectedDate}
      />
    </div>
  );
};

export const DatePicker = StoryTemplate.bind({});
DatePicker.args = {};

export const DatePickerWithDatesBetweenTwoMonths = StoryTemplate.bind({});
DatePickerWithDatesBetweenTwoMonths.args = {
  fromMonth: new Date('06/20/2021'),
  toMonth: new Date('09/20/2021'),
  month: new Date('09/20/2021'),
};

export const DatePickerWithCustomFirstDayOfWeek = StoryTemplate.bind({});
DatePickerWithCustomFirstDayOfWeek.args = {
  firstDayOfWeek: 0,
};

// export const NumericInputWithNoControls = StoryTemplate.bind({});
// NumericInputWithNoControls.args = {
//   noControls: true,
// };

// export const NumericInputWithDisabled = StoryTemplate.bind({});
// NumericInputWithDisabled.args = {
//   disabled: true,
// };

// export const NumericInputWithError = StoryTemplate.bind({});
// NumericInputWithError.args = {
//   error: 'Error',
// };
