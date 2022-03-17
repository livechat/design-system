import '@livechat/design-system-styles/css/themes/legacy.css';
import '@livechat/design-system-styles/css/themes/light.css';
import '@livechat/design-system-styles/css/themes/dark.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
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
