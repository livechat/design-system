import { ComponentMeta } from '@storybook/react';
import { ReactElement, useState } from 'react';

import { Checkbox as CheckboxComponent, CheckboxProps } from './Checkbox';

export default {
  title: 'Forms/Checkbox',
  component: CheckboxComponent,
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof CheckboxComponent>;

export const Checkbox = (args: CheckboxProps): ReactElement => {
  const [checked, setChecked] = useState(true);

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
