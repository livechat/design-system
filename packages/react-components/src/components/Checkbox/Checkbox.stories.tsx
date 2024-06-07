import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Checkbox as CheckboxComponent, CheckboxProps } from './Checkbox';

export default {
  title: 'Forms/Checkbox',
  component: CheckboxComponent,
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof CheckboxComponent>;

export const Checkbox = (args: CheckboxProps): React.ReactElement => {
  const [checked, setChecked] = React.useState(args.checked);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChecked(e.target.checked);

  return (
    <CheckboxComponent {...args} checked={checked} onChange={handleOnChange} />
  );
};

Checkbox.args = {
  disabled: false,
  checked: true,
  description: 'Help text',
  children: 'Checkbox label',
};

export const States = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Checked">
      <CheckboxComponent checked description="Enabled">
        Checkbox label
      </CheckboxComponent>
      <CheckboxComponent checked description="Disabled" disabled>
        Checkbox label
      </CheckboxComponent>
    </StoryDescriptor>
    <StoryDescriptor title="Unchecked">
      <CheckboxComponent checked={false} description="Enabled">
        Checkbox label
      </CheckboxComponent>
      <CheckboxComponent checked={false} description="Disabled" disabled>
        Checkbox label
      </CheckboxComponent>
    </StoryDescriptor>
  </>
);
