import userEvent from '@testing-library/user-event';

import { render, screen, vi, waitFor } from 'test-utils';

import { InviteAgents } from './InviteAgents';
import { Agent } from './types';

describe('InviteAgents Component', () => {
  const mockOnAddAgentsClick = vi.fn();
  const mockOnSetUpChatbotClick = vi.fn();

  const renderComponent = (
    agents: Agent[] = [],
    animatedInviteButton = false
  ) => {
    render(
      <InviteAgents
        agents={agents}
        onSetUpChatbotClick={mockOnSetUpChatbotClick}
        onAddTeammateClick={mockOnAddAgentsClick}
        animatedInviteButton={animatedInviteButton}
      />
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with no agents', () => {
    renderComponent([]);

    const inviteButton = screen.getByRole('button', { name: /invite team/i });
    expect(inviteButton).toBeInTheDocument();

    const tooltipHeading = screen.queryByText(/team status/i);
    expect(tooltipHeading).not.toBeInTheDocument();
  });

  it('renders only available agents', async () => {
    const agents: Agent[] = [
      {
        name: 'Alice',
        email: 'alice@example.com',
        status: 'available',
        avatar: 'https://via.placeholder.com/150',
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        status: 'unavailable',
        avatar: 'https://via.placeholder.com/150',
      },
      {
        name: 'Charlie',
        email: 'charlie@example.com',
        status: 'unknown',
        avatar: 'https://via.placeholder.com/150',
      },
    ];

    renderComponent(agents);

    const avatars = screen.getAllByRole('img');
    expect(avatars).toHaveLength(1);

    userEvent.hover(avatars[0]);

    await waitFor(() => {
      expect(screen.getByText(/1 agent accepting chats/i)).toBeInTheDocument();
    });
  });

  it('applies correct classes when there are only unavailable agents', () => {
    const agents: Agent[] = [
      {
        name: 'Bob',
        email: 'bob@example.com',
        status: 'unavailable',
        avatar: 'https://via.placeholder.com/150',
      },
    ];

    const { container } = render(
      <InviteAgents
        agents={agents}
        onSetUpChatbotClick={mockOnSetUpChatbotClick}
        onAddTeammateClick={mockOnAddAgentsClick}
      />
    );

    expect(container.firstChild).toHaveClass(/invite-agents--only-unavailable/);
  });

  it('shows animated invite button when animatedInviteButton is true and agents are present', () => {
    const agents: Agent[] = [
      {
        name: 'Alice',
        email: 'alice@example.com',
        status: 'available',
        avatar: 'https://via.placeholder.com/150',
      },
    ];

    renderComponent(agents, true);

    const inviteButton = screen.getByRole('button', { name: /invite team/i });
    expect(inviteButton).toHaveClass(/invite-agents__invite-button--animated/);
  });

  it('shows action menu when invite button is clicked', async () => {
    renderComponent();

    const inviteButton = screen.getByRole('button', { name: /invite team/i });
    userEvent.click(inviteButton);

    await waitFor(() => {
      expect(screen.getByText(/invite teammate/i)).toBeInTheDocument();
      expect(screen.getByText(/set up chatbot/i)).toBeInTheDocument();
    });

    userEvent.click(screen.getByText(/invite teammate/i));

    expect(mockOnAddAgentsClick).toHaveBeenCalledTimes(1);
  });

  it('displays additional agents count correctly', () => {
    const agents: Agent[] = Array.from({ length: 5 }, (_, index) => ({
      name: `Agent ${index + 1}`,
      email: `agent${index + 1}@example.com`,
      status: 'available',
      avatar: 'https://via.placeholder.com/150',
    }));

    renderComponent(agents);

    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('renders "Not accepting" when all agents are unavailable', async () => {
    const agents: Agent[] = [
      {
        name: 'Bob',
        email: 'bob@example.com',
        status: 'unavailable',
        avatar: 'https://via.placeholder.com/150',
      },
      {
        name: 'Charlie',
        email: 'charlie@example.com',
        status: 'unavailable',
        avatar: 'https://via.placeholder.com/150',
      },
    ];

    renderComponent(agents);

    const notAcceptingText = screen.getByText(/no active agents/i);
    expect(notAcceptingText).toBeInTheDocument();

    userEvent.hover(notAcceptingText);

    await waitFor(() => {
      expect(
        screen.getByText("No one's available to assist customers")
      ).toBeInTheDocument();
      expect(
        screen.getByText('Offer 24/7 support with ChatBot.')
      ).toBeInTheDocument();
    });

    const chatbotButton = screen.getByRole('button', {
      name: /set up chatbot/i,
    });
    expect(chatbotButton).toBeInTheDocument();

    userEvent.click(chatbotButton);
    expect(mockOnSetUpChatbotClick).toHaveBeenCalledTimes(1);
  });
});
