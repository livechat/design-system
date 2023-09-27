import { IconKind } from '@livechat/design-system-icons';

import { TooltipTheme } from './types';

export function getIconType(theme: TooltipTheme): IconKind {
  switch (theme) {
    case 'invert':
      return 'inverted';
    default:
      return 'primary';
  }
}

export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
