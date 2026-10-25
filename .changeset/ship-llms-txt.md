---
'storybook-addon-vis': patch
'vitest-plugin-vis': patch
---

Ship an `llms.txt` in each package so coding agents can find the entry points and documentation pages.
It points agents to the new "Reviewing Failures with Agents" page, which tells them to open the review image of a failed image snapshot first, and shows what each view costs in tokens.

Each package is also an agent plugin for Claude Code, Cursor, Codex and Copilot CLI.
It ships the `review-image-snapshot-failures` skill, which tells an agent to read the error message and the review image before it opens a full image.
