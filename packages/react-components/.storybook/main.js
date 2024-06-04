import { dirname, join } from 'path';

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-themes',
    '@storybook/addon-backgrounds',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      legacyRootApi: true, // TODO: remove when local React will be migrated to v18
    },
  },
  docs: {
    autodocs: true,
  },
};
