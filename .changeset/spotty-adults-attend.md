---
"vitest-plugin-vis": minor
---

Change `import { matchImageSnapshot } from 'vitest-plugin-vis/client'` to `import { imageSnapshotMatcher } from 'vitest-plugin-vis/client'`.

This is a bug in 1.2.0 because `matchImageSnapshot` is hard loading `@vitest/browser/context`, which causes storybook to fail to load.
