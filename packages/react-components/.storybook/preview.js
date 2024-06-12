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
  withThemeByClassName({
    themes: {
      light: 'lc-light-theme',
      dark: 'lc-dark-theme',
    },
    defaultTheme: 'light',
  }),
];

export const parameters = {
  mockingDate: new Date(2024, 0, 1),
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  // Test each story in two modes
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
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Documentation', ['Welcome', '*'], 'Foundations', 'Components'],
      locales: 'en-US',
    },
  },
};
