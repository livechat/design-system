import { ComponentCoreProps } from '../../utils/types';

export interface Agent {
  name: string;
  email: string;
  status: 'available' | 'unavailable' | 'unknown';
  avatar: string;
}

export interface InviteAgentsProps extends ComponentCoreProps {
  /**
   * The list of invited agents
   */
  agents: Agent[];
  /**
   * The function to call when the "Set up Chatbot" button is clicked
   */
  onSetUpChatbotClick: () => void;
  /**
   * The function to call when the "Invite Teammate" button is clicked
   */
  onAddTeammateClick: () => void;
  /**
   * Whether the invite button should be animated
   */
  animatedInviteButton?: boolean;
  /**
   * Offset for the tooltip arrow
   */
  tooltipArrowOffset?: number;
}