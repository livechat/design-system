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
