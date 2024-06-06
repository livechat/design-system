import { dirname, join } from 'path';

export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-backgrounds'),
    getAbsolutePath('@chromatic-com/storybook'),
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      legacyRootApi: true, // TODO: remove when local React will be migrated to v18
    },
  },
  docs: { autodocs: 'tag' },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
