import { ThemeClassName } from './constants';
import { Theme } from './types';

export const getThemeClassName = (theme: Theme): ThemeClassName =>
  theme === 'dark' ? ThemeClassName.Dark : ThemeClassName.Light;
