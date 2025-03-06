import { Info } from '@livechat/design-system-icons';
import { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../Icon';

import { SystemMessage } from './SystemMessage';

const meta: Meta<typeof SystemMessage> = {
  title: 'Components/SystemMessage',
  component: SystemMessage,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SystemMessage>;

export const Default: Story = {
  args: {
    icon: <Icon source={Info} />,
    children: 'System notification',
    details: 'This is a system message with details',
    timestamp: '10:30 AM',
    timestampWithSeconds: '10:30:00 AM',
  },
};

export const WithoutIcon: Story = {
  args: {
    children: 'Simple notification',
    details: 'This is a system message without an icon',
    timestamp: '3:20 PM',
    timestampWithSeconds: '3:20:00 PM',
  },
};

export const WithoutTimestamp: Story = {
  args: {
    icon: <Icon source={Info} />,
    children: 'No timestamp',
    details: 'This system message does not display a timestamp',
    timestamp: '',
    timestampWithSeconds: '',
  },
};

export const TitleOnly: Story = {
  args: {
    children: 'Title only message',
    timestamp: '',
    timestampWithSeconds: '',
  },
};
