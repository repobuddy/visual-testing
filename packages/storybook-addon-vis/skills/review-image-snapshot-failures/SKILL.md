---
name: review-image-snapshot-failures
user-invocable: false
description: Reviews a failed image snapshot through its review image instead of the full images, at a fraction of the tokens. Applies when a visual test fails with a `Snapshot ... mismatched` error from toMatchImageSnapshot, or when asked to run visual tests or update image snapshots, even if the request never mentions images.
---

# Review image snapshot failures

Use the review image of a failed image snapshot before opening any full image.

## Run the tests

Run the project's own test command (for example `vitest run`). Do not pass `-u` to make a failure go away. Updating baselines is step 5 below, and only for an intended change.

Snapshots live under `__vis__/`: `__baselines__` is expected, `__results__` is the latest run, `__diffs__` holds the diff of a failed comparison. Next to each diff, `<name>.review.png` is the review image and `<name>.regions.json` lists the changed regions.

## When a snapshot fails

1. **Read the error message first.** It gives the pixel count, any size change, the changed regions (`Changed:`), and the image paths. It is text and costs little.
2. **Open the review image** (`Review:`), not the full images. For each region it shows Expected, Actual, and the changed pixels in red, side by side. Open the full Expected, Actual, or Difference image only if the review image leaves the question open.
3. **If the message says the review image was skipped, read why.**
   - The image size changed: open only the Actual image. A size change means the layout changed.
   - Too many regions, or they cover most of the image: open the Difference image. Red pixels changed; yellow pixels are anti-aliasing and do not count. Open Expected and Actual only if the Difference image does not show what changed.
4. **If there is no `Review:` line**, the review image is turned off (`reviewImage: false`). The `Changed:` line still gives each region. Crop Expected and Actual to those regions with any image tool available, and open the crops.
5. **Decide what the change is.**
   - Intended by the task: update the baseline (run the tests with `-u`).
   - Same content, only the edges of text or shapes differ: rendering drift (fonts, operating system, browser). Report it; do not update the baseline.
   - Anything else is a regression. Fix it or report it.

Full explanation and measured token costs: the [Reviewing Failures with Agents](https://repobuddy.github.io/visual-testing/guides/reviewing-failures-with-agents/) page. The `llms.txt` in the package links it and names the copy in `node_modules` to read without network access.

## Validate

- The error message was read before any image was opened.
- No full Expected, Actual, or Difference image was opened while a `Review:` image existed and answered the question.
- `-u` was not run unless the change is what the task intended.
- A change that only differs at the edges of text or shapes was reported as rendering drift, and its baseline is unchanged (`git diff` shows no file under `__baselines__`).
