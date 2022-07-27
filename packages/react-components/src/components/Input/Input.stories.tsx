import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Input, InputProps } from './Input';

const placeholderText = 'Placeholder text';

export default {
  title: 'Forms/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const Default: Story<InputProps> = (args: InputProps) => (
  <Input {...args} />
);

Default.storyName = 'Input';
Default.args = {
  size: 'medium',
  placeholder: 'Placeholder text',
};

export const Sizes = (): JSX.Element => (
  <>
    <StoryDescriptor title="XSmall">
      <Input size="xsmall" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Small">
      <Input size="small" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Input size="medium" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Input size="large" placeholder={placeholderText} />
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
