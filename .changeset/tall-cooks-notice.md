---
"vitest-plugin-vis": minor
---

Perform image comparison on the client side.
This is similar to `storybook-addon-vis@0.13.0`, but the image taking is still done on the server side.

Try to address the issue of the slower image comparison on the server side.

Export `matchImageSnapshot` function on the client side.
Mark `parseImageSnapshotSubject` as deprecated as it is not needed anymore.
