import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Button } from '../components/Button';
import { Popover as PopoverComponent } from '../components/Popover';
import { DropDown } from '@livechat/design-system-icons/dist/material';
import { Icon } from '../components/Icon';

import * as PopperCore from '@popperjs/core';

export const Popover = (args: any): React.ReactElement => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      width: '800px',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <PopoverExample {...args}></PopoverExample>
  </div>
);

Popover.args = {
  placement: 'bottom-start',
};

export interface IPopoverExample {
  placement: PopperCore.Placement;
}

const PopoverExample: React.FC<IPopoverExample> = ({ placement }) => {
  return (
    <div
      style={{
        width: '500px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PopoverComponent
        placement={placement}
        closeOnEscPress
        triggerRenderer={() => (
          <div>
            <Button
              icon={<Icon source={DropDown}></Icon>}
              iconPosition={'right'}
            >
              Open Popover
            </Button>
          </div>
        )}
        modifiers={{
          preventOverflow: {},
        }}
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
            Popover content
          </div>
        </div>
      </PopoverComponent>
    </div>
  );
};

export default {
  title: 'Components/Popover',
  component: PopoverExample,
  argTypes: {
    placement: {
      options: PopperCore.placements,
      control: {
        type: 'select',
        labels: PopperCore.placements,
      },
      table: {
        defaultValue: { summary: PopperCore.placements[4] },
      },
    },
  },
} as ComponentMeta<typeof PopoverExample>;
