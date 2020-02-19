const eslint = require('eslint');
const path = require('path');
const fs = require('fs');

const cli = new eslint.CLIEngine({
	fix: false,
	cache: false,
	errorOnUnmatchedPattern: true
});
const formatter = cli.getFormatter('tap');
function lint (file) {
	const report = cli.executeOnFiles(file);
	const text = formatter(report.results).replace(/^TAP.+\n.+\n.+\n/g, '');
	return Object.assign({ text }, report);
}

const FIXTURES = path.resolve(__dirname, 'fixtures');
fs.readdirSync(FIXTURES).forEach(dir => {
	if (dir[0] === '.') return;

	const p = f => path.resolve(FIXTURES, dir, f);

	describe(`Fixture: ${dir}`, () => {
		test('valid', () => {
			const report = lint(p('valid.js'));
			expect(report.text).not.toBeTruthy();
			expect(report).toHaveProperty('errorCount', 0);
			expect(report).toHaveProperty('warningCount', 0);
			expect(report.text).toMatchSnapshot(`fixtures/${dir}/valid.js`);
		});
		test('invalid', () => {
			const report = lint(p('invalid.js'));
			expect(report.text).toBeTruthy();
			expect(report.errorCount + report.warningCount).toBeGreaterThan(0);
			expect(report.text).toMatchSnapshot(`fixtures/${dir}/invalid.js`);
		});
	});
});
