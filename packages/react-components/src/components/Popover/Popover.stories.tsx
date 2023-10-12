import * as React from 'react';

import { ChevronDown } from '@livechat/design-system-icons';
import { ComponentMeta } from '@storybook/react';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Typography';

import { Popover as PopoverComponent, IPopoverProps } from './Popover';

import './Popover.stories.css';

const placements = [
  'top',
  'right',
  'bottom',
  'left',
  'top-start',
  'right-start',
  'bottom-start',
  'left-start',
  'top-end',
  'right-end',
  'bottom-end',
  'left-end',
];

export default {
  title: 'Components/Popover',
  component: PopoverComponent,
  argTypes: {
    placement: {
      options: placements,
      control: {
        type: 'select',
        labels: placements,
      },
    },
    flipOptions: {
      control: false,
    },
  },
} as ComponentMeta<typeof PopoverComponent>;

export const Default = (args: IPopoverProps): React.ReactElement => (
  <div className="wrap">
    <PopoverComponent
      {...args}
      triggerRenderer={() => (
        <Button
          icon={<Icon source={ChevronDown}></Icon>}
          iconPosition={'right'}
        >
          Open Popover
        </Button>
      )}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '12px',
          width: '308px',
          height: '308px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px dashed var(--border-default)',
            backgroundColor: 'var(--surface-basic-default)',
            width: '100%',
            height: '100%',
            borderRadius: '4px',
          }}
        >
          <Text>Popover content</Text>
        </div>
      </div>
    </PopoverComponent>
  </div>
);
Default.args = {
  placement: 'bottom-start',
  isVisible: true,
};
