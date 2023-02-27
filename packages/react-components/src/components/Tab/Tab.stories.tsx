import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Tab as TabComponent, TabProps } from './Tab';
import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

export default {
  title: 'Components/Tabs',
  component: TabComponent,
} as ComponentMeta<typeof TabComponent>;

type ITabArgs = TabProps;

export const Tab = (args: ITabArgs): React.ReactElement => {
  return <TabComponent {...args} />;
};

Tab.args = {
  children: 'Tab',
  count: 1,
} as ITabArgs;

export const StatesAndVariants = (): JSX.Element => (
  <>
    <StoryDescriptor title="Basic">
      <Tab>Tab</Tab>
      <Tab isSelected>Tab selected</Tab>
      <Tab disabled>Tab disabled</Tab>
    </StoryDescriptor>
    <StoryDescriptor title="With counter">
      <Tab count={3}>Tab</Tab>
      <Tab count={3} isSelected>
        Tab selected
      </Tab>
      <Tab count={3} disabled>
        Tab disabled
      </Tab>
    </StoryDescriptor>
    <StoryDescriptor title="With counter as badge">
      <Tab count={3} asBadge>
        Tab
      </Tab>
      <Tab count={3} asBadge isSelected>
        Tab selected
      </Tab>
      <Tab count={3} asBadge disabled>
        Tab disabled
      </Tab>
    </StoryDescriptor>
  </>
);

export const Sizes = (): JSX.Element => (
  <>
    <StoryDescriptor title="Compact">
      <Tab size="compact">Tab</Tab>
      <Tab size="compact" isSelected>
        Tab selected
      </Tab>
      <Tab size="compact" disabled>
        Tab disabled
      </Tab>
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Tab size="medium">Tab</Tab>
      <Tab size="medium" isSelected>
        Tab selected
      </Tab>
      <Tab size="medium" disabled>
        Tab disabled
      </Tab>
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Tab size="large" asBadge>
        Tab
      </Tab>
      <Tab size="large" asBadge isSelected>
        Tab selected
      </Tab>
      <Tab size="large" asBadge disabled>
        Tab disabled
      </Tab>
    </StoryDescriptor>
  </>
);
