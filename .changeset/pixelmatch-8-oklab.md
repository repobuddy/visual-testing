---
"vitest-plugin-vis": major
---

Update `pixelmatch` to v8.

pixelmatch 8 measures color difference with OKLab HyAB instead of YIQ.
The `diffOptions` API and the `threshold` range (0 to 1, default 0.1) are unchanged,
but the number of different pixels it counts changes.
A pixel comparison that passed before can now fail, or the other way around,
so review your failing snapshots after upgrading and update the baselines if the new result is correct.

`threshold: 1` no longer ignores every change.
It now means the difference between black and white, and some color pairs (such as black on a saturated color) are further apart than that.
