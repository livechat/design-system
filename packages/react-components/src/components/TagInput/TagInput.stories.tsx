import * as React from 'react';

import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import noop from '../../utils/noop';
import { TagProps } from '../Tag';

import { TagInput, EmailTagInput } from './index';

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
} as Meta<typeof TagInput>;

export const DefaultTagInput = ({ ...args }) => {
  const [tags, setTags] = React.useState(['tag1', 'tag2']);

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

export const DefaultEmailTagInput = ({ ...args }) => {
  const [tags, setTags] = React.useState(['one@test.com', 'two@test.com']);

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

export const CustomizableTagInput = ({ ...args }) => {
  const [tags, setTags] = React.useState<TagProps[]>([
    { children: 'tag1', kind: 'success' },
    { value: 'tag2', kind: 'purple' },
    { value: 'tag2', kind: 'error', outline: true },
  ]);

  return (
    <div>
      <TagInput {...args} tags={tags} onChange={setTags} />
    </div>
  );
};
CustomizableTagInput.storyName = 'CustomizableTagInput';
CustomizableTagInput.args = {
  placeholder: 'Add a new tag',
};

export const Sizes = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Medium">
      <TagInput size="medium" onChange={noop} placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <TagInput size="large" onChange={noop} placeholder={placeholderText} />
    </StoryDescriptor>
  </>
);
