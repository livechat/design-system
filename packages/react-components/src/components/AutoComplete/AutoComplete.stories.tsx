import * as React from 'react';

import { StoryFn } from '@storybook/react';
import debounce from 'lodash.debounce';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { AutoComplete } from './AutoComplete';
import { AutoCompleteProps } from './types';

const placeholderText = 'Placeholder text';
export default {
  title: 'Forms/AutoComplete',
  component: AutoComplete,
  argTypes: {
    onChange: {
      description: 'The event handler for onChange',
      action: 'changed',
    },
    icon: {
      control: false,
    },
    readOnly: {
      type: 'boolean',
    },
    description:
      'Options that will be displayed in the picker. If they are strings, they will be converted to `IPickerListItem[]`',
    table: {
      type: {
        summary: 'IAutoCompleteListItem[] | string[]',
      },
    },
    alwaysShowAllOptions: {
      description:
        'If true, disables filtering of the options. Useful for getting options from an external source.',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    autocompleteOpenOnInit: {
      description:
        'If true, the autocomplete list will be open when the component mounts.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    single: {
      description: 'If true, only shows the first matching item.',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    hideIfExactMatch: {
      description:
        'If true, the option list will be hidden if there is only one option and it is an exact match to the input value.',
      table: {
        defaultValue: { summary: 'true' },
      },
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default: StoryFn<AutoCompleteProps> = (
  args: AutoCompleteProps
) => <AutoComplete {...args} />;

Default.storyName = 'AutoComplete';
Default.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
  placeholder: placeholderText,
};

export const Examples = (): React.ReactElement => {
  const [value, setValue] = React.useState('');
  const createOptions = (count: number, text?: string) =>
    Array.from(
      { length: count },
      (_, i) => `${(text || 'a').repeat(i + 1) || ''}`
    );

  const [options, setOptions] = React.useState(createOptions(10));

  // This could be a call to an API
  const generateOptions = debounce((text: string): void => {
    setOptions(createOptions(10, text));
  }, 1000);

  return (
    <>
      <StoryDescriptor title="Static options">
        <AutoComplete
          options={['Option 1', 'Option 2', 'Option 3']}
          placeholder={placeholderText}
        />
      </StoryDescriptor>
      <StoryDescriptor title="Custom static options (via IAutoCompleteListItem API)">
        <AutoComplete
          options={[
            {
              name: 'O1',
              secondaryText: 'Option 1',
            },
          ]}
          placeholder={placeholderText}
        />
      </StoryDescriptor>
      <StoryDescriptor title="Custom static options with custom element (via IAutoCompleteListItem API)">
        <AutoComplete
          options={[
            {
              name: 'Option-1',
              customElement: <i>option-1</i>,
            },
          ]}
          placeholder={placeholderText}
        />
      </StoryDescriptor>
      <StoryDescriptor title="Controlled input">
        <AutoComplete
          options={createOptions(10)}
          placeholder={placeholderText}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </StoryDescriptor>
      <StoryDescriptor title="All options always visible">
        <AutoComplete
          options={options}
          placeholder={'user+number@text.com'}
          alwaysShowAllOptions
          onChange={(e) => generateOptions(e.target.value)}
        />
      </StoryDescriptor>
      <StoryDescriptor title="Open on init">
        <AutoComplete
          options={createOptions(10)}
          placeholder={placeholderText}
          autocompleteOpenOnInit
        />
      </StoryDescriptor>
      <StoryDescriptor title="Single option">
        <AutoComplete
          options={[
            'adam.kowalski@text.com',
            'adam.kowalski+1@text.com',
            'jerzy.kiler@text.com',
          ]}
          placeholder={placeholderText}
          single
        />
      </StoryDescriptor>
      <StoryDescriptor title="Don't hide exact matches">
        <AutoComplete
          options={['Option 1']}
          placeholder={placeholderText}
          hideIfExactMatch={false}
        />
      </StoryDescriptor>
    </>
  );
};
