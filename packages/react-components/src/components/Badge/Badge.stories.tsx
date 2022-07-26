import * as React from 'react';
import { Story } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Badge, BadgeProps } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
};

export const Default: Story<BadgeProps> = (
  args: BadgeProps
): React.ReactElement => <Badge {...args} />;

Default.storyName = 'Badge';
Default.args = {
  children: '1',
};

export const Sizes = (): JSX.Element => (
  <>
    <StoryDescriptor title="Compact">
      <Badge size="compact">1</Badge>
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Badge size="medium">1</Badge>
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Badge size="large">1</Badge>
    </StoryDescriptor>
  </>
);

export const Kinds = (): JSX.Element => (
  <>
    <StoryDescriptor title="Primary">
      <Badge kind="primary">1</Badge>
    </StoryDescriptor>
    <StoryDescriptor title="Secondary">
      <Badge kind="secondary">1</Badge>
    </StoryDescriptor>
    <StoryDescriptor title="Tertiary">
      <Badge kind="tertiary">1</Badge>
    </StoryDescriptor>
  </>
);

export const Types = (): JSX.Element => (
  <>
    <StoryDescriptor title="Content">
      <Badge type="content">3 steps left</Badge>
    </StoryDescriptor>
    <StoryDescriptor title="Alert">
      <Badge type="alert" />
    </StoryDescriptor>
    <StoryDescriptor title="Dot">
      <Badge type="dot" />
    </StoryDescriptor>
  </>
);
