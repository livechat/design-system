import { Info } from '@livechat/design-system-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

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
    iconSource: Info,
    children: 'System notification',
    source: 'Shopify',
    details: ['This is a system message with details'],
    timestamp: '10:30 AM',
    timestampWithSeconds: '10:30:00 AM',
    titleBold: false,
    alignment: 'right',
  },
};

export const WithDetails: Story = {
  args: {
    iconSource: Info,
    children: 'System notification',
    source: 'Shopify',
    details: [
      'This is a system message with details',
      'This is another detail',
      'This is going to be very very long detail. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
    timestamp: '10:30 AM',
    timestampWithSeconds: '10:30:00 AM',
    titleBold: true,
    alignment: 'right',
  },
};

export const WithAction: Story = {
  args: {
    iconSource: Info,
    children: 'System notification',
    source: 'Shopify',
    details: [
      'This is a system message with details',
      'This is another detail',
      'This is going to be very very long detail. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
    timestamp: '10:30 AM',
    timestampWithSeconds: '10:30:00 AM',
    titleBold: true,
    alignment: 'right',
    actions: [
      {
        label: 'Action',
        callback: () => {},
      },
      {
        label: 'Another action',
        callback: () => {},
      },
    ],
  },
};

export const WithMultipleActions: Story = {
  args: {
    iconSource: Info,
    children: 'System notification',
    source: 'Shopify',
    details: [
      'This is a system message with details',
      'This is another detail',
      'This is going to be very very long detail. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
    timestamp: '10:30 AM',
    timestampWithSeconds: '10:30:00 AM',
    titleBold: true,
    alignment: 'right',
    actions: [
      {
        label: 'Action',
        callback: () => {},
      },
      {
        label: 'Another action',
        callback: () => {},
      },
      {
        label: 'Action with icon',
        callback: () => {},
        icon: Info,
      },
      {
        label: 'Another action with icon',
        callback: () => {},
        icon: Info,
      },
      {
        label: 'Action no icon',
        callback: () => {},
      },
    ],
  },
};

export const WithKindPositive: Story = {
  args: {
    iconSource: Info,
    children: 'Positive system message',
    source: 'Shopify',
    details: [
      'This is a system message with details',
      'This is another detail',
      'This is going to be very very long detail. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
    timestamp: '10:30 AM',
    timestampWithSeconds: '10:30:00 AM',
    titleBold: true,
    alignment: 'right',
    kind: 'positive',
    actions: [
      {
        label: 'Action',
        callback: () => {},
      },
      {
        label: 'Another action',
        callback: () => {},
      },
      {
        label: 'Action with icon',
        callback: () => {},
        icon: Info,
      },
      {
        label: 'Another action with icon',
        callback: () => {},
        icon: Info,
      },
      {
        label: 'Action no icon',
        callback: () => {},
      },
    ],
  },
};
