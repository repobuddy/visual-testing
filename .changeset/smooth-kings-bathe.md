---
"vitest-plugin-vis": patch
---

Replace starting ".." with "__" in `trimCommonFolder` function.

This allows test project to reference tests in other projects within a monorepo.
