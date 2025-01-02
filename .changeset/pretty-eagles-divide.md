---
"vitest-plugin-vis": patch
---

Proxy `vitest/suite`.

This fix the warning message `Module "util" has been externalized for browser compatibility.` when it is loaded in the browser.

Fixes [#101](https://github.com/repobuddy/storybook-addon-vis/issues/101).
