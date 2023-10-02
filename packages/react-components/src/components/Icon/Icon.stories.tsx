import * as React from 'react';

import {
  Icon as IconComponent,
  IconKind,
  IconProps,
  IconSize,
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
      description: 'Icon set',
    },
    name: {
      options: iterator,
      control: {
        type: 'select',
        labels: iterator,
      },
      description: 'Icon name',
    },
    size: {
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'] as IconSize[],
      control: {
        type: 'select',
      },
      description: 'Icon size',
    },
    kind: {
      options: [
        'primary',
        'subtle',
        'inverted',
        'inverted-subtle',
        'link',
        'success',
        'warning',
        'error',
        'negative',
        'positive',
        'action-primary',
        'action-negative',
        'action-positive',
        'action-warning',
        'action-neutral',
      ] as IconKind[],
      control: {
        type: 'select',
      },
      description: 'Icon kind',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Icon disabled',
    },
    customColor: {
      control: {
        type: 'color',
      },
      description: 'Custom icon color',
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
};
