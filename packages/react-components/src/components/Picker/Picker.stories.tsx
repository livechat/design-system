import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { IPickerProps, Picker as PickerComponent } from './Picker';
import { defaultExtendedOptions, defaultOptions } from './constants';
import { IPickerListItem } from './PickerList';

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
  const [selectedItems, setSelectedItems] = React.useState<
    IPickerListItem[] | null
  >(args.selected || null);

  return (
    <div style={{ height: 320 }}>
      <PickerComponent
        {...args}
        selected={selectedItems}
        onSelect={(items) => setSelectedItems(items)}
      />
    </div>
  );
};

export const Picker = StoryTemplate.bind({});
Picker.args = {
  options: defaultOptions,
};

export const PickerWithLabel = StoryTemplate.bind({});
PickerWithLabel.args = {
  options: defaultOptions,
  label: 'Picker',
};

export const PickerWithError = StoryTemplate.bind({});
PickerWithError.args = {
  options: defaultOptions,
  error: 'Error message',
};

export const DisabledPicker = StoryTemplate.bind({});
DisabledPicker.args = {
  options: defaultOptions,
  disabled: true,
};

export const PickerWithGroupedOptions = StoryTemplate.bind({});
PickerWithGroupedOptions.args = {
  options: defaultExtendedOptions,
};

export const PickerWithDisabledSearch = StoryTemplate.bind({});
PickerWithDisabledSearch.args = {
  searchDisabled: true,
  options: defaultExtendedOptions,
};

export const PickerWithSelectedOption = StoryTemplate.bind({});
PickerWithSelectedOption.args = {
  selected: [{ key: 'two', name: 'Option two' }],
  options: defaultExtendedOptions,
};

export const PickerInMultiselectMode = StoryTemplate.bind({});
PickerInMultiselectMode.args = {
  type: 'multi',
  options: [
    { key: 'select-all', name: 'Select all', selectAllOption: true },
    ...defaultExtendedOptions,
  ],
};

export const PickerInMultiselectModeWithSelectedOptions = StoryTemplate.bind(
  {}
);
PickerInMultiselectModeWithSelectedOptions.args = {
  selected: [
    { key: 'two', name: 'Option two' },
    { key: 'four', name: 'Option four' },
  ],
  type: 'multi',
  options: [
    { key: 'select-all', name: 'Select all', selectAllOption: true },
    ...defaultExtendedOptions,
  ],
};
