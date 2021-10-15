import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  Icon as IconComponent,
  IconSize,
  IconTypeName,
} from '../components/Icon';
import Add from '@livechat/design-system-icons/dist/material/Add';
export default {
  title: 'Components/Icon',
  component: IconComponent,
} as ComponentMeta<typeof IconComponent>;

export const Icon = (args: any): React.ReactElement => (
  <div>
    <IconComponent {...args} /> {args.label}
  </div>
);

Icon.args = {
  source: Add,
  size: IconSize.medium,
  iconType: IconTypeName.Primary,
};
