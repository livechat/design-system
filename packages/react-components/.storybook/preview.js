import { mockDateDecorator } from 'storybook-mock-date-decorator';

import '../src/themes/legacy.scss';
import '../src/themes/light.scss';
import '../src/themes/dark.scss';
import '../src/foundations/spacing.css';
import '../src/foundations/shadow.css';
import '../src/foundations/color-scheme.css';
import '../src/foundations/radius.css';
import '../src/foundations/transition.css';

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
      { name: 'legacy', class: 'lc-legacy-theme', color: '#4284f5' },
      { name: 'light', class: 'lc-light-theme', color: '#06f' },
      { name: 'dark', class: 'lc-dark-theme', color: '#000' },
    ],
  },
};
