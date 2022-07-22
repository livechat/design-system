import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { IPickerProps, Picker as PickerComponent } from './Picker';

export default {
  title: 'Components/Picker',
  component: PickerComponent,
  parameters: {
    componentSubtitle: `TBD`,
  },
  argTypes: {
    onSelect: { action: 'changed' },
  },
} as ComponentMeta<typeof PickerComponent>;

const StoryTemplate: Story<IPickerProps> = (args: IPickerProps) => {
  return (
    <div style={{ height: 320 }}>
      <PickerComponent {...args} />
    </div>
  );
};

export const Picker = StoryTemplate.bind({});
Picker.args = {
  multiselect: true,
  options: [
    { key: 'one', name: 'Option one' },
    { key: 'two', name: 'Option two' },
    { key: 'three', name: 'Option three' },
    { key: 'four', name: 'Option four' },
    { key: 'five', name: 'Option five' },
    { key: 'six', name: 'Option six' },
    { key: 'seven', name: 'Option seven' },
    { key: 'eight', name: 'Option eight' },
    { key: 'nine', name: 'Option nine' },
    { key: 'ten', name: 'Option ten' },
  ],
};

export const PickerWithLabel = StoryTemplate.bind({});
PickerWithLabel.args = {
  options: [
    { key: 'one', name: 'Option one' },
    { key: 'two', name: 'Option two' },
    { key: 'three', name: 'Option three' },
    { key: 'four', name: 'Option four' },
    { key: 'five', name: 'Option five' },
    { key: 'six', name: 'Option six' },
    { key: 'seven', name: 'Option seven' },
  ],
  label: 'Picker',
};

export const PickerWithError = StoryTemplate.bind({});
PickerWithError.args = {
  options: [
    { key: 'one', name: 'Option one' },
    { key: 'two', name: 'Option two' },
    { key: 'three', name: 'Option three' },
    { key: 'four', name: 'Option four' },
    { key: 'five', name: 'Option five' },
    { key: 'six', name: 'Option six' },
    { key: 'seven', name: 'Option seven' },
  ],
  error: 'Error message',
};

export const DisabledPicker = StoryTemplate.bind({});
DisabledPicker.args = {
  options: [
    { key: 'one', name: 'Option one' },
    { key: 'two', name: 'Option two' },
    { key: 'three', name: 'Option three' },
    { key: 'four', name: 'Option four' },
    { key: 'five', name: 'Option five' },
    { key: 'six', name: 'Option six' },
    { key: 'seven', name: 'Option seven' },
  ],
  disabled: true,
};

export const PickerWithGroupedOptions = StoryTemplate.bind({});
PickerWithGroupedOptions.args = {
  options: [
    { key: 'groupA', name: 'Group A title header', groupHeader: true },
    { key: 'one', name: 'Option one' },
    { key: 'two', name: 'Option two' },
    { key: 'three', name: 'Option three' },
    { key: 'groupB', name: 'Group B title header', groupHeader: true },
    { key: 'four', name: 'Option four' },
    { key: 'five', name: 'Option five' },
    { key: 'six', name: 'Option six', disabled: true },
    { key: 'seven', name: 'Option seven', disabled: true },
  ],
};
