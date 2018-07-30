const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { NODE_ENV } = process.env;

const config = {
  devtool: false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: require('./.babelrc.js')
          }
        ],
        exclude: /node_modules\/(?!buble)/
      },
      {
        test: /emotion\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    NODE_ENV === 'production' &&
      new webpack.optimize.ModuleConcatenationPlugin()
  ].filter(Boolean),
  node: {
    Buffer: false,
    setImmediate: false
  }
};

module.exports = config;
