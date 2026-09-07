---
'storybook-addon-vis': patch
'vitest-plugin-vis': patch
---

Pin `type-plus` to `8.0.0-beta.10`, exactly.

Both packages already declared `type-plus: ^8.0.0-beta.10` in the last published release
(`storybook-addon-vis@4.2.7`, `vitest-plugin-vis@5.1.4`), so this is a range tightening,
not a version move: `type-plus` 8's `typescript >= 5.6.0` peer already reaches consumers
today, and this change does not alter what a fresh install resolves — it only forecloses
later `8.0.0-beta.x` prereleases plus `8.0.0` and `8.1.0`.

The version is pinned rather than caret-ranged. `^8.0.0-beta.10` resolves to
`>=8.0.0-beta.10 <9.0.0-0`, which admits every later 8.0.0 prerelease as well as `8.0.0`
and `8.1.0` — and 8 is a prerelease line where breaking changes land between betas
(beta.10 to beta.11 changed `Equal`'s signature and removed `isType.f`). An exact version
makes each bump a reviewable PR instead of something a lockfile refresh can do silently.
Move back to a caret when 8.0.0 is stable.

`type-plus` types leak into each package's emitted declarations:
`storybook-addon-vis`'s `dist/exports/vitest-plugin.d.mts` imports `Omit` from
`type-plus`; `vitest-plugin-vis`'s `dist/shared/commands.types.d.mts` and
`dist/server/testing/stubSuite.d.mts` import `Pick` and `RecursivePartial`. None of
these symbols changed between 7 and 8, so no source change was needed.
