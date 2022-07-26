import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import {
  SearchInput as SearchComponent,
  ISearchInputProps,
  SearchSize,
} from './Search';

const commonWidth: React.CSSProperties = { width: 300 };

export default {
  title: 'Components/Search',
  component: SearchComponent,
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof SearchComponent>;

const StoryTemplate: Story<ISearchInputProps> = (args: ISearchInputProps) => (
  <div style={commonWidth}>
    <SearchComponent {...args} />
  </div>
);

export const Search = StoryTemplate.bind({});
Search.args = {};

export const States = (args: ISearchInputProps): React.ReactElement => (
  <div style={commonWidth}>
    <StoryDescriptor title="Basic">
      <SearchComponent {...args} />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <SearchComponent {...args} isDisabled />
    </StoryDescriptor>
    <StoryDescriptor title="Loading">
      <SearchComponent {...args} isLoading />
    </StoryDescriptor>
    <StoryDescriptor title="Collapsible">
      <SearchComponent {...args} isCollapsable />
    </StoryDescriptor>
  </div>
);

States.args = {};

export const Sizes = (args: ISearchInputProps): React.ReactElement => (
  <div style={commonWidth}>
    <StoryDescriptor title="Compact">
      <SearchComponent {...args} size={SearchSize.Compact} />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <SearchComponent {...args} size={SearchSize.Medium} />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <SearchComponent {...args} size={SearchSize.Large} />
    </StoryDescriptor>
  </div>
);

Sizes.args = {};

export const WithDefaultValue = StoryTemplate.bind({});
WithDefaultValue.args = {
  value: 'Default value',
};

export const WithCustomPlaceholder = StoryTemplate.bind({});
WithCustomPlaceholder.args = {
  placeholder: 'Custom placeholder',
};
