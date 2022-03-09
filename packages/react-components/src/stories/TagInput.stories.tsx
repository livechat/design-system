import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  TagInput as TagInputComponent,
  ITagInputProps,
} from '../components/TagInput';
import {
  EmailTagInput as EmailTagInputComponent,
  IEmailTagInputProps,
} from '../components/TagInput';
import { useState } from 'react';

export default {
  title: 'Components/Tag Input',
  component: TagInputComponent,
  argTypes: {
    tags: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof TagInputComponent>;

export const TagInput = ({ ...args }: ITagInputProps): React.ReactElement => {
  const [tags, setTags] = useState(['tag1', 'tag2']);
  return (
    <div>
      <TagInputComponent {...args} tags={tags} onChange={setTags} />
    </div>
  );
};

TagInput.args = {
  placeholder: 'Tag input placeholder',
} as ITagInputProps;

export const EmailTagInput = ({
  ...args
}: IEmailTagInputProps): React.ReactElement => {
  const [tags, setTags] = useState(['one@test.com', 'two@test.com']);
  return (
    <div>
      <EmailTagInputComponent {...args} tags={tags} onChange={setTags} />
    </div>
  );
};

EmailTagInput.args = {
  placeholder: 'name@company.com',
} as ITagInputProps;
