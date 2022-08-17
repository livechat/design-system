import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { DISABLED_CONTROLS } from '../../utils/story-parameters';

import { Switch, SwitchProps } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

export const Default: Story<SwitchProps> = (args: SwitchProps) => (
  <Switch {...args} onChange={undefined} />
);
Default.storyName = 'Switch';

export const States: Story = (): JSX.Element => (
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

export const Availability: Story = (): JSX.Element => (
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

export const Sizes: Story = (): JSX.Element => (
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
