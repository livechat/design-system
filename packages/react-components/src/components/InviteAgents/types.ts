export interface Agent {
  name: string;
  email: string;
  status: 'away' | 'online' | 'offline';
  avatar: string;
}

export interface InviteAgentsProps {
  /**
   * The list of invited agents
   */
  agents: Agent[];
  /**
   * The function to call when the "Add agents" button is clicked
   */
  onAddAgentsClick: () => void;
}
