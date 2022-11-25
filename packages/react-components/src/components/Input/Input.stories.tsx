import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { AddCircle as AddCircleIcon } from '@livechat/design-system-icons/react/material';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Icon } from '../Icon';
import { Input, InputProps } from './Input';

const placeholderText = 'Placeholder text';

export default {
  title: 'Forms/Input',
  component: Input,
  argTypes: {
    onChange: { action: 'changed' },
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

export const Sizes = (): JSX.Element => (
  <>
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

export const States = (): JSX.Element => (
  <>
    <StoryDescriptor title="With error">
      <Input error={true} placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <Input disabled={true} placeholder={placeholderText} />
    </StoryDescriptor>
  </>
);

export const Types = (): JSX.Element => (
  <>
    <StoryDescriptor title="Text">
      <Input type="text" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Password">
      <Input type="password" placeholder={placeholderText} />
    </StoryDescriptor>
  </>
);

export const WithIcons = (): JSX.Element => (
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
