import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Checkbox as CheckboxComponent, CheckboxProps } from './Checkbox';
import noop from '../../utils/noop';

export default {
  title: 'Forms/Checkbox',
  component: CheckboxComponent,
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof CheckboxComponent>;

export const Checkbox = (args: CheckboxProps): React.ReactElement => {
  return <CheckboxComponent {...args} onChange={noop} />;
};

Checkbox.args = {
  disabled: false,
  checked: true,
  description: 'Help text',
  children: 'Checkbox label',
};
