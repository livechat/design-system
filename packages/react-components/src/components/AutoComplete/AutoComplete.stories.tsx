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
  parameters: {
    chromatic: { delay: 300 },
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
      <StoryDescriptor title="In a form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // eslint-disable-next-line no-console
            console.log('submit');
          }}
        >
          <AutoComplete options={options} placeholder={placeholderText} />
        </form>
      </StoryDescriptor>
    </>
  );
};
