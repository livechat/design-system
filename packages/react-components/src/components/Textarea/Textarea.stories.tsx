import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Textarea, TextareaProps } from './Textarea';

const placeholderText = 'Placeholder text';
const exampleText = 'Example textarea text';

export default {
  title: 'Forms/Textarea',
  component: Textarea,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Textarea>;

export const Default: Story<TextareaProps> = (args: TextareaProps) => {
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

export const States = (): JSX.Element => (
  <>
    <StoryDescriptor title="With error">
      <Textarea
        error={true}
        value={exampleText}
        placeholder={placeholderText}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <Textarea
        disabled={true}
        value={exampleText}
        placeholder={placeholderText}
      />
    </StoryDescriptor>
  </>
);
