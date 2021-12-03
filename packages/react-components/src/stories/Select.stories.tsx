import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  ISelectProps,
  Select as SelectComponent,
} from '../components/Select/Select';

export default {
  title: 'Components/Select',
  component: SelectComponent,
  parameters: {
    componentSubtitle: `
    A select allows users to choose one option from a list of items. 
    Use it when you have >4 options. A select can allow users to search 
    through a list of choices. When the user types in the input, suggestions 
    are provided. When an item is selected, it appears highlighted, has a 
    check mark and the primary color. The selected item replaces the input 
    placeholder.
    `,
  },
} as ComponentMeta<typeof SelectComponent>;

const StoryTemplate: Story<ISelectProps> = (args: ISelectProps) => {
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleItemSelect = (item) => setSelectedItem(item);

  const getItemBody = (props) => {
    if (!props) {
      return null;
    }
    return <div id={props.value}>{props.name}</div>;
  };

  const getSelectedItemBody = (props) => {
    return <div id={props.value}>{props.name}</div>;
  };

  return (
    <div style={{ width: 320 }}>
      <SelectComponent
        {...args}
        onItemSelect={handleItemSelect}
        selected={selectedItem}
        getItemBody={getItemBody}
        getSelectedItemBody={getSelectedItemBody}
      />
    </div>
  );
};

export const Select = StoryTemplate.bind({});
Select.args = {
  id: 'select-example',
  items: [
    { key: '1', props: { name: 'option 1', value: '1' } },
    { key: '2', props: { name: 'option 2', value: '2' } },
    { key: '3', props: { name: 'option 3', value: '3' } },
    { key: '4', props: { name: 'option 4', value: '4' } },
    { key: '5', props: { name: 'option 5', value: '5' } },
    { key: '6', props: { name: 'option 6', value: '6' } },
    { key: '7', props: { name: 'option 7', value: '7' } },
    { key: '8', props: { name: 'option 8', value: '8' } },
  ],
  searchProperty: 'name',
  search: true,
  placeholder: 'Select option',
  searchPlaceholder: 'Search...',
};
