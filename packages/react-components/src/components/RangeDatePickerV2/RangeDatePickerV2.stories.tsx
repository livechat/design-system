import { Meta, StoryFn } from '@storybook/react';

import { RangeDatePickerV2 } from './RangeDatePickerV2';
import { IRangeDatePickerV2Props } from './types';

export default {
  title: 'Components/DatePicker/RangeDatePickerV2',
  component: RangeDatePickerV2,
} as Meta<typeof RangeDatePickerV2>;

const StoryTemplate = (
  args: Omit<IRangeDatePickerV2Props, 'onRangeSelect'>
) => {
  return (
    <div style={{ marginBottom: '300px' }}>
      <RangeDatePickerV2 initiallyOpen {...args} onRangeSelect={() => {}} />
    </div>
  );
};

export const Default: StoryFn = StoryTemplate.bind({});
Default.args = {};

export const WithInitialDates: StoryFn = StoryTemplate.bind({});
WithInitialDates.args = {
  initialFromDate: new Date('2025-01-20'),
  initialToDate: new Date('2025-02-06'),
};

export const WithInitialSelectedOption: StoryFn = StoryTemplate.bind({});
WithInitialSelectedOption.args = {
  initialSelectedOptionId: 'last7days',
};
