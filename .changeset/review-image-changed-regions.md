---
"vitest-plugin-vis": minor
"storybook-addon-vis": patch
---

When an image snapshot mismatches, find the changed regions and write a review image.

The failure message now lists the changed regions (`Changed:`) and points to a review image (`Review:`).
The review image (`<name>.review.png`, next to the diff) places the baseline, result, and diff crops of each region side by side,
so a person or a coding agent can see what changed without opening the full images.
The regions are also written to `<name>.regions.json` next to the diff.
The review image is skipped, and the message says why, when the image size changed, there are more than 5 regions, or the regions cover more than half of the image.

Set `reviewImage: false` in `vis()` or `toMatchImageSnapshot()` to not write the review image.

The Storybook Vis panel does not list the review image as a diff.
