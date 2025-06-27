import { describe, test, expect, beforeAll } from 'vitest';
import eslint from 'eslint';
import path from 'path';
import fs from 'fs';

const configs = [
	'eslintrc.test.json',
	'eslint.config.test.mjs'
];
const FIXTURES_PATH = path.resolve(__dirname, 'fixtures');
const FIXTURES = fs.readdirSync(FIXTURES_PATH, {withFileTypes: true})
	.filter((dir) => dir.isDirectory())
	.map((dir) => dir.name);

async function lint (file, cli) {
	const lintResults = await cli.lintFiles(file);
	const formatter = await cli.loadFormatter('tap');
	const text = formatter.format(lintResults).replace(/^TAP.+\n.+\n.+\n/g, '');
	return Object.assign({text}, lintResults[0]);
}

for (const config of configs) {
	describe(`config: ${config}`, () => {
		let cli;

		beforeAll(async () => {
			const isESLintRC = config.endsWith('.json');
			const ESLint = await eslint.loadESLint({
				useFlatConfig: !isESLintRC,
			});
			cli = new ESLint({
				cwd: FIXTURES_PATH,
				fix: false,
				cache: false,
				errorOnUnmatchedPattern: true,
				overrideConfigFile: path.join(FIXTURES_PATH, config),
				...(isESLintRC ? {useEslintrc: false} : {})
			});
		});

		for (const dir of FIXTURES) {
			const p = f => path.join(dir, f);

			describe(`Fixture: ${dir}`, () => {
				test('valid', async () => {
					const report = await lint(p('valid.js'), cli);
					expect(report.text).not.toBeTruthy();
					expect(report).toHaveProperty('errorCount', 0);
					expect(report).toHaveProperty('warningCount', 0);
					expect(report.text).toMatchSnapshot(`fixtures/${dir}/valid.js`);
				});
				test('invalid', async () => {
					const report = await lint(p('invalid.js'), cli);
					expect(report.text).toBeTruthy();
					expect(report.errorCount + report.warningCount).toBeGreaterThan(0);
					expect(report.text).toMatchSnapshot(`fixtures/${dir}/invalid.js`);
				});
			});
		}
	});
}
