---
"vitest-plugin-vis": minor
---

Support customizing `platform` by @joekrump.

For example, with `vis({ platform: 'ci' })`,
Instead of saving the snapshots to `<root>/__vis__/{local or process.platform}`,
the snapshots will be saved to `<root>/__vis__/ci`.
