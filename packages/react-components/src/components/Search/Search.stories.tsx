import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { SearchInput, ISearchInputProps } from './Search';

const commonWidth: React.CSSProperties = { width: 300 };

export default {
  title: 'Components/Search',
  component: SearchInput,
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof SearchInput>;

const SearchInputComponent = (args: ISearchInputProps) => {
  const [value, setValue] = React.useState(args.value || '');
  return <SearchInput {...args} value={value} onChange={setValue} />;
};

const StoryTemplate: Story<ISearchInputProps> = (args: ISearchInputProps) => {
  return <SearchInputComponent {...args} />;
};

export const Search = StoryTemplate.bind({});
Search.args = {};

export const States = (args: ISearchInputProps): React.ReactElement => (
  <div style={commonWidth}>
    <StoryDescriptor title="Basic">
      <SearchInputComponent {...args} />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <SearchInputComponent {...args} isDisabled />
    </StoryDescriptor>
    <StoryDescriptor title="Loading">
      <SearchInputComponent {...args} value="Example text" isLoading />
    </StoryDescriptor>
    <StoryDescriptor title="Loading + Disabled">
      <SearchInputComponent
        {...args}
        value="Example text"
        isLoading
        isDisabled
      />
    </StoryDescriptor>
  </div>
);

States.args = {};

export const Sizes = (args: ISearchInputProps): React.ReactElement => (
  <div style={commonWidth}>
    <StoryDescriptor title="Compact">
      <SearchInputComponent {...args} size="compact" />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <SearchInputComponent {...args} size="medium" />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <SearchInputComponent {...args} size="large" />
    </StoryDescriptor>
  </div>
);

Sizes.args = {};

export const CollapsableSearch = (
  args: ISearchInputProps
): React.ReactElement => (
  <div>
    <SearchInputComponent {...args} isCollapsable />
  </div>
);

CollapsableSearch.args = {};
