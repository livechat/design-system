import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Tab as TabComponent, TabProps } from './Tab';

export default {
  title: 'Components/Tabs',
  component: TabComponent,
} as ComponentMeta<typeof TabComponent>;

type ITabArgs = TabProps;

export const Tab = (args: ITabArgs): React.ReactElement => {
  return <TabComponent {...args} />;
};

Tab.args = {
  children: 'Lorem ipsum',
  description: '1',
} as ITabArgs;
