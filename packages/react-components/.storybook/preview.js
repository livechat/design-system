import '@livechat/design-system-styles/dist/css/styles.css';

import './global.css';

export const parameters = {
  backgrounds: { disable: true },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    exclude: ['className'],
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
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
