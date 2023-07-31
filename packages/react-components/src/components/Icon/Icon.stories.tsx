import * as React from 'react';

import * as TablerIcons from '@livechat/design-system-icons/react/tabler';
import { ComponentMeta } from '@storybook/react';

import { Icon as IconComponent, IconProps } from './Icon';

const iterator = Object.keys(TablerIcons);

export default {
  title: 'Components/Icon',
  component: IconComponent,
  argTypes: {
    source: {
      options: iterator,
      mapping: TablerIcons,
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

export const Icon = (args: IconProps): React.ReactElement => (
  <div style={{ width: '300px' }}>
    <IconComponent {...args} />
  </div>
);

Icon.args = {
  source: TablerIcons.EmailLetter,
  size: 'medium',
  kind: 'primary',
  disabled: false,
};
