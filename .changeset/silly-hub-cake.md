---
"storybook-addon-vis": patch
---

Fix `defineStorybookVis` returning a `file://` URL instead of a filesystem path.

`import.meta.resolve` returns a `file://` URL, which `path.join` corrupts when appending `preset` — collapsing `file:///` to `file:/`. Storybook's resolver then silently fails to find `preset.js`, so the addon's `experimental_serverChannel` was never registered and snapshot images never loaded. Wrapping the result with `fileURLToPath` produces a plain filesystem path that resolves correctly.
