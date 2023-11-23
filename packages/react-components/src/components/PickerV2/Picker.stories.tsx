import * as React from 'react';

import { ComponentMeta, Story } from '@storybook/react';

import { DEFAULT_PICKER_OPTIONS } from '../Picker/constants';

import { Picker } from './Picker';
import { IPickerListItem, IPickerProps } from './types';

export default {
  title: 'Components/PickerV2',
  component: Picker,
  argTypes: {
    options: {
      control: false,
    },
    selected: {
      control: false,
    },
    onSelect: { action: 'changed' },
  },
} as ComponentMeta<typeof Picker>;

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
    <div style={{ height: 320, width: 300 }}>
      <PickerComponent {...args} />
    </div>
  );
};

export const Default = StoryTemplate.bind({});
Default.args = {
  options: DEFAULT_PICKER_OPTIONS,
  openedOnInit: true,
  type: 'multi',
};
