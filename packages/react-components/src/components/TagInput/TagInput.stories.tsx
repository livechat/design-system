import { ComponentMeta, Story } from '@storybook/react';

import noop from '../../utils/noop';
import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import {
  TagInput,
  TagInputProps,
  EmailTagInput,
  EmailTagInputProps,
} from './index';
import { useState } from 'react';

const placeholderText = 'Placeholder text';

export default {
  title: 'Forms/Tag Input',
  component: TagInput,
  argTypes: {
    tags: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof TagInput>;

export const DefaultTagInput: Story<TagInputProps> = ({
  ...args
}: TagInputProps) => {
  const [tags, setTags] = useState(['tag1', 'tag2']);
  return (
    <div>
      <TagInput {...args} tags={tags} onChange={setTags} />
    </div>
  );
};

DefaultTagInput.storyName = 'TagInput';
DefaultTagInput.args = {
  placeholder: placeholderText,
};

export const DefaultEmailTagInput: Story<EmailTagInputProps> = ({
  ...args
}: EmailTagInputProps) => {
  const [tags, setTags] = useState(['one@test.com', 'two@test.com']);
  return (
    <div>
      <EmailTagInput {...args} tags={tags} onChange={setTags} />
    </div>
  );
};
DefaultEmailTagInput.storyName = 'EmailTagInput';
DefaultEmailTagInput.args = {
  placeholder: 'name@company.com',
};

export const Sizes = (): JSX.Element => (
  <>
    <StoryDescriptor title="Medium">
      <TagInput size="medium" onChange={noop} placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <TagInput size="large" onChange={noop} placeholder={placeholderText} />
    </StoryDescriptor>
  </>
);
