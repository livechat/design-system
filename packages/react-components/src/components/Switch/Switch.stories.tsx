import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { Switch, SwitchProps } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: Story<SwitchProps> = (args: SwitchProps) => (
  <Switch {...args} />
);

const basicWithoutStateHandler: Partial<SwitchProps> = {
  onChange: undefined,
};

export const BasicSize = Template.bind({});
BasicSize.args = { ...basicWithoutStateHandler, size: 'basic' };

export const CompactSize = Template.bind({});
CompactSize.args = { ...basicWithoutStateHandler, size: 'compact' };

export const EnabledOn = Template.bind({});
EnabledOn.args = { ...basicWithoutStateHandler, on: true };

export const EnabledOff = Template.bind({});
EnabledOff.args = { ...basicWithoutStateHandler, on: false };

export const DisabledOn = Template.bind({});
DisabledOn.args = { ...basicWithoutStateHandler, on: true, disabled: true };

export const DisabledOff = Template.bind({});
DisabledOff.args = { ...basicWithoutStateHandler, on: false, disabled: true };
