import { IconKind } from '../Icon';

export function getIconType(theme: string): IconKind {
  switch (theme) {
    case 'invert':
      return 'inverted';
    case 'important':
      return 'subtle';
    default:
      return 'primary';
  }
}
