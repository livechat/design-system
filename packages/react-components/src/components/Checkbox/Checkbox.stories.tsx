import * as React from 'react';

import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Checkbox as CheckboxComponent, CheckboxProps } from './Checkbox';

export default {
  title: 'Forms/Checkbox',
  component: CheckboxComponent,
  argTypes: { onChange: { action: 'changed' } },
} as Meta<typeof CheckboxComponent>;

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
    <StoryDescriptor title="Indeterminate">
      <CheckboxComponent
        indeterminate={true}
        checked={false}
        description="Enabled"
      >
        Checkbox label
      </CheckboxComponent>
      <CheckboxComponent
        indeterminate={true}
        checked={false}
        description="Disabled"
        disabled
      >
        Checkbox label
      </CheckboxComponent>
    </StoryDescriptor>
  </>
);

const plainOptions = ['Apple', 'Pear'];

export const IndeterminateState = (): React.ReactElement => {
  const [checkedList, setCheckedList] = React.useState<string[]>(['Apple']);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    const target = e.target as HTMLInputElement;
    setCheckedList(target.checked ? plainOptions : []);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((item) => item !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  return (
    <>
      <CheckboxComponent
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </CheckboxComponent>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <CheckboxComponent
          defaultValue="Apple"
          checked={checkedList.includes('Apple')}
          onChange={handleOnChange}
        >
          Apple
        </CheckboxComponent>
        <CheckboxComponent
          defaultValue="Pear"
          checked={checkedList.includes('Pear')}
          onChange={handleOnChange}
        >
          Pear
        </CheckboxComponent>
      </div>
    </>
  );
};
