---
'storybook-addon-vis': patch
'vitest-plugin-vis': patch
---

Raise dependency floors to pull in security fixes.

`glob`, `rimraf`, `pathe`, `dedent`, `is-ci`, and `pixelmatch` move up within
their existing major, which resolves the advisories reaching the runtime
dependency tree through `brace-expansion` and `tmp`. No API change.
