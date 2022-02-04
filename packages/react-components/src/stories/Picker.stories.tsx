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
  // parameters: {
  //   componentSubtitle: `
  //   A select allows users to choose one Option from a list of items.
  //   Use it when you have >4 Options. A select can allow users to search
  //   through a list of choices. When the user types in the input, suggestions
  //   are provided. When an item is selected, it appears highlighted, has a
  //   check mark and the primary color. The selected item replaces the input
  //   placeholder.
  //   `,
  // },
} as ComponentMeta<typeof PickerComponent>;

const StoryTemplate: Story<IPickerProps> = (args: IPickerProps) => {
  return (
    <div style={{ width: 320 }}>
      <PickerComponent {...args} />
    </div>
  );
};

export const Picker = StoryTemplate.bind({});
Picker.args = {
  size: TriggerSize.Small,
};
