---
'vitest-plugin-vis': patch
'storybook-addon-vis': patch
---

Decode images in `toImageData` with `createImageBitmap` and close the bitmap after reading the pixels.

`new Image()` + `drawImage` left a full-size decode in Chromium's image decode cache for every compared image,
so renderer memory grew with each image snapshot comparison.
