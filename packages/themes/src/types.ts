export type ThemeName = 'legacy' | 'light';

export interface Theme {
  interactive01: string;
  interactive02: string;
  uiBackground: string;
}

export type Themes = Record<ThemeName, Theme>;
