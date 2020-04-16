export type ThemeName = 'legacy' | 'light';

export interface Theme {
  primary: string;
  primaryHover: string;
  primaryDisabled: string;
  basic: string;
  basicHover: string;
  basicDisabled: string;
  inactive: string;
  danger: string;
  dangerHover: string;
  dangerDisabled: string;
  success: string;
  warning: string;
  info: string;
  tip: string;
  tipText: string;
  tipInverted: string;
  tipInvertedText: string;
  tipImportant: string;
  tipImportantText: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textPlaceholder: string;
  textOnPrimary: string;
  uiBackground: string;
  ui: string;
  uiHover: string;
  overlay: string;
  overlayText: string;
  uiFilter: string;
  divider: string;
  border: string;
  borderHover: string;
  selected: string;
  highlight: string;
  badgePrimary: string;
  badgeSecondary: string;
  shadow: string;
}

export type Themes = Record<ThemeName, Theme>;
