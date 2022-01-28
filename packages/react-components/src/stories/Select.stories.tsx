import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  ISelectProps,
  Select as SelectComponent,
} from '../components/Select/Select';
import { ISelectItem } from '../components/Select/interfaces';
import { Button } from '../components/Button';
import { Text } from '../components/Text';

export default {
  title: 'Components/Select',
  component: SelectComponent,
  argTypes: {
    labelAdornment: {
      description:
        'Specifies additional decorative element rendered at the end of the label',
    },
  },
  parameters: {
    componentSubtitle: `
    A select allows users to choose one Option from a list of items. 
    Use it when you have >4 Options. A select can allow users to search 
    through a list of choices. When the user types in the input, suggestions 
    are provided. When an item is selected, it appears highlighted, has a 
    check mark and the primary color. The selected item replaces the input 
    placeholder.
    `,
  },
} as ComponentMeta<typeof SelectComponent>;

const selectDefaultProps = {
  description: 'Helper text',
  items: [
    { key: '1', props: { name: 'Option one', value: '1' } },
    { key: '2', props: { name: 'Option two', value: '2' } },
    { key: '3', props: { name: 'Option three', value: '3' } },
    { key: '4', props: { name: 'Option four', value: '4' } },
    { key: '5', props: { name: 'Option five', value: '5' } },
    { key: '6', props: { name: 'Option six', value: '6' } },
    { key: '7', props: { name: 'Option seven', value: '7' } },
    { key: '8', props: { name: 'Option eight', value: '8' } },
  ],
  labelText: 'Select example',
  searchProperty: 'name',
  search: true,
  placeholder: 'Select option',
  searchPlaceholder: 'Search...',
};

interface ISelectArgs extends ISelectProps {
  controlledVisibility?: boolean;
  withEmptyState?: boolean;
}

const StoryTemplate: Story<ISelectProps> = (args: ISelectArgs) => {
  const [selectedItem, setSelectedItem] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchPhrase, setSearchPhrase] = React.useState('');

  const handleItemSelect = (itemKey: string) => setSelectedItem(itemKey);

  const getItemBody = (props: ISelectItem['props']) => {
    if (!props) {
      return null;
    }
    return <div id={props.value}>{props.name}</div>;
  };

  const getSelectedItemBody = (props) => {
    return (
      <Text size="md" as="div">
        <div id={props.value}>{props.name}</div>
      </Text>
    );
  };

  const getEmptyState = () => {
    return (
      <div
        style={{ width: '100%', padding: '14px 10px', boxSizing: 'border-box' }}
      >
        No search results for phrase "{searchPhrase}
        ". :(
        <br /> Please type something different.
      </div>
    );
  };

  const handleSearchPhraseChange = (phrase: string) => {
    setSearchPhrase(phrase);
  };

  return (
    <div style={{ width: 320 }}>
      {args.controlledVisibility && (
        <Button
          style={{ marginBottom: 15 }}
          onClick={() => setIsOpen(isOpen ? false : true)}
        >
          {isOpen ? 'Hide' : 'Show'}
        </Button>
      )}
      <SelectComponent
        {...args}
        isOpen={isOpen}
        onHeaderClick={(isOpen) => setIsOpen(isOpen)}
        onItemSelect={handleItemSelect}
        selected={selectedItem}
        getItemBody={getItemBody}
        getSelectedItemBody={getSelectedItemBody}
        searchEmptyState={args.withEmptyState && getEmptyState()}
        onSearchPhraseChange={(phrase: string) =>
          args.withEmptyState && handleSearchPhraseChange(phrase)
        }
      />
    </div>
  );
};

export const Select = StoryTemplate.bind({});
Select.args = {
  id: 'select-example-1',
  ...selectDefaultProps,
};

export const SelectDisabled = StoryTemplate.bind({});
SelectDisabled.args = {
  id: 'select-example-2',
  ...selectDefaultProps,
  disabled: true,
};

export const SelectControlledVisibility = StoryTemplate.bind({});
SelectControlledVisibility.args = {
  id: 'select-example-3',
  ...selectDefaultProps,
  controlledVisibility: true,
} as ISelectArgs;

export const SelectSearchEmptyState = StoryTemplate.bind({});
SelectSearchEmptyState.args = {
  id: 'select-example-4',
  ...selectDefaultProps,
  withEmptyState: true,
} as ISelectArgs;
