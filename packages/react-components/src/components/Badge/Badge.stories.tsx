import { Story } from '@storybook/react';
import * as React from 'react';
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
  <div className="spacer">
    <Badge size="compact">1</Badge>
    <Badge size="medium">1</Badge>
    <Badge size="large">1</Badge>
  </div>
);

export const Kinds = (): JSX.Element => (
  <div className="spacer">
    <Badge kind="primary">1</Badge>
    <Badge kind="secondary">1</Badge>
    <Badge kind="tertiary">1</Badge>
  </div>
);

export const Types = (): JSX.Element => (
  <div className="spacer">
    <Badge type="content">3 steps left</Badge>
    <Badge type="alert" />
    <Badge type="dot" />
  </div>
);
