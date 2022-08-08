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
  count: 1,
};

export const Sizes = (): JSX.Element => (
  <>
    <StoryDescriptor title="Compact">
      <Badge size="compact" count={1} />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Badge size="medium" count={1} />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Badge size="large" count={1} />
    </StoryDescriptor>
  </>
);

export const Kinds = (): JSX.Element => (
  <>
    <StoryDescriptor title="Primary">
      <Badge kind="primary" count={1} />
    </StoryDescriptor>
    <StoryDescriptor title="Secondary">
      <Badge kind="secondary" count={1} />
    </StoryDescriptor>
    <StoryDescriptor title="Tertiary">
      <Badge kind="tertiary" count={1} />
    </StoryDescriptor>
  </>
);

export const Types = (): JSX.Element => (
  <>
    <StoryDescriptor title="Count">
      <Badge type="counter" count={1} />
    </StoryDescriptor>
    <StoryDescriptor title="Count with default limit">
      <Badge type="counter" count={100} />
    </StoryDescriptor>
    <StoryDescriptor title="Count with custom limit">
      <Badge type="counter" count={6} limit={5} />
    </StoryDescriptor>
    <StoryDescriptor title="Alert">
      <Badge type="alert" />
    </StoryDescriptor>
    <StoryDescriptor title="Dot">
      <Badge type="dot" />
    </StoryDescriptor>
  </>
);
