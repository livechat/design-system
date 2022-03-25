import { IconTypeName } from '../Icon';

export function getIconType(theme: string): IconTypeName {
  switch (theme) {
    case 'invert':
      return IconTypeName.Inverted;
    case 'important':
      return IconTypeName.Subtle;
    default:
      return IconTypeName.Primary;
  }
}
