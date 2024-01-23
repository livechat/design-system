import { mockDateDecorator } from 'storybook-mock-date-decorator';
import { withThemeByClassName } from '@storybook/addon-themes';

import '../src/themes/legacy.scss';
import '../src/themes/light.scss';
import '../src/themes/dark.scss';
import '../src/foundations/spacing.css';
import '../src/foundations/shadow.css';
import '../src/foundations/color-scheme.css';
import '../src/foundations/radius.css';
import '../src/foundations/transition.css';
import { allModes } from './modes';

export const decorators = [
  mockDateDecorator,
  withThemeByClassName({
    themes: {
      light: 'lc-light-theme',
      dark: 'lc-dark-theme',
    },
    defaultTheme: 'light',
  }),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  // Test each story for ArticleCard in two modes
  chromatic: {
    modes: {
      light: allModes['light'],
      dark: allModes['dark'],
    },
  },
  // Disabled for daily Storybook usage, the background addon is enabled only for Chromatic tests
  backgrounds: {
    disable: true,
  },
};
