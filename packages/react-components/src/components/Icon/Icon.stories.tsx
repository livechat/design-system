import * as React from 'react';

import * as TablerIcons from '@livechat/design-system-icons';
import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Icon, IconProps } from './Icon';

const iterator = Object.keys(TablerIcons);

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    source: {
      options: iterator,
      mapping: TablerIcons,
      control: {
        type: 'select',
        labels: iterator,
      },
    },
    size: {
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    kind: {
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
  },
} as Meta<typeof Icon>;

export const Default = (args: IconProps): React.ReactElement => (
  <div style={{ width: '300px' }}>
    <Icon {...args} />
  </div>
);

Default.args = {
  source: TablerIcons.EmailLetter,
  size: 'medium',
  kind: 'primary',
  disabled: false,
};

export const Sizes = (): React.ReactElement => (
  <div>
    <StoryDescriptor title="xsmall">
      <Icon source={TablerIcons.EmailLetter} size="xsmall" />
    </StoryDescriptor>
    <StoryDescriptor title="small">
      <Icon source={TablerIcons.EmailLetter} size="small" />
    </StoryDescriptor>
    <StoryDescriptor title="medium">
      <Icon source={TablerIcons.EmailLetter} size="medium" />
    </StoryDescriptor>
    <StoryDescriptor title="large">
      <Icon source={TablerIcons.EmailLetter} size="large" />
    </StoryDescriptor>
    <StoryDescriptor title="xlarge">
      <Icon source={TablerIcons.EmailLetter} size="xlarge" />
    </StoryDescriptor>
    <StoryDescriptor title="xxlarge">
      <Icon source={TablerIcons.EmailLetter} size="xxlarge" />
    </StoryDescriptor>
    <StoryDescriptor title="xxxlarge">
      <Icon source={TablerIcons.EmailLetter} size="xxxlarge" />
    </StoryDescriptor>
  </div>
);
