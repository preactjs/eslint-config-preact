export default {
	// TODO: this is really only required for class property initializer methods, which are seeing declining usage.
	// At some point, we should un-ship the custom parser and let ESLint use esprima.
	parser: require.resolve('babel-eslint'),

	// Currently ignored due to the custom parser.
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			modules: true,
			impliedStrict: true,
			experimentalObjectRestSpread: true,
			experimentalDecorators: true,
			jsx: true
		}
	},

	// We don't use plugin:react/recommended here to avoid React-specific rules.
	extends: [
		'eslint:recommended',
		'plugin:jest/recommended'
	],

	// TODO: preact-cli ships Jest now, Mocha may be a candidate for removal.
	plugins: [
		'compat',
		'react',
		'jest',
		'react-hooks'
	],

	env: {
		browser: true,
		es6: true,
		'jest/globals': true,
		node: true
	},

	globals: {
		expect: true,
		browser: true,
		global: true
	},

	settings: {
		// Preact CLI provides these defaults
		targets: ['last 2 versions'],
		polyfills: ['fetch', 'Promise'],
		react: {
			// eslint-plugin-preact interprets this as "h.createElement",
			// however we only care about marking h() as being a used variable.
			pragma: 'h',
			// We use "react 16.0" to avoid pushing folks to UNSAFE_ methods.
			version: '16.0'
		}
	},

	rules: {
		/**
		 * Preact / JSX rules
		 */
		'react/no-deprecated': 2,
		'react/react-in-jsx-scope': 0, // handled this automatically
		'react/display-name': [1, { ignoreTranspilerName: false }],
		'react/jsx-no-bind': [1, {
			ignoreRefs: true,
			allowFunctions: true,
			allowArrowFunctions: true
		}],
		'react/jsx-no-comment-textnodes': 2,
		'react/jsx-no-duplicate-props': 2,
		'react/jsx-no-target-blank': 2,
		'react/jsx-no-undef': 2,
		'react/jsx-tag-spacing': [2, { beforeSelfClosing: 'always' }],
		'react/jsx-uses-react': 2, // debatable
		'react/jsx-uses-vars': 2,
		'react/jsx-key': [2, { checkFragmentShorthand: true }],
		'react/self-closing-comp': 2,
		'react/prefer-es6-class': 2,
		'react/prefer-stateless-function': 1,
		'react/require-render-return': 2,
		'react/no-danger': 1,
		// Legacy APIs not supported in Preact:
		'react/no-did-mount-set-state': 2,
		'react/no-did-update-set-state': 2,
		'react/no-find-dom-node': 2,
		'react/no-is-mounted': 2,
		'react/no-string-refs': 2,

		/**
		 * Hooks
		 */
		'react-hooks/rules-of-hooks': 2,
		'react-hooks/exhaustive-deps': 1,

		/**
		 * General JavaScript error avoidance
		 */
		'constructor-super': 2,
		'no-caller': 2,
		'no-const-assign': 2,
		'no-delete-var': 2,
		'no-dupe-class-members': 2,
		'no-dupe-keys': 2,
		'no-duplicate-imports': 2,
		'no-else-return': 1,
		'no-empty-pattern': 0,
		'no-empty': 0,
		'no-extra-parens': 0,
		'no-iterator': 2,
		'no-lonely-if': 2,
		'no-mixed-spaces-and-tabs': [1, 'smart-tabs'],
		'no-multi-str': 1,
		'no-new-wrappers': 2,
		'no-proto': 2,
		'no-redeclare': 2,
		'no-shadow-restricted-names': 2,
		'no-shadow': 0,
		'no-spaced-func': 2,
		'no-this-before-super': 2,
		'no-undef-init': 2,
		'no-unneeded-ternary': 2,
		'no-unused-vars': [2, {
			args: 'after-used',
			ignoreRestSiblings: true
		}],
		'no-useless-call': 1,
		'no-useless-computed-key': 1,
		'no-useless-concat': 1,
		'no-useless-constructor': 1,
		'no-useless-escape': 1,
		'no-useless-rename': 1,
		'no-var': 1,
		'no-with': 2,

		/**
		 * General JavaScript stylistic rules (disabled)
		 */
		semi: 0,
		strict: [2, 'never'], // assume type=module output (cli default)
		'object-curly-spacing': [0, 'always'],
		'rest-spread-spacing': 0,
		'space-before-function-paren': [0, 'always'],
		'space-in-parens': [0, 'never'],
		'object-shorthand': 1,
		'prefer-arrow-callback': 1,
		'prefer-rest-params': 1,
		'prefer-spread': 1,
		'prefer-template': 1,
		quotes: [0, 'single', {
			avoidEscape: true,
			allowTemplateLiterals: true
		}],
		'quote-props': [2, 'as-needed'],
		radix: 1, // parseInt(x, 10)
		'unicode-bom': 2,
		'valid-jsdoc': 0
	}
};
