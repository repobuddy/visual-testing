---
"vitest-plugin-vis": minor
"storybook-addon-vis": minor
---

Report obsolete image snapshots at the end of each run, and delete them with `-u`.

The plugin records every baseline a run uses.
At the end of the run it lists the baselines in the run's snapshot folders that the run did not use,
like Vitest's `obsolete` count for text snapshots. With `-u`, it deletes them.

It keeps snapshots of skipped, todo, and failed tests, baselines of test files with errors or outside the run,
and snapshot folders the run did not use, such as other platforms and projects.
Baselines of test files that are gone are listed only when the run covered the snapshot folder in full.

Snapshots taken in Storybook through `storybook-addon-vis` are tracked the same way.
