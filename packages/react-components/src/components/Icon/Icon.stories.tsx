import { ComponentMeta } from '@storybook/react';
import * as MaterialIcons from '@livechat/design-system-icons/react/material';

import { Icon as IconComponent, IconProps } from './Icon';
import { ReactElement } from 'react';

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
          summary: 'medium',
        },
      },
    },
    kind: {
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
  },
} as ComponentMeta<typeof IconComponent>;

export const Icon = (args: IconProps): ReactElement => (
  <div style={{ width: '300px' }}>
    <IconComponent {...args} />
  </div>
);

Icon.args = {
  source: MaterialIcons.Email,
  size: 'medium',
  kind: 'primary',
  disabled: false,
};
