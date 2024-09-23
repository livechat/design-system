import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { InviteAgents } from './InviteAgents';

const meta: Meta<typeof InviteAgents> = {
  title: 'Business Components/InviteAgents',
  component: InviteAgents,
  render: (args) => (
    <div style={{ display: 'flex' }}>
      <InviteAgents {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof InviteAgents>;

const mockAgents = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'available' as const,
    avatar: 'https://via.placeholder.com/150',
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    status: 'unavailable' as const,
    avatar: 'https://via.placeholder.com/150',
  },
];

export const Default: Story = {
  args: {
    agents: mockAgents,
    onAddAgentsClick: action('Add Agents Clicked'),
  },
};

export const NoAgents: Story = {
  args: {
    agents: [],
    onAddAgentsClick: action('Add Agents Clicked'),
  },
};
