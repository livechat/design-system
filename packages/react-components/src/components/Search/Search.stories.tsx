import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { Search as SearchComonent, ISearchProps, SearchSize } from './Search';

export default {
  title: 'Components/Search',
  component: SearchComonent,
} as ComponentMeta<typeof SearchComonent>;

const containerStyles = { width: 300, marginBottom: 15 };
const textStyles = { marginBottom: 5, fontSize: 15 };

const StoryTemplate: Story<ISearchProps> = (args: ISearchProps) => (
  <div style={{ width: 300 }}>
    <SearchComonent {...args} />
  </div>
);

export const Search = StoryTemplate.bind({});
Search.args = {
  onChange: (v) => console.log(v),
};

export const states = (args: ISearchProps): React.ReactElement => (
  <div>
    <div style={containerStyles}>
      <div style={textStyles}>Basic</div>
      <SearchComonent {...args} />
    </div>
    <div style={containerStyles}>
      <div style={textStyles}>Disabled</div>
      <SearchComonent {...args} isDisabled />
    </div>
    <div style={containerStyles}>
      <div style={textStyles}>Loading</div>
      <SearchComonent {...args} isLoading />
    </div>
    <div style={containerStyles}>
      <div style={textStyles}>Collapsable</div>
      <SearchComonent {...args} isCollapsable />
    </div>
  </div>
);

states.args = {
  onChange: (v: string) => console.log(v),
};

export const sizes = (args: ISearchProps): React.ReactElement => (
  <div>
    <div style={containerStyles}>
      <div style={textStyles}>Compact</div>
      <SearchComonent {...args} size={SearchSize.Compact} />
    </div>
    <div style={containerStyles}>
      <div style={textStyles}>Medium</div>
      <SearchComonent {...args} size={SearchSize.Medium} />
    </div>
    <div style={containerStyles}>
      <div style={textStyles}>Large</div>
      <SearchComonent {...args} size={SearchSize.Large} />
    </div>
  </div>
);

sizes.args = {
  onChange: (v: string) => console.log(v),
};

export const WithDefaultValue = StoryTemplate.bind({});
WithDefaultValue.args = {
  value: 'Default value',
  onChange: (v: string) => console.log(v),
};

export const WithCustomPlaceholder = StoryTemplate.bind({});
WithCustomPlaceholder.args = {
  placeholder: 'Custom placeholder',
  onChange: (v: string) => console.log(v),
};

export const WithControlledSubmit = StoryTemplate.bind({});
WithControlledSubmit.args = {
  isControlledSubmit: true,
  onChange: (v: string) => alert(`Text submitted: ${v}`),
};
