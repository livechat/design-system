import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Tag as TagComponent, ITagProps } from '../components/Tag';

export default {
  title: 'Components/Tag',
  component: TagComponent,
} as ComponentMeta<typeof TagComponent>;

export const Tag = ({ children, ...args }: ITagProps): React.ReactElement => {
  return (
    <div style={{ display: 'inline-block' }}>
      <TagComponent {...args}>{children}</TagComponent>
    </div>
  );
};

Tag.args = {
  kind: 'default',
  outline: false,
  size: 'medium',
  children: 'Example tag',
  dismissible: false,
} as ITagProps;
