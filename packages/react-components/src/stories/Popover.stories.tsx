import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Button } from '../components/Button';
import { Popover as PopoverComponent } from '../components/Popover';
import {
  Block,
  Chats,
  DropDown,
  Email,
  Tickets,
} from '@livechat/design-system-icons/dist/material';
import { Icon } from '../components/Icon';

import * as PopperCore from '@popperjs/core';
import './Popover.stories.css';

const OpenChat = () => {
  return (
    <div className="lc-listElement">
      <Icon source={Chats} /> <span className="lc-label">Open chat</span>{' '}
    </div>
  );
};

const CreateTicket = () => {
  return (
    <div className="lc-listElement">
      <Icon source={Tickets} />{' '}
      <span className="lc-label">Create a ticket</span>{' '}
    </div>
  );
};

const SendTranscript = () => {
  return (
    <div className="lc-listElement lc-divider">
      <Icon source={Email} /> <span className="lc-label">Send transcript</span>{' '}
    </div>
  );
};

const BanCustomer = () => {
  return (
    <div className="lc-listElement">
      <Icon source={Block} />{' '}
      <span className="lc-label">Ban this customer</span>{' '}
    </div>
  );
};

export const Popover = ({
  placement,
  isVisible,
}: {
  placement: PopperCore.Placement;
  isVisible: boolean;
}): React.ReactElement => (
  <div style={{ minHeight: '400px' }}>
    <PopoverComponent
      placement={placement}
      isVisible={isVisible}
      triggerRenderer={() => (
        <div>
          <Button icon={<Icon source={DropDown}></Icon>} iconPosition={'right'}>
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

Popover.args = {
  placement: 'bottom-start',
  isVisible: true,
};

export const Actions = ({
  placement,
  isVisible,
}: {
  placement: PopperCore.Placement;
  isVisible: boolean;
}): React.ReactElement => (
  <div style={{ minHeight: '200px' }}>
    <PopoverComponent
      placement={placement}
      isVisible={isVisible}
      triggerRenderer={() => (
        <div>
          <Button icon={<Icon source={DropDown}></Icon>} iconPosition={'right'}>
            Actions
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

Actions.args = {
  placement: 'bottom-start',
  isVisible: true,
};

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    placement: {
      options: PopperCore.placements,
      control: {
        type: 'select',
        labels: PopperCore.placements,
      },
    },
  },
} as ComponentMeta<typeof Popover>;
