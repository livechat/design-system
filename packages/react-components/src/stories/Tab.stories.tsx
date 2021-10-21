import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Tab as TabComponent, ITabProps } from '../components/Tab';

export default {
  title: 'Components/Tab',
  component: TabComponent,
} as ComponentMeta<typeof TabComponent>;

type ITabArgs = ITabProps;

export const Tab = (args: ITabArgs): React.ReactElement => {
  return <TabComponent {...args} />;
};

Tab.args = {
  children: 'Lorem ipsum',
  description: '1',
} as ITabArgs;
