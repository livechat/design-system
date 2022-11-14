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
  wrapperSize: 'medium',
  placeholder: 'Placeholder text',
};

export const Sizes = (): JSX.Element => (
  <>
    <StoryDescriptor title="Compact">
      <Input wrapperSize="compact" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Input wrapperSize="medium" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Input wrapperSize="large" placeholder={placeholderText} />
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

export const WithIcon = (): JSX.Element => (
  <>
    <Input
      icon={<Icon source={AddCircleIcon} />}
      placeholder={placeholderText}
    />
  </>
);
