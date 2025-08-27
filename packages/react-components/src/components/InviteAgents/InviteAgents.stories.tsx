import { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import image from '../../stories/assets/avatar.jpg';

import { InviteAgents } from './InviteAgents';

const meta: Meta<typeof InviteAgents> = {
  title: 'Business Components/InviteAgents',
  component: InviteAgents,
  render: (args) => (
    <div
      style={{ display: 'flex', marginLeft: '100px', justifyContent: 'end' }}
    >
      <InviteAgents {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof InviteAgents>;

const mockAgents = [
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    status: 'unknown' as const,
    avatar: '',
    isBot: false,
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'available' as const,
    avatar: undefined,
    isBot: false,
  },
  {
    name: 'Alice Johnson 2',
    email: 'alic2@example.com',
    status: 'available' as const,
    avatar: image,
    isBot: false,
  },
  {
    name: 'Bob Smith',
    email: 'bob3@example.com',
    status: 'unavailable' as const,
    avatar: image,
    isBot: false,
  },
  ...[...Array(10)].map((_, index) => ({
    name: `Unknown Agent ${index}`,
    email: `unknown${index}@example.com`,
    status: 'available' as const,
    avatar: image,
    isBot: index % 2 === 0,
  })),
];

export const Default: Story = {
  args: {
    agents: mockAgents,
    onAddTeammateClick: action('Add Teammate Clicked'),
    onSetUpChatbotClick: action('Set Up Chatbot Clicked'),
    onAvailableAgentsClick: action('Available Agents Clicked'),
  },
};

export const AnimatedInviteButton: Story = {
  args: {
    agents: mockAgents,
    onAddTeammateClick: action('Add Teammate Clicked'),
    onSetUpChatbotClick: action('Set Up Chatbot Clicked'),
    animatedInviteButton: true,
    onAvailableAgentsClick: action('Available Agents Clicked'),
  },
};

export const OnlyUnavailableAgents: Story = {
  args: {
    agents: mockAgents.map((agent) => ({
      ...agent,
      status: 'unavailable' as const,
    })),
    onAddTeammateClick: action('Add Teammate Clicked'),
    onSetUpChatbotClick: action('Set Up Chatbot Clicked'),
    onAvailableAgentsClick: action('Available Agents Clicked'),
  },
};

export const NoAgents: Story = {
  args: {
    agents: [],
    onAddTeammateClick: action('Add Teammate Clicked'),
    onSetUpChatbotClick: action('Set Up Chatbot Clicked'),
    onAvailableAgentsClick: action('Available Agents Clicked'),
  },
};
