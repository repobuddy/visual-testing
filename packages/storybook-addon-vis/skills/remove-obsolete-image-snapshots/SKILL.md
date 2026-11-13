---
name: remove-obsolete-image-snapshots
user-invocable: false
description: Removes obsolete image snapshot baselines from vitest-plugin-vis without deleting ones a skipped or platform-gated test still needs. Use this skill when a test run prints `obsolete image snapshots found`, or when asked to clean up, prune, or remove old, unused, or orphaned image snapshots or baselines.
---

# Remove obsolete image snapshots

At the end of a run, `vitest-plugin-vis` lists the baselines the run did not use:

```txt
 vis  2 obsolete image snapshots found. Run with -u to remove them.
   ↳ __vis__/local/__baselines__/button.spec.tsx/old-name-1.png
```

With `-u` it deletes them. It already keeps the baselines of skipped, todo, and failed tests. This skill covers what it cannot see.

## Steps

1. **Run the full suite.** Use the project's own test command, with no `--project`, file, `-t`, `--shard`, or `--changed` filter. A filtered run does not list the folders of deleted or moved test files. Do not pass `-u` yet.
2. **Read the obsolete list** at the end of the output. If the run was interrupted or had an unhandled error, nothing is listed: fix that first.
3. **Check each listed file before deleting it.** Open the test file of its folder (`__baselines__/<test file>/`) and find the test or story the file name starts with. Keep the baseline, and do not run `-u`, if:
   - the test exists only on some platforms, browsers, or environments: defined inside an `if`, or gated by `skipIf` or `runIf` on a condition that differs between machines;
   - the snapshot is taken only on some runs: `toMatchImageSnapshot` inside an `if`, a loop over data that changes, or a test that reads an environment variable;
   - the story is included by tags or a filter that differs between runs (Storybook).

   A file whose test is gone, or that takes fewer snapshots than before, is obsolete.
4. **Remove the obsolete files.**
   - If every listed file is obsolete, run the same full command with `-u`. It deletes them and the folders they leave empty, and updates failing snapshots too, so the run must have no failing snapshot you have not reviewed.
   - If some must be kept, do not run `-u`. Delete the obsolete files one by one instead, and report the kept ones and why.
   - For the folders of deleted or moved test files on other platforms (for example `__vis__/linux/` and `__vis__/win32/` when you run locally), the run cannot see them. Run `vitest-plugin-vis prune --dry-run` through the project's package manager, check its list the same way, then run `vitest-plugin-vis prune` to delete them. It refuses when custom `snapshotSubpath` or `shortenLongSnapshotPaths` settings stop it from mapping folders to test files: then report the folders instead.

## Validate

- The full suite ran with no filter before anything was deleted.
- Every deleted baseline was checked against its test file.
- No baseline of a platform-gated or conditional test was deleted.
- `git status` shows only deletions under `__baselines__`, and the report names each kept baseline and why.
