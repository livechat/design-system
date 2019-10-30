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
import typescriptPlugin from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import pkg from './package.json'; // eslint-disable-line

const cssExportMap = {};

const mergeAll = objs => Object.assign({}, ...objs);

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
};

function getNamedExports(moduleIds) {
  const result = {};
  moduleIds.forEach(id => {
    // eslint-disable-next-line
    result[id] = Object.keys(require(id));
  });
  return result;
}

const commonPlugins = [
  nodeResolve({ jsnext: true }),
  postcss({
    modules: {
      getJSON(id, exportTokens) {
        cssExportMap[id] = exportTokens;
      },
      generateScopedName: 'lc-[local]'
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
    sourceMap: false,
    getExportNamed: false,
    getExport(id) {
      return cssExportMap[id];
    },
    extract: pkg.style
  }),
  typescriptPlugin({
    typescript,
    tsconfig: 'tsconfig.json',
    useTsconfigDeclarationDir: true
  }),
  babel({
    exclude: 'node_modules/**',
    plugins: [
      'external-helpers',
      ['transform-react-remove-prop-types', { mode: 'unsafe-wrap' }]
    ]
  }),
  commonjs({
    namedExports: getNamedExports(['react', 'react-dom', 'prop-types'])
  })
];

const configBase = {
  input: 'src/index.js',
  external: makeExternalPredicate(
    Object.keys(pkg.dependencies || {}).concat(
      Object.keys(pkg.peerDependencies || {})
    )
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
        'react-dom': 'ReactDOM'
      }
    },
    external: makeExternalPredicate(Object.keys(pkg.peerDependencies || {}))
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
          unsafe_comps: true
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
