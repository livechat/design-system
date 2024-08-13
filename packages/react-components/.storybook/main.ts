import { dirname, join } from 'path';
import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
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
  docs: {},
  typescript: {
    reactDocgen: false,
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      // workaround, see https://github.com/storybookjs/storybook/issues/25256
      assetsInclude: ['/sb-preview/runtime.js'],
    });
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

export default config;
