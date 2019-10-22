const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postCssFlexbugsfixes = require('postcss-flexbugs-fixes');

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
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: 'lc-[local]'
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                postCssFlexbugsfixes,
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: 'lc-[local]'
            }
          },
          require.resolve('sass-loader')
        ]
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
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      interfaces: path.resolve(__dirname, 'src/interfaces')
    },
    extensions: ['.ts', '.tsx', '.d.ts', '.js', '.json']
  }
};

module.exports = config;
