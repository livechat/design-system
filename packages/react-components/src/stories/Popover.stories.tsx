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
  isVisible: true,
};

export interface IPopoverExample {
  placement: PopperCore.Placement;
  isVisible: boolean;
}

const PopoverExample: React.FC<IPopoverExample> = ({
  placement,
  isVisible,
}) => {
  return (
    <div
      style={{
        width: '500px',
        height: '500px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <PopoverComponent
        placement={placement}
        isVisible={isVisible}
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
          preventOverflow: {
            enabled: true,
          },
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
    },
  },
} as ComponentMeta<typeof PopoverExample>;
