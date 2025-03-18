import * as React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { TimePicker } from './TimePicker';
import { ITimePickerProps } from './types';

export default {
  title: 'Components/TimePicker',
  component: TimePicker,
} as Meta<typeof TimePicker>;

export const Default: StoryFn<ITimePickerProps> = (args: ITimePickerProps) => {
  const [value, setValue] = React.useState<string | undefined>();

  return (
    <TimePicker
      {...args}
      value={value}
      onChange={(v) => setValue(v.target.value)}
    />
  );
};
