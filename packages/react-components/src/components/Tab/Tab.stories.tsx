import * as React from 'react';

import { Smiles } from '@livechat/design-system-icons';
import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Icon } from '../Icon';

import { Tab as TabComponent, TabProps } from './Tab';

export default {
  title: 'Components/Tabs',
  component: TabComponent,
} as Meta<typeof TabComponent>;

type ITabArgs = TabProps;

export const Tab = (args: ITabArgs): React.ReactElement => {
  return <TabComponent {...args} />;
};

Tab.args = {
  children: 'Tab',
  count: 1,
} as ITabArgs;

export const StatesAndVariants = (): React.ReactElement => (
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
    <StoryDescriptor title="With icon">
      <Tab icon={<Icon source={Smiles} />}>Tab</Tab>
      <Tab icon={<Icon source={Smiles} />} isSelected>
        Tab selected
      </Tab>
      <Tab icon={<Icon source={Smiles} />} disabled>
        Tab disabled
      </Tab>
    </StoryDescriptor>
    <StoryDescriptor title="With icon and counter">
      <Tab count={3} icon={<Icon source={Smiles} />}>
        Tab
      </Tab>
      <Tab count={3} icon={<Icon source={Smiles} />} isSelected>
        Tab selected
      </Tab>
      <Tab count={3} icon={<Icon source={Smiles} />} disabled>
        Tab disabled
      </Tab>
    </StoryDescriptor>
  </>
);

export const Sizes = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Compact">
      <Tab count={3} icon={<Icon source={Smiles} />} size="compact">
        Tab
      </Tab>
      <Tab count={3} icon={<Icon source={Smiles} />} size="compact" isSelected>
        Tab selected
      </Tab>
      <Tab count={3} icon={<Icon source={Smiles} />} size="compact" disabled>
        Tab disabled
      </Tab>
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Tab count={3} icon={<Icon source={Smiles} />} size="medium">
        Tab
      </Tab>
      <Tab count={3} icon={<Icon source={Smiles} />} size="medium" isSelected>
        Tab selected
      </Tab>
      <Tab count={3} icon={<Icon source={Smiles} />} size="medium" disabled>
        Tab disabled
      </Tab>
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Tab count={3} icon={<Icon source={Smiles} />} size="large">
        Tab
      </Tab>
      <Tab count={3} icon={<Icon source={Smiles} />} size="large" isSelected>
        Tab selected
      </Tab>
      <Tab count={3} icon={<Icon source={Smiles} />} size="large" disabled>
        Tab disabled
      </Tab>
    </StoryDescriptor>
  </>
);
