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
          name: 'Tab',
          components: './src/components/Tab/Tab.js'
        },
        {
          name: 'Tooltip',
          components: [
            './src/components/Tooltip/TooltipContent.js',
            './src/components/Tooltip/Tooltip.js'
          ],
          sectionDepth: 0
        },
        {
          name: 'Form',
          components: [
            './src/components/TextInput/TextInput.js',
            './src/components/RadioButton/RadioButton.js',
            './src/components/RadioGroup/RadioGroup.js',
            './src/components/FieldsGroup/FieldsGroup.js'
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
        <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?autoload=false"></script>
        <script src="https://unpkg.com/prettier@1.13.0/standalone.js"></script>
        <script src="https://unpkg.com/prettier@1.13.0/parser-babylon.js"></script>
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
          
          pre.prettyprint { display: block; background-color: #0a001f; font-size: 13px; font-family: monospace; margin: 0; padding: 8px 16px;}
          pre .tag { color: #99b2ff; }
          pre .nocode { background-color: none; color: #000 }
          pre .atv, pre .str, pre .kwd { color: #37f14a }
          pre .pln { color: #f8f8f8 }
          pre .atn { color: #ffd500 }
          pre .lit, pre .typ, pre .dec { color: #37f14a }
          pre .pun { color: #f8f8f8 }
          pre .com { color: #8900d1 }
          ol.linenums { margin-top: 0; margin-bottom: 0; color: #f8f8f8 }
          li.L0,li.L1,li.L2,li.L3,li.L5,li.L6,li.L7,li.L8 { list-style-type: none }
          li.L1,li.L3,li.L5,li.L7,li.L9 { }
        </style>
      `
    }
  },
  styles: {
    Playground: {
      root: {
        marginBottom: '10px'
      }
    }
  },
  theme: {
    fontFamily: {
      base: '"Source Sans Pro"',
      monospace: 'monospace'
    },
    fontSize: {
      base: 15,
      text: 15,
      small: 13,
      h1: 32,
      h2: 24,
      h3: 20,
      h4: 16,
      h5: 15,
      h6: 14
    }
  },
  editorConfig: {
    theme: 'night'
  },
  defaultExample: false
};
