---
"vitest-plugin-vis": minor
---

Allow `setAutoSnapshotOptions` to specify additional properties.
Each theme in `vis.presets.theme()` and `vis.afterEach.matchPerTheme()` will receive the options.

```ts
vis.presets.theme({
	theme1(options) { ... }
})
```
