import * as React from 'react';

import {
  Icon as IconComponent,
  IconProps,
  TablerIcon,
  TablerIconsList,
} from '@livechat/design-system-icons';
import { Meta } from '@storybook/react';

const iterator = TablerIconsList;

export default {
  title: 'Components/Icon',
  component: IconComponent,
  argTypes: {
    set: {
      options: ['tabler', 'material'],
      control: {
        type: 'select',
      },
    },
    name: {
      options: iterator,
      control: {
        type: 'select',
        labels: iterator,
      },
    },
  },
} as Meta<IconProps>;

export const Icon = (args: IconProps): React.ReactElement => (
  <div style={{ width: '300px' }}>
    <IconComponent {...args} />
  </div>
);

Icon.args = {
  set: 'tabler' as const,
  name: 'AccountCircle' as TablerIcon,
  size: 'medium',
  kind: 'primary',
  disabled: false,
  customColor: '#000000',
};
