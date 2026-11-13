---
"vitest-plugin-vis": minor
"storybook-addon-vis": minor
---

Write a whole-image review image when cropping does not help, and add `reviewImage: 'full'`.

When a failed snapshot's review image cannot be cropped to its changed regions
(the image size changed, more than 5 regions, the regions cover more than half of the image, or no region is found),
`<name>.review.png` now places the whole baseline, result, and diff side by side instead of being skipped.
The smaller image is padded to the larger size when the size changed.
The `Review:` line says `(baseline, result, diff of the whole image; not cropped, <reason>)`.

`reviewImage` also accepts `'full'` to always write the whole-image review, like the composite image of `jest-image-snapshot`.
In `storybook-addon-vis`, `storybookVis({ reviewImage: 'full' })` takes the same value.
