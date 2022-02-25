import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  IPickerProps,
  Picker as PickerComponent,
} from '../components/Picker/Picker';
import { TriggerSize } from '../components/Picker/Trigger';

export default {
  title: 'Components/Picker',
  component: PickerComponent,
  parameters: {
    componentSubtitle: `TBD`,
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
  options: [
    { key: 'one', name: 'Option one' },
    { key: 'two', name: 'Option two' },
    { key: 'three', name: 'Option three' },
    { key: 'four', name: 'Option four' },
    { key: 'five', name: 'Option five' },
    { key: 'six', name: 'Option six', disabled: true },
    { key: 'seven', name: 'Option seven', disabled: true },
  ],
  size: TriggerSize.Medium,
  label: 'Picker',
  onSelect: (item) => console.log(item),
};
