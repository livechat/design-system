import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

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
    <div className="spacer">
      <Switch on={true} />
      <Switch on={false} />
    </div>
    <div className="spacer">
      <Switch on={true} disabled={true} />
      <Switch on={false} disabled={true} />
    </div>
  </>
);

export const Sizes = (): JSX.Element => (
  <div className="spacer">
    <Switch size="basic" />
    <Switch size="compact" />
  </div>
);
