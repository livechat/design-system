const path = require('path');
const config = require('./webpack.config.js');

module.exports = {
  pagePerSection: true,
  assetsDir: './assets',
  webpackConfig: config,
  title: 'LC Design System',
  skipComponentsWithoutExample: true,
  require: [path.resolve(__dirname, 'setup.js')],
  sections: [
    {
      name: 'Introduction',
      content: './docs/Introduction.md'
    },
    {
      name: 'Foundations',
      sections: [
        {
          name: 'Typography',
          content: './src/foundations/Typography/Typography.md'
        }
      ],
      sectionDepth: 2
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Button',
          components: './src/components/Button/Button.js'
        },
        {
          name: 'Normalize',
          content: './src/components/Normalize/Normalize.md'
        },
        {
          name: 'Tab',
          components: './src/components/Tab/Tab.js'
        },
        {
          name: 'Toast',
          components: './src/components/Toast/Toast.js'
        },
        {
          name: 'Tooltip',
          components: [
            './src/components/Tooltip/TooltipContent.js',
            './src/components/Tooltip/Tooltip.js'
          ],
          sectionDepth: 0
        }
      ]
    }
  ],
  template: {
    title: 'LC Design System',
    head: {
      links: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://cdn.jsdelivr.net/npm/normalize.css@8.0.0/normalize.css'
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600'
        }
      ],
      raw: `
        <style>
          body {
            font-family: 'Source Sans Pro';
          }
          *[class^="lc-"] {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          *[class^="lc-"], *[class^="lc-"]:before, *[class^="lc-"]:after {
            box-sizing: inherit;
          }
        </style>
      `
    }
  },
  defaultExample: false
};
