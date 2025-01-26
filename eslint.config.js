import globals from 'globals';
import eslintJs from '@eslint/js';

export default [
	{ ignores: ['test/fixtures/**/*', 'test/__snapshots__/**/*'] },

	eslintJs.configs.recommended,

	{
		languageOptions: {
			globals: { ...globals.node, ...globals.jest },
			ecmaVersion: 2020,
			sourceType: 'module'
		},

		rules: { 'no-empty': 0 }
	}
];
