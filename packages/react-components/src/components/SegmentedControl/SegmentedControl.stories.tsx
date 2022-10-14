import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl';

export default {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
} as ComponentMeta<typeof SegmentedControl>;

export const Default: Story<SegmentedControlProps> = (
  args: SegmentedControlProps
) => <SegmentedControl {...args} />;

Default.storyName = 'Controlled';
Default.args = {
  buttons: [
    { id: 'one', label: 'one', state: ['loading', 'disabled'] },
    { id: 'two', label: 'two', state: ['disabled'] },
    { id: 'three', label: 'three' },
    { id: 'fourth', label: 'fourth' },
  ],
  initialId: 'fourth',
};

export const Uncontrolled: Story<SegmentedControlProps> = (
  args: SegmentedControlProps
) => <SegmentedControl {...args} />;

Uncontrolled.storyName = 'Uncontrolled With Initial Selection';
Uncontrolled.args = {
  buttons: [
    { id: 'one', label: 'one' },
    { id: 'two', label: 'two', state: ['disabled'] },
    { id: 'three', label: 'three' },
    { id: 'fourth', label: 'fourth' },
  ],
  currentId: 'one',
};
