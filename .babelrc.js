const { BABEL_ENV, NODE_ENV } = process.env
const cjs = BABEL_ENV === 'cjs' || NODE_ENV === 'test'

module.exports = {
	presets: [['es2015', { loose: true, modules: false }], 'react', 'stage-2'],
	plugins: [['emotion', { autoLabel: NODE_ENV === 'development' , "extractStatic": true}], cjs && 'transform-es2015-modules-commonjs'].filter(
		Boolean,
	),
}