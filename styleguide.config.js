const path = require('path');
const config = require('./webpack.config.js');

module.exports = {
  pagePerSection: true,
  assetsDir: './assets',
  webpackConfig: config,
  title: 'Design System - LiveChat API Developers Docs and Guides',
  skipComponentsWithoutExample: true,
  require: [path.resolve(__dirname, './setup.js')],
  sections: [
    {
      name: 'Introduction',
      content: './docs/Introduction.md'
    },
    {
      name: 'Typography',
      content:
        './packages/design-system/src/foundations/Typography/Typography.md'
    },
    {
      name: 'Colors',
      content: './docs/colors/colors.md'
    },
    {
      name: 'Components',
      sectionDepth: 1,
      sections: [
        {
          name: 'Alerts',
          components: [
            './packages/design-system/src/components/Toast/Toast.js',
            './packages/design-system/src/components/Toast/ToastWrapper.js'
          ]
        },
        {
          name: 'Card',
          components: ['./packages/design-system/src/components/Card/Card.js']
        },
        {
          name: 'Notification System',
          content:
            './packages/design-system/src/components/NotificationSystem/NotificationSystem.md'
        },
        {
          name: 'Button',
          components: [
            './packages/design-system/src/components/Button/Button.js',
            './packages/design-system/src/components/ButtonGroup/ButtonGroup.js'
          ]
        },
        {
          name: 'Tab',
          components: './packages/design-system/src/components/Tab/Tab.js'
        },
        {
          name: 'Switch',
          components: './packages/design-system/src/components/Switch/Switch.js'
        },
        {
          name: 'Progress',
          components: [
            './packages/design-system/src/components/Progress/ProgressBar.js',
            './packages/design-system/src/components/Progress/ProgressCircle.js',
            './packages/design-system/src/components/UploadBar/FileUploadProgress.js',
            './packages/design-system/src/components/UploadBar/UploadBar.js'
          ]
        },
        {
          name: 'Modals',
          components: [
            './packages/design-system/src/components/Modal/ModalBase.js',
            './packages/design-system/src/components/Modal/ModalPortal.js',
            './packages/design-system/src/components/Modal/Modal.js',
            './packages/design-system/src/components/Modal/ActionModal.js'
          ]
        },
        {
          name: 'InAppMessages',
          components: [
            './packages/design-system/src/components/InAppMessage/InAppMessageBase.js',
            './packages/design-system/src/components/InAppMessage/InAppMessagePortal.js',
            './packages/design-system/src/components/InAppMessage/InAppMessage.js'
          ]
        },
        {
          name: 'Tooltip',
          content:
            './packages/design-system/src/components/TooltipNew/design-guide.md',
          components: [
            './packages/design-system/src/components/TooltipNew/PopperTooltip.js',
            './packages/design-system/src/components/TooltipNew/CssTooltip.js',
            './packages/design-system/src/components/TooltipNew/UserGuideTooltip.js'
          ]
        },
        {
          name: 'Dropdown',
          components: [
            './packages/design-system/src/components/Dropdown/Dropdown.js',
            './packages/design-system/src/components/Dropdown/DropdownList.js'
          ]
        },
        {
          name: 'Forms',
          components: [
            './packages/design-system/src/components/Form/Form.js',
            './packages/design-system/src/components/TextField/TextField.js',
            './packages/design-system/src/components/InputField/InputField.js',
            './packages/design-system/src/components/NumericInputField/NumericInput.js',
            './packages/design-system/src/components/TextAreaField/TextAreaField.js',
            './packages/design-system/src/components/RadioButton/RadioButton.js',
            './packages/design-system/src/components/CheckboxField/CheckboxField.js',
            './packages/design-system/src/components/FieldGroup/FieldGroup.js',
            './packages/design-system/src/components/FormGroup/FormGroup.js',
            './packages/design-system/src/components/SelectField/Select.js',
            './packages/design-system/src/components/SelectField/SelectField.js',
            './packages/design-system/src/components/MultiSelectField/MultiSelect.js',
            './packages/design-system/src/components/MultiSelectField/MultiSelectField.js'
          ]
        },
        {
          name: 'DatePicker',
          components: [
            './packages/design-system/src/components/DatePicker/DatePicker.js',
            './packages/design-system/src/components/DatePicker/RangeDatePicker.js'
          ]
        },
        {
          name: 'Loader',
          components: [
            './packages/design-system/src/components/Loader/Loader.js'
          ]
        }
      ]
    },
    {
      name: 'Changelog',
      content: './packages/design-system/CHANGELOG.md'
    }
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'docs/customized-components/ThemeWrapper'),
    LogoRenderer: path.join(__dirname, 'docs/customized-components/Logo'),
    TableOfContentsRenderer: path.join(
      __dirname,
      'docs/customized-components/Menu'
    ),
    ComponentsListRenderer: path.join(
      __dirname,
      'docs/customized-components/MenuList'
    ),
    HeadingRenderer: path.join(__dirname, 'docs/customized-components/Heading'),
    TabButtonRenderer: path.join(
      __dirname,
      'docs/customized-components/Button'
    ),
    'slots/CodeTabButton': path.join(
      __dirname,
      'docs/customized-components/ViewReactButton'
    )
  },
  template: {
    favicon: './assets/fav.ico',
    title: 'Design System - LiveChat API Developers Docs and Guides',
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
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?autoload=false"></script>
        <script src="https://unpkg.com/prettier@1.13.0/standalone.js"></script>
        <script src="https://unpkg.com/prettier@1.13.0/parser-babylon.js"></script>
        <style>
          body {
            font-family: 'Source Sans Pro',-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;
            font-size: 15px;
            line-height: 22px;
            font-weight: 400;
          }
          *[class^="lc-"] {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          *[class^="lc-"], *[class^="lc-"]:before, *[class^="lc-"]:after {
            box-sizing: inherit;
          }

          .view-html-btn {
            border-collapse: separate;
            caption-side: top;
            caret-color: auto;
            color: inherit;
            cursor: auto;
            empty-cells: show;
            font-family: inherit;
            font-feature-settings: normal;
            font-kerning: auto;
            font-size: inherit;
            font-stretch: normal;
            font-style: normal;
            font-variant-caps: normal;
            font-variant-east-asian: normal;
            font-variant-ligatures: normal;
            font-variant-numeric: normal;
            font-weight: normal;
            hyphens: none;
            image-rendering: auto;
            letter-spacing: normal;
            line-height: inherit;
            list-style-image: none;
            list-style-position: outside;
            list-style-type: disc;
            object-position: 50% 50%;
            orphans: 2;
            overflow-wrap: normal;
            pointer-events: auto;
            quotes: initial;
            tab-size: 8;
            text-align: initial;
            text-align-last: auto;
            text-combine-upright: none;
            text-indent: 0px;
            text-orientation: mixed;
            text-rendering: auto;
            text-shadow: none;
            text-transform: none;
            text-underline-position: auto;
            visibility: visible;
            white-space: normal;
            widows: 2;
            word-break: normal;
            word-spacing: normal;
            word-wrap: normal;
            writing-mode: horizontal-tb;
            -webkit-appearance: none;
            backface-visibility: visible;
            bottom: auto;
            box-shadow: none;
            padding: 8px 0;
            font-family: "Source Sans Pro",-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;
            font-size: 15px;
            color: #767676;
            background: transparent;
            text-transform: uppercase;
            transition: color 750ms ease-out;
            border: none;
            cursor: pointer;
          }

          .view-html-btn:hover, .view-html-btn:focus {
            outline: 0;
            color: #f28a25;
            transition: color 150ms ease-in;
          }

          .view-html-btn--active {
            border-bottom: 2px #f28a25 solid;
          }

          pre.prettyprint { display: block; background-color: #0a001f; font-size: 13px; font-family: monospace; margin: 0; padding: 8px 16px;}
          pre .tag { color: #99b2ff; }
          pre .nocode { background-color: transparent; color: #000 }
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
    sidebarWidth: '230px',
    borderRadius: '4px',
    fontFamily: {
      base:
        '"Source Sans Pro",-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;',
      monospace: 'monospace'
    },
    color: {
      base: '#424D57',
      light: '#7A8289',
      lightest: '#A0A6AB',
      link: '#4384F5',
      linkHover: '#4379D6',
      border: '#C6C9CC',
      error: '#D64646',
      sidebarBackground: '#F3F7F9'
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
