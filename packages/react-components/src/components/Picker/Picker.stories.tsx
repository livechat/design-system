import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { IPickerProps, Picker as PickerComponent } from './Picker';
import { defaultExtendedOptions, defaultOptions } from './constants';
import { IPickerListItem } from './PickerList';

import './Picker.stories.css';

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
  options: defaultExtendedOptions,
  selectAllOptionText: 'Select all',
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
  options: defaultExtendedOptions,
  selectAllOptionText: 'Select all',
};

const CustomPickerOption: React.FC = ({ children }) => (
  <div className="custom-picker-option">{children}</div>
);

export const PickerWithOptionsAsCustomElements = StoryTemplate.bind({});
PickerWithOptionsAsCustomElements.args = {
  options: [
    {
      key: 'one',
      name: 'Example custom element one',
      customElement: {
        listItemBody: (
          <CustomPickerOption>
            <img
              className="image"
              src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
            />
            <div>
              <div className="title">Example custom element one</div>
              <div className="description">Example custom element</div>
            </div>
          </CustomPickerOption>
        ),
        selectedItemBody: (
          <CustomPickerOption>
            <img
              className="image selected"
              src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
            />
            <div className="title selected">Example custom element one</div>
          </CustomPickerOption>
        ),
      },
    },
    {
      key: 'two',
      name: 'Example custom element two',
      customElement: {
        listItemBody: (
          <CustomPickerOption>
            <img
              className="image"
              src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
            />
            <div>
              <div className="title">Example custom element two</div>
              <div className="description">Example custom element</div>
            </div>
          </CustomPickerOption>
        ),
        selectedItemBody: (
          <CustomPickerOption>
            <img
              className="image selected"
              src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
            />
            <div className="title selected">Example custom element two</div>
          </CustomPickerOption>
        ),
      },
    },
  ],
};

export const PickerInMultiselectModeWithOptionsAsCustomElements =
  StoryTemplate.bind({});
PickerInMultiselectModeWithOptionsAsCustomElements.args = {
  type: 'multi',
  options: [
    {
      key: 'one',
      name: 'Example custom element one',
      customElement: {
        listItemBody: (
          <CustomPickerOption>
            <img
              className="image"
              src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
            />
            <div>
              <div className="title">Example custom element one</div>
              <div className="description">Example custom element</div>
            </div>
          </CustomPickerOption>
        ),
        selectedItemBody: (
          <CustomPickerOption>
            <img
              className="image selected"
              src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
            />
            <div className="title selected">Example custom element one</div>
          </CustomPickerOption>
        ),
      },
    },
    {
      key: 'two',
      name: 'Example custom element two',
      customElement: {
        listItemBody: (
          <CustomPickerOption>
            <img
              className="image"
              src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
            />
            <div>
              <div className="title">Example custom element two</div>
              <div className="description">Example custom element</div>
            </div>
          </CustomPickerOption>
        ),
        selectedItemBody: (
          <CustomPickerOption>
            <img
              className="image selected"
              src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
            />
            <div className="title selected">Example custom element two</div>
          </CustomPickerOption>
        ),
      },
    },
  ],
};
