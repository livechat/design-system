import { IconKind } from '../Icon';

export function getIconType(theme: string): IconKind {
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
