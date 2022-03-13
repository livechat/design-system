import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  RangeDatePicker as RangeDatePickerComponent,
  IRangeDatePickerProps,
} from '../components/Datepicker/RangeDatePicker';
import { DatePicker } from '../components/Datepicker/DatePicker';
import { DatePickerRangeCalendarsWrapper } from '../components/Datepicker/DatePickerRangeCalendarsWrapper';

export default {
  title: 'Components/RangeDatePicker',
  component: RangeDatePickerComponent,
} as ComponentMeta<typeof RangeDatePickerComponent>;

const StoryTemplate: Story<IRangeDatePickerProps> = (
  args: IRangeDatePickerProps
) => {
  return (
    <div style={{ width: '550px' }}>
      <RangeDatePickerComponent
        initialSelectedItemKey="default"
        // initialFromDate={new Date(2014, 1, 1)}
        // initialToDate={new Date(2015, 1, 1)}
        toMonth={new Date()}
        onChange={(v) => console.log('x', v)}
      >
        {({ datepicker }) => (
          <DatePickerRangeCalendarsWrapper>
            {/* eslint-disable-next-line */}
            {/* @ts-ignore-next-line */}
            <DatePicker {...datepicker} />
          </DatePickerRangeCalendarsWrapper>
        )}
      </RangeDatePickerComponent>
    </div>
  );
};

export const RangeDatePicker = StoryTemplate.bind({});
RangeDatePicker.args = {};
