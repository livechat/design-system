import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Placement } from '@floating-ui/react-dom';
import { Button } from '../Button';
import { Popover as PopoverComponent } from './Popover';

import {
  Block,
  Chats,
  DropDown,
  Email,
  Tickets,
} from '@livechat/design-system-icons/react/material';

import { Icon } from '../Icon';

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

const provideFallbackPlacement = (flipOptions: Placement) => {
  const hasNoFallback = (flipOptions as string) === 'none';
  const hasNotChosen = Object.keys(flipOptions).length === 0;

  return hasNoFallback || hasNotChosen
    ? undefined
    : { fallbackPlacements: [flipOptions] };
};

const placementsWithUnselect = ['none', ...placements];

const OpenChat = () => {
  return (
    <div className="listElement">
      <Icon source={Chats} /> <span className="label">Open chat</span>{' '}
    </div>
  );
};

const CreateTicket = () => {
  return (
    <div className="listElement">
      <Icon source={Tickets} /> <span className="label">Create a ticket</span>{' '}
    </div>
  );
};

const SendTranscript = () => {
  return (
    <div className="listElement divider">
      <Icon source={Email} /> <span className="label">Send transcript</span>{' '}
    </div>
  );
};

const BanCustomer = () => {
  return (
    <div className="listElement">
      <Icon source={Block} /> <span className="label">Ban this customer</span>{' '}
    </div>
  );
};

export const Popover = ({
  placement,
  isVisible,
  flipOptions,
}: {
  placement: Placement;
  isVisible: boolean;
  flipOptions: Placement;
}): React.ReactElement => (
  <div className="wrap">
    <PopoverComponent
      placement={placement}
      isVisible={isVisible}
      flipOptions={provideFallbackPlacement(flipOptions)}
      triggerRenderer={() => (
        <Button icon={<Icon source={DropDown}></Icon>} iconPosition={'right'}>
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
          Popover content
        </div>
      </div>
    </PopoverComponent>
  </div>
);

Popover.args = {
  placement: 'bottom-start',
  flipOptions: {},
  isVisible: true,
};

export const Actions = ({
  placement,
  isVisible,
  flipOptions,
}: {
  placement: Placement;
  isVisible: boolean;
  flipOptions: Placement;
}): React.ReactElement => {
  return (
    <div style={{ minHeight: '200px' }}>
      <PopoverComponent
        placement={placement}
        isVisible={isVisible}
        flipOptions={provideFallbackPlacement(flipOptions)}
        triggerRenderer={() => (
          <Button icon={<Icon source={DropDown}></Icon>} iconPosition={'right'}>
            Actions
          </Button>
        )}
      >
        <div
          style={{
            minWidth: '200px',
          }}
        >
          <OpenChat />
          <CreateTicket />
          <SendTranscript />
          <BanCustomer />
        </div>
      </PopoverComponent>
    </div>
  );
};

Actions.args = {
  placement: 'bottom-start',
  isVisible: true,
  flipOptions: {},
};

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    placement: {
      options: placements,
      control: {
        type: 'select',
        labels: placements,
      },
    },
    flipOptions: {
      options: placementsWithUnselect,
      control: {
        type: 'select',
        labels: placementsWithUnselect,
      },
      name: 'flipOptions.fallbackPlacements',
    },
  },
} as ComponentMeta<typeof Popover>;
