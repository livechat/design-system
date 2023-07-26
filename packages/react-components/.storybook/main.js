import { dirname, join } from 'path';
const foundations = ['Typography', 'ColorTokens', 'Icons', 'TablerIcons'].map(
  (name) => `../src/stories/${name}.stories.mdx`
);
module.exports = {
  stories: [
    ...foundations,
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('storybook-addon-themes'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-designs'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {
      legacyRootApi: true,
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
