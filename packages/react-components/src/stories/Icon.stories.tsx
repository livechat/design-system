import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import * as MaterialIcons from '@livechat/design-system-icons/dist/material';
const Icons = MaterialIcons ;

import {
  Icon as IconComponent,
  IconSizeName,
  IconTypeName,
  IIconProps,
} from '../components/Icon';
import { IconsMap } from './foundations/components/IconsShowcase';

const iterator = Object.keys(Icons);

export default {
  title: 'Components/Icon',
  component: IconComponent,
  argTypes: {
    source: {
      options: iterator,
      mapping: Icons,
      control: {
        type: 'select',
        labels: iterator,
      },
    },
  },
} as ComponentMeta<typeof IconComponent>;

export const Icon = (args: IIconProps): React.ReactElement => (
  <div style={{ width: '300px' }}>
    <IconComponent {...args} />
  </div>
);

Icon.args = {
  source: Icons.Email,
  size: IconSizeName.Medium,
  iconType: IconTypeName.Primary,
};
