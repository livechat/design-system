import '../src/themes/legacy.scss';
import '../src/themes/light.scss';
import '../src/themes/dark.scss';
import '../src/foundations/spacing.css';
import '../src/foundations/shadow.css';
import '../src/foundations/color-scheme.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    exclude: ['className'],
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    disable: true,
  },
  themes: {
    default: 'legacy',
    list: [
      { name: 'legacy', class: 'lc-legacy-theme', color: '#4284f5' },
      { name: 'light', class: 'lc-light-theme', color: '#06f' },
      { name: 'dark', class: 'lc-dark-theme', color: '#000' },
    ],
  },
};
