import { IconsData } from './constans';
import { IconGroup, IconName } from './types';

export const getIconsByGroup = (group: IconGroup): IconName[] => {
  return Object.entries(IconsData)
    .filter(([_, iconGroup]) => iconGroup === group)
    .map(([iconName]) => iconName as IconName);
};
