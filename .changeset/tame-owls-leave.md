---
"storybook-addon-vis": minor
---

Move the `__results__` and `__diff_output__` directory one level up to reduce nesting.

```sh
# from
v __vis__
    v darwin # snapshot generated on macos by CI
        ˃ __diff_output__
        ˃ __result__
    ˃ linux # snapshot generated on linux by CI
        ˃ __diff_output__
        ˃ __result__
    v local # snapshot generated on local machine
        ˃ __diff_output__
        ˃ __result__
            v button.stories.tsx
                snapshot-1.png
                snapshot-2.png
        v button.stories.tsx
            snapshot-1.png
            snapshot-2.png

# to
v __vis__
    ˃ __diff_output__ # where the diff images are stored
        v button.stories.tsx
            snapshot-1.png
            snapshot-2.png
    ˃ __result__ # where the resulting snapshot of the current run are stored
        v button.stories.tsx
            snapshot-1.png
            snapshot-2.png
    ˃ darwin # snapshot generated on macos by CI
    ˃ linux # snapshot generated on linux by CI
    v local # snapshot generated on local machine
        v button.stories.tsx
            snapshot-1.png
            snapshot-2.png
```
