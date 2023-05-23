import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Checkbox as CheckboxComponent, CheckboxProps } from './Checkbox';

export default {
  title: 'Forms/Checkbox',
  component: CheckboxComponent,
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof CheckboxComponent>;

export const Checkbox = (args: CheckboxProps): React.ReactElement => {
  const [checked, setChecked] = React.useState(true);

  return (
    <CheckboxComponent
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.currentTarget.checked)}
    />
  );
};

Checkbox.args = {
  disabled: false,
  description: 'Help text',
  children: 'Checkbox label',
};
