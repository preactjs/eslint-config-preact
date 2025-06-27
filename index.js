import {
	parserOptions,
	settings,
	globals,
	rules
} from './shared.js';

export default {
	// TODO: this is really only required for class property initializer methods, which are seeing declining usage.
	// At some point, we should un-ship the custom parser and let ESLint use esprima.
	parser: require.resolve('@babel/eslint-parser'),
	// Currently ignored due to the custom parser.
	parserOptions,
	// We don't use plugin:react/recommended here to avoid React-specific rules.
	extends: [
		'eslint:recommended'
	],
	plugins: [
		'compat',
		'react',
		'react-hooks'
	],
	globals,
	settings,
	rules
};
