# review-image-snapshot-failures

Reviews a failed image snapshot through its review image instead of the full images, which costs far fewer tokens.

## When to use

An agent loads it when a visual test fails with a `Snapshot ... mismatched` error from `toMatchImageSnapshot`, or when it is asked to run visual tests or update image snapshots. It is not a slash command (`user-invocable: false`).

## What it does

1. Reads the error message: pixel count, size change, changed regions, image paths.
2. Opens the review image, not the full Expected, Actual, or Difference images.
3. Opens a full image only when the message says the review image was skipped.
4. Updates a baseline (`-u`) only for an intended change, and reports rendering drift instead.

## Install

It ships as a plugin in both the `vitest-plugin-vis` and `storybook-addon-vis` npm packages (`plugin.json` and `skills/` in the package), identical in each. The measured token costs are on the "Reviewing Failures with Agents" page.
