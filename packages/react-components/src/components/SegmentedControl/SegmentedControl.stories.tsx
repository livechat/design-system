import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl';
import * as TablerIcons from '@livechat/design-system-icons/react/tabler';
import { Icon } from '../Icon';

const buttonSizes = ['compact', 'medium', 'large'];
const buttonIcon = <Icon source={TablerIcons.AddCircle} />;

export default {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
  argTypes: {
    size: {
      options: buttonSizes,
      control: {
        type: 'select',
        labels: buttonSizes,
      },
    },
  },
} as ComponentMeta<typeof SegmentedControl>;

export const Default: Story<SegmentedControlProps> = (
  args: SegmentedControlProps
) => <SegmentedControl {...args} />;

Default.storyName = 'Controlled';
Default.args = {
  buttons: [
    { id: 'one', label: 'one', loading: true, disabled: true },
    { id: 'two', label: 'two', disabled: true },
    { id: 'three', label: 'three' },
    { id: 'fourth', label: 'fourth' },
    { id: 'fifth', label: 'fifth', icon: buttonIcon },
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
    { id: 'two', label: 'two', disabled: true },
    { id: 'three', label: 'three' },
    { id: 'fourth', label: 'fourth' },
  ],
  currentId: 'one',
};
