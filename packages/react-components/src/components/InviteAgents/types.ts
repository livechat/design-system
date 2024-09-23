export interface Agent {
  name: string;
  email: string;
  status: 'available' | 'unavailable' | 'unknown';
  avatar: string;
}

export interface InviteAgentsProps {
  /**
   * The class name to apply to the component
   */
  className?: string;
  /**
   * The list of invited agents
   */
  agents: Agent[];
  /**
   * The function to call when the "Add agents" button is clicked
   */
  onAddAgentsClick: () => void;
}
