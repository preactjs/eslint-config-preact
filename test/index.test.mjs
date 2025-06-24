import { describe, test, expect } from 'vitest';
import eslint from 'eslint';
import path from 'path';
import fs from 'fs';

const cli = new eslint.ESLint({
	fix: false,
	cache: false,
	errorOnUnmatchedPattern: true
});
async function lint (file) {
	const lintResults = await cli.lintFiles(file);
	const formatter = await cli.loadFormatter('tap');
	const text = formatter.format(lintResults).replace(/^TAP.+\n.+\n.+\n/g, '');
	return Object.assign({text}, lintResults[0]);
}

const FIXTURES = path.resolve(__dirname, 'fixtures');
fs.readdirSync(FIXTURES).forEach(dir => {
	if (dir[0] === '.') return;

	const p = f => path.resolve(FIXTURES, dir, f);

	describe(`Fixture: ${dir}`, () => {
		test('valid', async () => {
			const report = await lint(p('valid.js'));
			expect(report.text).not.toBeTruthy();
			expect(report).toHaveProperty('errorCount', 0);
			expect(report).toHaveProperty('warningCount', 0);
			expect(report.text).toMatchSnapshot(`fixtures/${dir}/valid.js`);
		});
		test('invalid', async () => {
			const report = await lint(p('invalid.js'));
			expect(report.text).toBeTruthy();
			expect(report.errorCount + report.warningCount).toBeGreaterThan(0);
			expect(report.text).toMatchSnapshot(`fixtures/${dir}/invalid.js`);
		});
	});
});
