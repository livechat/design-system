import * as React from 'react';

import { StoryFn } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Badge } from './Badge';
import { IBadgeProps } from './types';

export default {
  title: 'Components/Badge/Badge',
  component: Badge,
};

export const Default: StoryFn<IBadgeProps> = (
  args: IBadgeProps
): React.ReactElement => <Badge {...args} />;

Default.storyName = 'Badge';
Default.args = {
  count: 1,
};

export const Sizes = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Compact">
      <Badge size="compact" count={1} />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Badge size="medium" count={1} />
    </StoryDescriptor>
    <StoryDescriptor title="Large (deprecated)">
      <Badge size="large" count={1} />
    </StoryDescriptor>
  </>
);

export const Kinds = (): React.ReactElement => (
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

export const Types = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Count">
      <Badge type="counter" count={1} />
      <Badge type="counter" count={7} />
      <Badge type="counter" count={13} />
    </StoryDescriptor>
    <StoryDescriptor title="Count with default max limit">
      <Badge type="counter" count={100} />
    </StoryDescriptor>
    <StoryDescriptor title="Count with custom max limit">
      <Badge type="counter" count={6} max={5} />
    </StoryDescriptor>
    <StoryDescriptor title="Alert">
      <Badge type="alert" />
    </StoryDescriptor>
    <StoryDescriptor title="Dot (Deprecated)">
      <Badge type="dot" />
    </StoryDescriptor>
  </>
);
