import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { Search as SearchComponent, ISearchProps, SearchSize } from './Search';

export default {
  title: 'Components/Search',
  component: SearchComponent,
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof SearchComponent>;

const containerStyles = { width: 300, marginBottom: 15 };
const textStyles = { marginBottom: 5, fontSize: 15 };

const StoryTemplate: Story<ISearchProps> = (args: ISearchProps) => (
  <div style={{ width: 300 }}>
    <SearchComponent {...args} />
  </div>
);

export const Search = StoryTemplate.bind({});
Search.args = {};

export const States = (args: ISearchProps): React.ReactElement => (
  <div>
    <div style={containerStyles}>
      <div style={textStyles}>Basic</div>
      <SearchComponent {...args} />
    </div>
    <div style={containerStyles}>
      <div style={textStyles}>Disabled</div>
      <SearchComponent {...args} isDisabled />
    </div>
    <div style={containerStyles}>
      <div style={textStyles}>Loading</div>
      <SearchComponent {...args} isLoading />
    </div>
    <div style={containerStyles}>
      <div style={textStyles}>Collapsable</div>
      <SearchComponent {...args} isCollapsable />
    </div>
  </div>
);

States.args = {};

export const Sizes = (args: ISearchProps): React.ReactElement => (
  <div>
    <div style={containerStyles}>
      <div style={textStyles}>Compact</div>
      <SearchComponent {...args} size={SearchSize.Compact} />
    </div>
    <div style={containerStyles}>
      <div style={textStyles}>Medium</div>
      <SearchComponent {...args} size={SearchSize.Medium} />
    </div>
    <div style={containerStyles}>
      <div style={textStyles}>Large</div>
      <SearchComponent {...args} size={SearchSize.Large} />
    </div>
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

export const WithControlledSubmit = StoryTemplate.bind({});
WithControlledSubmit.args = {
  isControlledSubmit: true,
};
