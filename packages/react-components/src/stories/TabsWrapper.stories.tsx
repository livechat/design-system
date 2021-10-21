import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  TabsList,
  TabsWrapper as TabsWrapperComponenet,
} from '../components/TabsWrapper';
import { Tab } from '../components/Tab';

export default {
  title: 'Components/Tabs Wrapper',
  component: TabsWrapperComponenet,
} as ComponentMeta<typeof TabsWrapperComponenet>;

type ITabArgs = {
  items: Array<{
    id: string;
    title: string;
    count: number;
  }>;
};

export const TabsWrapper = ({ items }: ITabArgs): React.ReactElement => {
  const [selectedTab, setSelectedTab] = React.useState(items[0].id);

  return (
    <TabsWrapperComponenet>
      <TabsList>
        {items.map(({ id, title, count }) => (
          <Tab
            key={id}
            description={count}
            isSelected={selectedTab === id}
            onClick={() => setSelectedTab(id)}
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
  ],
} as ITabArgs;
