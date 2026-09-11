import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    'storybook-addon-mock-date',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {
      strictMode: true,
    },
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
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
      optimizeDeps: {
        include: ['@sinonjs/fake-timers'],
      },
    });
  },
};

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

export default config;
