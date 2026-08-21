---
'vitest-plugin-vis': patch
---

Show snapshot paths in failure messages relative to the project root (`./__vis__/...`) instead of absolute.

Editors and terminals resolve the relative path just as well, and the output no longer leaks the local absolute path when a failure is pasted into a bug report. Paths outside the project root stay absolute. Filesystem operations are unaffected and still resolve to absolute paths.
