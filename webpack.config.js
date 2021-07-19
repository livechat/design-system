const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postCssFlexbugsfixes = require('postcss-flexbugs-fixes');
const { webpack: lernaAliases } = require('lerna-alias');

const { NODE_ENV } = process.env;

const config = {
  devtool: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: /src/,
        use: ['ts-loader']
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules\/(?!(ansi-styles|strip-ansi|ansi-regex|debug|react-dev-utils|chalk|buble)\/).*/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: 'lc-[local]' 
              }
            }
          },
          require.resolve('sass-loader')
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    NODE_ENV === 'production' &&
      new webpack.optimize.ModuleConcatenationPlugin()
  ].filter(Boolean),
  node: {
    Buffer: false,
    setImmediate: false
  },
  resolve: {
    alias: lernaAliases(),
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
};

module.exports = config;
