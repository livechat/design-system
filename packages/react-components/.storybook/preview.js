import { mockDateDecorator } from 'storybook-mock-date-decorator';

import '../src/themes/legacy.scss';
import '../src/themes/light.scss';
import '../src/themes/dark.scss';
import '../src/foundations/spacing.css';
import '../src/foundations/shadow.css';
import '../src/foundations/color-scheme.css';
import '../src/foundations/radius.css';
import '../src/foundations/transition.css';
import { allModes } from './modes';

export const decorators = [mockDateDecorator];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  backgrounds: {
    disable: true,
  },
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: 'lc-light-theme', color: '#06f' },
      { name: 'dark', class: 'lc-dark-theme', color: '#000' },
    ],
  },
  parameters: {
    chromatic: {
      //🔶 Test each story for ArticleCard in two modes
      modes: {
        light: allModes['light'],
        dark: allModes['dark'],
      },
    },
  },
};
