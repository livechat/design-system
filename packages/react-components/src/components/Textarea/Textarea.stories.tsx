import * as React from 'react';

import { Meta, StoryFn } from '@storybook/react-vite';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Textarea, TextareaProps } from './Textarea';

const placeholderText = 'Placeholder text';
const exampleText = 'Example textarea text';

export default {
  title: 'Forms/Textarea',
  component: Textarea,
  argTypes: { onChange: { action: 'changed' } },
} as Meta<typeof Textarea>;

export const Default: StoryFn<TextareaProps> = (args: TextareaProps) => {
  return (
    <div>
      <Textarea {...args} />
    </div>
  );
};

Default.storyName = 'Textarea';
Default.args = {
  placeholder: placeholderText,
};

export const States = (): React.ReactElement => (
  <>
    <StoryDescriptor title="With error">
      <Textarea error placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <Textarea
        disabled={true}
        value={exampleText}
        placeholder={placeholderText}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Read only">
      <Textarea readOnly value={exampleText} placeholder={placeholderText} />
    </StoryDescriptor>
  </>
);
