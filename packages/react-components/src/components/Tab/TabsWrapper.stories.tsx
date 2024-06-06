import * as React from 'react';

import { Meta } from '@storybook/react';

import { Tab } from './Tab';
import { TabsList, TabsWrapper as TabsWrapperComponenet } from './TabsWrapper';

export default {
  title: 'Components/Tabs',
  component: TabsWrapperComponenet,
} as Meta<typeof TabsWrapperComponenet>;

interface ITabArgs {
  items: {
    id: string;
    title: string;
    count: number;
    asBadge?: boolean;
    isDisabled?: boolean;
  }[];
}

export const TabsWrapper = ({ items }: ITabArgs): React.ReactElement => {
  const [selectedTab, setSelectedTab] = React.useState(items[0].id);

  return (
    <TabsWrapperComponenet>
      <TabsList>
        {items.map(({ id, title, count, asBadge, isDisabled }) => (
          <Tab
            key={id}
            count={count}
            isSelected={selectedTab === id}
            disabled={isDisabled}
            asBadge={asBadge}
            onClick={() => !isDisabled && setSelectedTab(id)}
          >
            {title}
          </Tab>
        ))}
      </TabsList>
    </TabsWrapperComponenet>
  );
};

TabsWrapper.args = {
  items: [
    { id: 'agents', title: 'Agents', count: 1 },
    { id: 'groups', title: 'Groups', count: 3 },
    { id: 'bots', title: 'Bots', count: 2 },
  ],
} as ITabArgs;
