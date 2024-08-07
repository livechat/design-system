import * as React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { DISABLED_CONTROLS } from '../../utils/story-parameters';

import { Switch, SwitchProps } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    innerRef: {
      control: false,
    },
    defaultOn: {
      control: false,
    },
  },
} as Meta<typeof Switch>;

export const Default: StoryFn<SwitchProps> = (args: SwitchProps) => (
  <Switch {...args} onChange={undefined} />
);

export const States: StoryFn = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Regular">
      <Switch on={true} state="regular" />
      <Switch on={false} state="regular" />
    </StoryDescriptor>
    <StoryDescriptor title="Loading">
      <Switch on={true} state="loading" />
      <Switch on={false} state="loading" />
    </StoryDescriptor>
    <StoryDescriptor title="Locked">
      <Switch on={true} state="locked" />
      <Switch on={false} state="locked" />
    </StoryDescriptor>
  </>
);
States.parameters = DISABLED_CONTROLS;

export const Availability: StoryFn = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Enabled">
      <Switch on={true} />
      <Switch on={false} />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <Switch on={true} disabled={true} />
      <Switch on={false} disabled={true} />
    </StoryDescriptor>
  </>
);
Availability.parameters = DISABLED_CONTROLS;

export const Sizes: StoryFn = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Compact">
      <Switch size="compact" />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Switch size="medium" />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Switch size="large" />
    </StoryDescriptor>
  </>
);
Sizes.parameters = DISABLED_CONTROLS;
