export type ThemeName = 'legacy' | 'light';

export interface Theme {
  // Background
  background: string;
  // Surface
  surfaceBasicDefault: string;
  surfaceBasicSubtle: string;
  surfaceBasicHover: string;
  surfaceBasicActive: string;
  surfaceBasicDisabled: string;
  surfaceSecondaryDefault: string;
  surfaceSecondarySubtle: string;
  surfaceSecondaryHover: string;
  surfaceSecondaryDisabled: string;
  surfaceFeedbackInfo: string;
  surfaceFeedbackNegative: string;
  surfaceFeedbackWarning: string;
  surfaceFeedbackPositive: string;
  surfaceInvertDefault: string;
  surfaceInvertSubtle: string;
  surfaceInvertDisabled: string;
  surfaceOverlay: string;
  // Content
  contentDefault: string;
  contentSubtle: string;
  contentDisabled: string;
  contentWhiteLocked: string;
  contentInvertDefault: string;
  contentInvertSubtle: string;
  contentInvertDisabled: string;
  // Border
  borderDefault: string;
  borderSubtle: string;
  borderHover: string;
  borderDisabled: string;
  borderInvertDefault: string;
  borderInvertSubtle: string;
  borderInvertHover: string;
  borderInvertDisabled: string;
  // Accent colors
  colorActionActive: string;
  colorActionHover: string;
  colorActionDefault: string;
  colorActionDisabled: string;
  colorNegativeActive: string;
  colorNegativeHover: string;
  colorNegativeDefault: string;
  colorNegativeDisabled: string;
  colorWarningDefault: string;
  colorWarningHover: string;
  colorPositiveDefault: string;
  colorPositiveHover: string;
  colorPositiveDisabled: string;
  colorFilter: string;
  colorBot: string;
}

export type Themes = Record<ThemeName, Theme>;
