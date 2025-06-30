import eslintJS from '@eslint/js';
import globals from 'globals';

export default [
	{
		ignores: [
			"dist/**/*",
			"test/fixtures/**",
			"test/__snapshots__/**"
		]
	},
	eslintJS.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.node
			}
		},
		rules: {
			"no-empty": "off"
		}
	}
];
