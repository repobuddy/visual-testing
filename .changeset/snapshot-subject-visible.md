---
'vitest-plugin-vis': patch
'storybook-addon-vis': patch
---

Fix auto snapshots hanging until the test timeout when `subject` matches a hidden element.

The `subject` selector was resolved with `document.querySelector()`, which returns the first match even when it is hidden. In Storybook, a selector such as `button` matched hidden buttons that Storybook adds to the document, so the screenshot waited for that element to become visible until the timeout. Auto snapshots now use the first visible match.

If the selector matches only hidden elements, the snapshot now fails right away with a "not visible" error instead of waiting until the timeout. If it matches nothing, `document.body` is still used.
