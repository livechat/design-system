import { IconKind } from '../Icon';

export function getIconType(theme: string): IconKind {
  switch (theme) {
    case 'invert':
      return 'inverted';
    default:
      return 'primary';
  }
}
