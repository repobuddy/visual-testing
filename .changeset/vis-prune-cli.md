---
"vitest-plugin-vis": minor
---

Add the `vitest-plugin-vis prune [--dry-run]` command.
It deletes the baseline folders of test files that were deleted or moved, without running tests, for every platform folder under `__vis__`.
`--dry-run` lists them instead.
It refuses and deletes nothing when a config sets `snapshotSubpath`, and keeps folders shortened by `shortenLongSnapshotPaths`.
