---
'storybook-addon-vis': patch
'vitest-plugin-vis': patch
---

Depend on the stable `type-plus` line instead of an 8.x prerelease.

Both packages carried `"type-plus": "8.0.0-beta.8"` as an exact pin in their
runtime `dependencies`. `type-plus@latest` is deliberately `7.6.2`; the 8.x line
is an unfinished major parked in prerelease. The exact pin forced every consumer
to install that prerelease, and consumers that also depend on something else
pinning a different 8.x beta resolved two copies of `type-plus`. The pin now
reads `^7.6.2`.

The only type this needed that 7.x does not export from its root is `Merge`, so
`Merge` is now declared locally in `vis_server_context.types.ts`. Emitted output
is otherwise byte-for-byte identical to the build under `8.0.0-beta.8`: the sole
difference in `dist` is that one alias moving from an import into the file. No
API change.
