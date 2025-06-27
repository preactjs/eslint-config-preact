import parser from '@babel/eslint-parser';
import eslintJS from '@eslint/js';
import compat from 'eslint-plugin-compat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import {
	globals,
	parserOptions,
	settings,
	rules
} from './shared.js';

const configs = [
	eslintJS.configs.recommended,
	{
		languageOptions: {
			parser,
			parserOptions,
			globals
		},
		plugins: {
			compat,
			react,
			'react-hooks': reactHooks
		},
		rules,
		settings
	}
];

export default configs;
