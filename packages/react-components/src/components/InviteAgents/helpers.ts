import { Agent } from './types';

const statusPriority: { [key: string]: number } = {
  available: 1,
  unavailable: 2,
  unknown: 3,
};

export const getSortedAgents = (agents: Agent[]) => {
  return [...agents].sort((a, b) => {
    return statusPriority[a.status] - statusPriority[b.status];
  });
};

export const getAvailableAgentsTooltipText = (
  availableAgentsNumber: number
) => {
  if (availableAgentsNumber === 0) {
    return 'No one assist your customers';
  }

  return `${availableAgentsNumber} accepting chats`;
};
