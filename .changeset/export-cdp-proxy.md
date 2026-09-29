---
'storybook-addon-vis': minor
---

Export `cdp`, a proxy of `cdp()` from `vitest/browser` that is safe to import from stories.

Importing `vitest/browser` directly in a story throws in a plain Storybook preview and blanks the story. `cdp` loads it only during a Vitest browser run, like the existing `page` and `commands` proxies, and session calls made before the import settles wait for it. Calling `cdp()` outside a Vitest browser run throws.

CDP is available only with the Playwright provider on Chromium.
