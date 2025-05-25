---
"vitest-plugin-vis": major
---

Remove server context from `/server-api`. It can't be used outside of Vitest.
Rename `/server-api` to `/server-utils` as it is not an API.
