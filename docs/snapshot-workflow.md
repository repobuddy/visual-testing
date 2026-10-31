# Snapshot workflow

Baseline snapshots live in `__vis__/<platform>/**/__baselines__/` folders.
Linux baselines are `linux/`, Windows baselines are `win32/`.
CI renders both, so a change can need a snapshot update on each platform.

There are three ways to update baselines.

## A. Automatic, on every pull request

1. The `pull-request` workflow runs `pnpm verify:ci` on Ubuntu and Windows, on the two latest LTS Node versions.
   `verify:ci` runs the `coverage:u` and `testcase:u` tasks, which write baselines instead of failing on a diff.
2. `dorny/paths-filter` checks whether any baseline changed.
3. On the `lts/*` legs, [`repobuddy/vis-bot`](https://github.com/repobuddy/vis-bot) opens a snapshot pull request into the pull request's own branch.
   There is one per platform, named `vis-bot/update-snapshot/<branch>-<os>-lts-latest`.
4. Review the new renders, then merge the snapshot pull request into your branch.

Snapshot pull requests target a feature branch, not `main`, so the `all-checks` ruleset does not apply to them.
They are opened with `github.token`, which does not trigger workflows, so they do not start another verify run.

## B. Renovate and Dependabot pull requests

These can merge themselves, so a render change must not pass unreviewed.
When a branch named `renovate*` or `dependabot*` changes any baseline, the workflow:

- uploads the changed baselines as a `changed-baselines-*` artifact,
- fails the check with a link to the snapshot pull request (or to the artifact when none could be opened).

Review the render, then either merge the snapshot pull request into the branch or fix the regression.

## C. Manual

- Locally, run `pnpm test:u` to update your own baselines. Run it again after switching branches.
- Run the `update-snapshot` workflow (`workflow_dispatch`) on a branch to open a snapshot pull request for `linux/` only.
- Run the `pull-request` workflow (`workflow_dispatch`) with a `pr_number` to re-run verification for an existing pull request.

## Pull requests that only change baselines

The `main` ruleset requires the `all-checks` status. The `pull-request` workflow produces it, so it must run on every pull request to `main`.
The workflow has no `paths-ignore` filter for this reason: a filter that skips the workflow leaves `all-checks` pending forever and blocks the merge.
A baseline-only pull request runs the full matrix once and passes when the baselines already match.
