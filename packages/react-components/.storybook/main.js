const foundations = ['Typography', 'ColorTokens', 'Icons', 'TablerIcons'].map(
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
    'storybook-addon-designs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
