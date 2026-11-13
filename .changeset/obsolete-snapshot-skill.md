---
'vitest-plugin-vis': minor
'storybook-addon-vis': minor
---

Ship the `remove-obsolete-image-snapshots` agent skill. It tells a coding agent to run the full suite, read the obsolete image snapshot list, keep the baselines of tests that run only on some platforms or runs, and remove the rest with `-u` or `vitest-plugin-vis prune`.
