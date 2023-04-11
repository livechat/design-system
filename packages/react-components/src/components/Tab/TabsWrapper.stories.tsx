import { ComponentMeta } from '@storybook/react';

import { TabsList, TabsWrapper as TabsWrapperComponenet } from './TabsWrapper';
import { Tab } from './Tab';
import { ReactElement, useState } from 'react';

export default {
  title: 'Components/Tabs',
  component: TabsWrapperComponenet,
} as ComponentMeta<typeof TabsWrapperComponenet>;

type ITabArgs = {
  items: Array<{
    id: string;
    title: string;
    count: number;
    asBadge?: boolean;
    isDisabled?: boolean;
  }>;
};

export const TabsWrapper = ({ items }: ITabArgs): ReactElement => {
  const [selectedTab, setSelectedTab] = useState(items[0].id);

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
