import * as TablerIcons from '@livechat/design-system-icons';
import { Meta, StoryFn } from '@storybook/react';

import { Icon } from '../Icon';

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl';

const buttonSizes = ['compact', 'medium', 'large'];
const buttonIcon = <Icon source={TablerIcons.AddCircle} />;
const buttonIcon2 = <Icon source={TablerIcons.OpenInNew} />;
const buttonIcon3 = <Icon source={TablerIcons.ContentCopy} />;

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
} as Meta<typeof SegmentedControl>;

export const Default: StoryFn<SegmentedControlProps> = (
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

export const Uncontrolled: StoryFn<SegmentedControlProps> = (
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

export const WithIcons: StoryFn<SegmentedControlProps> = (
  args: SegmentedControlProps
) => <SegmentedControl {...args} />;

WithIcons.args = {
  buttons: [
    { id: 'one', icon: buttonIcon },
    { id: 'two', icon: buttonIcon2 },
    { id: 'three', icon: buttonIcon3, disabled: true },
  ],
};
