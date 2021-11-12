import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  TagInput as TagInputComponent,
  ITagInputProps,
} from '../components/TagInput';

export default {
  title: 'Components/Tag Input',
  component: TagInputComponent,
} as ComponentMeta<typeof TagInputComponent>;

export const TagInput = ({ ...args }: ITagInputProps): React.ReactElement => (
  <div>
    <TagInputComponent {...args} />
  </div>
);

TagInput.args = {
  tags: ['one@test.com', 'two@test.com'],
  placeholder: 'Tag input placeholder',
} as ITagInputProps;
