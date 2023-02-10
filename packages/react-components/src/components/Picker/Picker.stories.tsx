import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { IPickerProps, Picker } from './Picker';
import { defaultExtendedOptions, defaultOptions } from './constants';
import { IPickerListItem } from './PickerList';

import './Picker.stories.css';
import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

export default {
  title: 'Components/Picker',
  component: Picker,
  parameters: {
    componentSubtitle: `TBD`,
  },
  argTypes: {
    onSelect: { action: 'changed' },
  },
} as ComponentMeta<typeof Picker>;

const commonWidth: React.CSSProperties = { width: 300 };

const PickerComponent = (args: IPickerProps) => {
  const [selectedItems, setSelectedItems] = React.useState<
    IPickerListItem[] | null
  >(args.selected || null);

  return (
    <Picker
      {...args}
      selected={selectedItems}
      onSelect={(items) => setSelectedItems(items)}
    />
  );
};

const StoryTemplate: Story<IPickerProps> = (args: IPickerProps) => {
  return (
    <div style={{ height: 320 }}>
      <PickerComponent {...args} />
    </div>
  );
};

export const Default = StoryTemplate.bind({});
Default.args = {
  options: defaultOptions,
};

export const States = (args: IPickerProps): React.ReactElement => (
  <div style={{ ...commonWidth, marginBottom: 100 }}>
    <StoryDescriptor title="Basic">
      <PickerComponent {...args} />
    </StoryDescriptor>
    <StoryDescriptor title="Multi select + Basic">
      <PickerComponent {...args} type="multi" />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <PickerComponent {...args} disabled />
    </StoryDescriptor>
    <StoryDescriptor title="Error">
      <PickerComponent {...args} error="Example text" />
    </StoryDescriptor>
    <StoryDescriptor title="Error + Disabled">
      <PickerComponent {...args} disabled error="Example text" />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled + Selected option">
      <PickerComponent
        {...args}
        disabled
        selected={[{ key: 'two', name: 'Option two' }]}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Multi select + Disabled + Selected option">
      <PickerComponent
        {...args}
        type="multi"
        disabled
        selected={[
          { key: 'two', name: 'Option two' },
          { key: 'three', name: 'Option three' },
        ]}
      />
    </StoryDescriptor>
  </div>
);
States.args = {
  options: defaultOptions,
  label: 'Example label',
};

export const PickerWithGroupedOptions = (
  args: IPickerProps
): React.ReactElement => (
  <div style={{ ...commonWidth, marginBottom: 320 }}>
    <PickerComponent {...args} />
  </div>
);
PickerWithGroupedOptions.args = {
  options: defaultExtendedOptions,
};

const CustomPickerOption: React.FC = ({ children }) => (
  <div className="custom-picker-option">{children}</div>
);

export const PickerWithOptionsAsCustomElements = (
  args: IPickerProps
): React.ReactElement => (
  <div style={{ ...commonWidth, marginBottom: 320 }}>
    <StoryDescriptor title="Single select">
      <PickerComponent {...args} />
    </StoryDescriptor>
    <StoryDescriptor title="Multi select">
      <PickerComponent {...args} type="multi" />
    </StoryDescriptor>
  </div>
);
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
