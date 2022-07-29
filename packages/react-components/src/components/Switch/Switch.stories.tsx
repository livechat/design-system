import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Switch, SwitchProps } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

export const Default: Story<SwitchProps> = (args: SwitchProps) => (
  <Switch {...args} onChange={undefined} />
);
Default.storyName = 'Switch';

export const States = (): JSX.Element => (
  <>
    <StoryDescriptor title="Enabled">
      <Switch on={true} />
      <Switch on={false} />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <Switch on={true} disabled={true} />
      <Switch on={false} disabled={true} />
    </StoryDescriptor>
    <StoryDescriptor title="Loading">
      <Switch on={true} loading={true} disabled={true} />
      <Switch on={false} loading={true} disabled={true} />
    </StoryDescriptor>
  </>
);

export const Sizes = (): JSX.Element => (
  <>
    <StoryDescriptor title="Compact">
      <Switch size="compact" />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Switch size="medium" />
    </StoryDescriptor>
    <StoryDescriptor title="Basic">
      <Switch size="basic" />
    </StoryDescriptor>
  </>
);
