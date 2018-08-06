import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import uglify from 'rollup-plugin-uglify';
import postcssUrl from 'postcss-url';
import postcssImport from 'postcss-import';
import globalImport from 'postcss-global-import';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import cssnano from 'cssnano';
import pkg from './package.json'; // eslint-disable-line

const cssExportMap = {};

const mergeAll = objs => Object.assign({}, ...objs);

const commonPlugins = [
  nodeResolve({ jsnext: true }),
  postcss({
    modules: {
      getJSON(id, exportTokens) {
        cssExportMap[id] = exportTokens;
      },
      generateScopedName: 'lc_[local]'
    },
    plugins: [
      postcssImport(),
      globalImport(),
      postcssUrl({
        url: 'inline'
      }),
      precss(),
      autoprefixer(),
      cssnano()
    ],
    sourceMap: true,
    getExportNamed: false,
    getExport(id) {
      return cssExportMap[id];
    },
    extract: pkg.style
  }),
  babel({
    exclude: 'node_modules/**',
    presets: ['react', ['env', { modules: false }], 'stage-2'],
    plugins: ['transform-class-properties', 'external-helpers']
  }),
  commonjs()
];

const configBase = {
  input: 'src/index.js',
  external: Object.keys(pkg.dependencies || {}).concat(
    Object.keys(pkg.peerDependencies || {})
  ),
  plugins: commonPlugins
};

const umdConfig = mergeAll([
  configBase,
  {
    output: {
      file: `dist/${pkg.name.replace(/@.*\//, '')}.js`,
      format: 'umd',
      name: 'DesignSystem',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes'
      }
    },
    external: Object.keys(pkg.peerDependencies || {}).concat('prop-types')
  }
]);

const devUmdConfig = mergeAll([
  umdConfig,
  {
    plugins: umdConfig.plugins.concat(
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    )
  }
]);

const prodUmdConfig = mergeAll([
  umdConfig,
  {
    output: mergeAll([
      umdConfig.output,
      { file: umdConfig.output.file.replace(/\.js$/, '.min.js') }
    ])
  },
  {
    plugins: umdConfig.plugins.concat(
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    )
  }
]);

const webConfig = mergeAll([
  configBase,
  {
    output: [
      { file: pkg.module, format: 'es' },
      { file: pkg.main, format: 'cjs' }
    ]
  }
]);

export default [devUmdConfig, prodUmdConfig, webConfig];
