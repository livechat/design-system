import { dirname, join } from 'path';

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-designs'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-backgrounds'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {
      legacyRootApi: true, // TODO: remove when local React will be migrated to v18
    },
  },
  docs: {
    autodocs: true,
  },
};
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
