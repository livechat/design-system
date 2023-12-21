import { ButtonKind } from './types';

export const getSpinnerColors = (
  kind: ButtonKind
): Record<string, string> | undefined => {
  if (kind === 'primary' || kind === 'destructive') {
    return {
      primaryColor: 'var(--action-primary-default)',
      secondaryColor: 'var(--border-invert-primary)',
    };
  }
  if (kind === 'link-inverted') {
    return {
      primaryColor: 'var(--content-invert-primary)',
      secondaryColor: 'var(--surface-invert-secondary)',
    };
  }
};
