const foundations = ['Typography', 'ColorTokens', 'Icons'].map(
  (name) => `../src/stories/foundations/${name}.stories.mdx`
);

module.exports = {
  stories: [...foundations, '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-themes',
  ],

};
