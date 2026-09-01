---
'vitest-plugin-vis': patch
---

Stop the `server` proxy from throwing before the vitest browser module loads.

`server`'s `get` trap fell back to `(ctx?.server as any)[prop]`. The optional
chain guards `ctx`, but the property access straight after it does not, so any
read of `server.<prop>` before the dynamic `import('vitest/browser')` settled —
or outside a browser run, where it never settles — threw
`TypeError: Cannot read properties of undefined` instead of returning
`undefined`. The fallback is now optional too.
