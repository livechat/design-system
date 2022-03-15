import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { Search as SearchComonent, ISearchProps } from '../components/Search';

export default {
  title: 'Components/Search',
  component: SearchComonent,
} as ComponentMeta<typeof SearchComonent>;

const StoryTemplate: Story<ISearchProps> = (args: ISearchProps) => (
  <div style={{ width: 300 }}>
    <SearchComonent {...args} />
  </div>
);

export const Search = StoryTemplate.bind({});
Search.args = {
  onChange: (v) => console.log(v),
};
