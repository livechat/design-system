import '@livechat/design-system-styles';

import './global.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    exclude: ['className'],
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
