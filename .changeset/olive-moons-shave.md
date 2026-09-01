---
'storybook-addon-vis': patch
---

Wait for the vitest browser modules before using them.

`commands` and `page` are backed by a dynamic import that nothing awaited, so a
hook reading `commands.setupVisSuite` before it settled got `undefined` and
failed with `commands.setupVisSuite is not a function` — inside a genuine vitest
browser run. Command reads now return a function that waits for the import, and
the addon's `beforeAll` awaits the module load before touching `page` or the
current test.
