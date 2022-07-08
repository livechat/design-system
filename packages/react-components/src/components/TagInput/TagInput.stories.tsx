import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  TagInput as TagInputComponent,
  TagInputProps,
  EmailTagInput as EmailTagInputComponent,
  EmailTagInputProps,
} from './index';

export default {
  title: 'Forms/Tag Input',
  component: TagInputComponent,
  argTypes: {
    tags: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof TagInputComponent>;

export const TagInput = ({ ...args }: TagInputProps): React.ReactElement => {
  const [tags, setTags] = React.useState(['tag1', 'tag2']);
  return (
    <div>
      <TagInputComponent {...args} tags={tags} onChange={setTags} />
    </div>
  );
};

TagInput.args = {
  placeholder: 'Tag input placeholder',
} as TagInputProps;

export const EmailTagInput = ({
  ...args
}: EmailTagInputProps): React.ReactElement => {
  const [tags, setTags] = React.useState(['one@test.com', 'two@test.com']);
  return (
    <div>
      <EmailTagInputComponent {...args} tags={tags} onChange={setTags} />
    </div>
  );
};

EmailTagInput.args = {
  placeholder: 'name@company.com',
} as TagInputProps;
