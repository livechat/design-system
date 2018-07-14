const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const { NODE_ENV } = process.env

const config = {
	devtool: false,
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: require('./.babelrc.js'),
					},
				],
				exclude: /node_modules\/(?!buble)/,
			},
			{
				test: /emotion\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: {
						loader: 'css-loader',
						options: {
							sourceMap: true,
							// TODO: investigate, it's recommended here:
							// https://github.com/emotion-js/emotion/blob/master/docs/webpack.md
							// but it's changing css selectors and things stop to work
							// modules: true,
						},
					},
				}),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
		NODE_ENV === 'production' && new webpack.optimize.ModuleConcatenationPlugin(),
	].filter(Boolean),
	node: {
		Buffer: false,
		setImmediate: false,
	},
}

module.exports = config