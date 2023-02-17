const foundations = ['Typography', 'ColorTokens', 'Icons'].map(
  (name) => `../src/stories/${name}.stories.mdx`
);
module.exports = {
  stories: [
    ...foundations,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    interactionsDebugger: true, // 👈 Enable playback controls
  },
};
