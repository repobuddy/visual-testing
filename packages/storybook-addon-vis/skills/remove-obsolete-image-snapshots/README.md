# remove-obsolete-image-snapshots

Removes obsolete image snapshot baselines without deleting the ones a skipped or platform-gated test still needs.

## When to use

An agent loads it when a run prints `obsolete image snapshots found`, or when it is asked to clean up old or orphaned image snapshots. It is not a slash command (`user-invocable: false`).

## What it does

1. Runs the full suite with no filter, so the folders of deleted or moved test files are listed too.
2. Reads the obsolete list at the end of the run.
3. Checks each entry for tests that exist or take snapshots only on some platforms or runs, and keeps their baselines.
4. Removes the rest with `-u`, or with `vitest-plugin-vis prune [--dry-run]` (`storybook-addon-vis prune [--dry-run]` in the addon) for folders of deleted or moved test files on other platforms. When `prune` refuses, it relies on the full run's list.

## Install

It ships as a plugin in both the `vitest-plugin-vis` and `storybook-addon-vis` npm packages (`plugin.json` and `skills/` in the package), identical in each. The behavior it relies on is on the [Updating baselines](https://repobuddy.github.io/visual-testing/visual-testing/updating-baselines/#obsolete-baselines) page.
