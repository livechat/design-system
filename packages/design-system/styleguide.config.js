const path = require('path')
const config = require('./webpack.config.js')

module.exports = {
	showCode: true,
	showUsage: true,
	webpackConfig: config,
	title: 'LC Design System',
	skipComponentsWithoutExample: true,
	// styleguideComponents: {
	// 	Wrapper: path.join(__dirname, './Wrapper'),
	// 	StyleGuideRenderer: path.join(__dirname, './StyleGuideRenderer'),
	// },
	require: [path.resolve(__dirname, 'setup.js')],
	sections: [
		{
			name: 'Introduction',
			content: './docs/Introduction.md',
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Button',
          // content: './src/components/Button/Button.md',
          components: './src/components/Button/Button.js',
        },
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
          href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600'
        },
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: './assets/style.css'
        }
      ]
    }
  },
  defaultExample: false
}