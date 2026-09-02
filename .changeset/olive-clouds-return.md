---
'storybook-addon-vis': patch
'vitest-plugin-vis': patch
---

Depend on `type-plus` `^8.0.0-beta.10` — back on the 8.x line, as a range.

The previous release moved both packages to `^7.6.2`. That was the wrong fix.
These packages belong on the 8.x line; what was actually broken was that the
dependency was an *exact* pin (`8.0.0-beta.8`), so it could never resolve
forward and consumers were stuck on a build with a real CJS packaging defect:
`8.0.0-beta.8` declares `"type": "module"` but ships a `cjs/` build with no
`{"type":"commonjs"}` marker, so `require()` of these packages failed with
`ReferenceError: exports is not defined in ES module scope`.

`type-plus@8.0.0-beta.10` ships that `cjs/package.json` marker and fixes it. The
dependency is now the range `^8.0.0-beta.10` rather than a pin, so later 8.x
betas and stable 8.x flow in on their own instead of freezing at one build.

The root barrel of `8.0.0-beta.10` is byte-identical to `8.0.0-beta.8`'s, so
there is no API change between the two. The local `Merge` alias in
`vis_server_context.types.ts` stays as-is; it is version-independent.
