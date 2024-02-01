import * as React from 'react';

import { AddCircle as AddCircleIcon } from '@livechat/design-system-icons';
import { ComponentMeta, Story } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Icon } from '../Icon';

import { Input, InputProps } from './Input';

const placeholderText = 'Placeholder text';

export default {
  title: 'Forms/Input',
  component: Input,
  argTypes: {
    onChange: {
      description: 'The event handler for onChange',
      action: 'changed',
    },
    icon: {
      control: false,
    },
    readOnly: {
      type: 'boolean',
    },
  },
} as ComponentMeta<typeof Input>;

export const Default: Story<InputProps> = (args: InputProps) => (
  <Input {...args} />
);

Default.storyName = 'Input';
Default.args = {
  inputSize: 'medium',
  placeholder: 'Placeholder text',
};

export const Sizes = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Xsmall">
      <Input inputSize="xsmall" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Compact">
      <Input inputSize="compact" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Input inputSize="medium" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Input inputSize="large" placeholder={placeholderText} />
    </StoryDescriptor>
  </>
);

export const States = (): React.ReactElement => (
  <>
    <StoryDescriptor title="With error">
      <Input error={true} placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <Input disabled={true} placeholder={placeholderText} />
    </StoryDescriptor>
  </>
);

export const Types = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Text">
      <Input type="text" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Password">
      <Input type="password" placeholder={placeholderText} />
    </StoryDescriptor>
  </>
);

export const WithIcons = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Left icon">
      <Input
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'left',
        }}
        placeholder={placeholderText}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Right icon">
      <Input
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'right',
        }}
        placeholder={placeholderText}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Left icon with password type">
      <Input
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'left',
        }}
        placeholder={placeholderText}
        type="password"
      />
    </StoryDescriptor>
  </>
);
