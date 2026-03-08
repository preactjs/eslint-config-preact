# eslint-config-preact

An unopinionated baseline ESLint configuration for Preact and Preact CLI codebases.

It helps you avoid bugs, and lets you know when there's a more optimal way to do things.

✅ **What's included:** sensible defaults for modern JS, JSX, Preact, Jest and Mocha.

⛔️ **What's not included:** no stylistic or subjective rules are provided.

## Installation

Install eslint and this config:

```
npm i -D eslint eslint-config-preact
```

Now in your `eslint.config.js` (ESLint 8, 9, or 10):

```ts
import preact from 'eslint-config-preact';
export default [
  ...preact
];
```

Or in CommonJS `eslint.config.cjs`:

```ts
const {default: preact} = require('eslint-config-preact');

module.exports = [
  ...preact
];
```

> **Note:** ESLint 10 dropped support for legacy `.eslintrc.*` config files. All users (including ESLint 8+ users) should use the flat config format (`eslint.config.js`) shown above.
