import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import * as MaterialIcons from '@livechat/design-system-icons/react/material';

import {
  Icon as IconComponent,
  IconSizeName,
  IconTypeName,
  IconProps,
} from './Icon';

const iterator = Object.keys(MaterialIcons);

export default {
  title: 'Components/Icon',
  component: IconComponent,
  argTypes: {
    source: {
      options: iterator,
      mapping: MaterialIcons,
      control: {
        type: 'select',
        labels: iterator,
      },
    },
    size: {
      table: {
        defaultValue: {
          summary: IconSizeName.Medium,
        },
      },
    },
    iconType: {
      table: {
        defaultValue: {
          summary: IconTypeName.Primary,
        },
      },
    },
  },
} as ComponentMeta<typeof IconComponent>;

export const Icon = (args: IconProps): React.ReactElement => (
  <div style={{ width: '300px' }}>
    <IconComponent {...args} />
  </div>
);

Icon.args = {
  source: MaterialIcons.Email,
  size: IconSizeName.Medium,
  iconType: IconTypeName.Primary,
};
