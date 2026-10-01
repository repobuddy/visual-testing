---
'vitest-plugin-vis': patch
'storybook-addon-vis': patch
---

Trim leading and trailing whitespace from test and suite names when building the snapshot path (#847).

Storybook appends two spaces to the `describe` title it generates for a CSF Next story that uses `story.test()`. Those spaces became two dashes in the snapshot folder name, so the snapshots landed under `<story>--/`.

Snapshots of `story.test()` stories now land under `<story>/`. Move or regenerate the existing baselines from `<story>--/` to `<story>/`. Snapshot paths of plain stories and regular tests do not change.
