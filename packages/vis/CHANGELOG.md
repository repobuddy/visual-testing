# v0.0.16 (Tue Oct 29 2024)

## 0.5.0

### Minor Changes

- [`4fdecf8`](https://github.com/repobuddy/storybook-addon-vis/commit/4fdecf8939559af982fca8aec6b267870eb7a75f) Thanks [@unional](https://github.com/unional)! - Rename `customizeFilename` to `customizeSnapshotId`.

## 0.4.1

### Patch Changes

- [#25](https://github.com/repobuddy/storybook-addon-vis/pull/25) [`e251f43`](https://github.com/repobuddy/storybook-addon-vis/commit/e251f4321bf29c05e540cfd4636612177db4ca7d) Thanks [@unional](https://github.com/unional)! - Update snapshot failure message so that the message `press u to update snapshot` will show.

## 0.4.0

### Minor Changes

- [`20c5bc7`](https://github.com/repobuddy/storybook-addon-vis/commit/20c5bc7efb862b77b5e94de3f3f515b2e598da26) Thanks [@unional](https://github.com/unional)! - Support update snapshot

### Patch Changes

- [`42219eb`](https://github.com/repobuddy/storybook-addon-vis/commit/42219ebb3039b1629cfe0ab08bf9e92e419406e2) Thanks [@unional](https://github.com/unional)! - Fix [#20](https://github.com/repobuddy/storybook-addon-vis/issues/20).
  Serialize the image takes a long time.

## 0.3.0

### Minor Changes

- [`d9be0aa`](https://github.com/repobuddy/storybook-addon-vis/commit/d9be0aa6d393c66ccb93c079b2f4c11e96a3b254) Thanks [@unional](https://github.com/unional)! - Add `page.imageSnapshot({ customizeFilename() {...} })`.

## 0.2.0

### Minor Changes

- [`f55bb95`](https://github.com/repobuddy/storybook-addon-vis/commit/f55bb9560c069388cf3bfdfb0a4df52e99ad121c) Thanks [@unional](https://github.com/unional)! - Change `getSnapshotPlatform()` to return `local` when not on CI.
  This is the best setup I have found so far to make the snapshot test work on both local and CI.

  Set default snapshot path with `getSnapshoPlatform` function.

## 0.1.0

### Minor Changes

- [`1e03ebb`](https://github.com/repobuddy/storybook-addon-vis/commit/1e03ebb3e9c9ab525d489b604cd72e337879adb6) Thanks [@unional](https://github.com/unional)! - Add `commands.getSnapshotPlatform()`.

- [`0f61d50`](https://github.com/repobuddy/storybook-addon-vis/commit/0f61d50b55a581848cce0f9c19fae5a7c13d7ee4) Thanks [@unional](https://github.com/unional)! - Add `commande.isCI` for CI detection during `vitest.setup.ts`

### Patch Changes

- [`18383d9`](https://github.com/repobuddy/storybook-addon-vis/commit/18383d9642ed97789baeee395503641e045a86f6) Thanks [@unional](https://github.com/unional)! - Fix plugin default browser.

- [`840f50d`](https://github.com/repobuddy/storybook-addon-vis/commit/840f50dec81776d2918ed118871bbba17771b1ea) Thanks [@unional](https://github.com/unional)! - Fix clean up during `beforeAll` hook.

#### ⚠️ Pushed to `main`

- test: cover image resizer ([@unional](https://github.com/unional))
- fix: rename vite plugin name ([@unional](https://github.com/unional))
- fix: rename plugin ([@unional](https://github.com/unional))
- chore: remove extra files ([@unional](https://github.com/unional))
- chore: add verify script ([@unional](https://github.com/unional))
- chore: ignore **snapshots**/\*/**results** and diff ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.15 (Tue Oct 29 2024)

#### ⚠️ Pushed to `main`

- test: move tests to per platform ([@unional](https://github.com/unional))
- test: add test for image resizer ([@unional](https://github.com/unional))
- chore: remove prop-types ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.14 (Mon Oct 28 2024)

#### 🐛 Bug Fix

- Add renovate.json [#1](https://github.com/repobuddy/storybook-addon-vis/pull/1) ([@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 1

- [@renovate[bot]](https://github.com/renovate[bot])

---

# v0.0.13 (Mon Oct 28 2024)

#### ⚠️ Pushed to `main`

- feat: param support ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.12 (Mon Oct 28 2024)

#### ⚠️ Pushed to `main`

- chore: add editorconfig ([@unional](https://github.com/unional))
- feat: add configureSnapshotBeforeAll options ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.11 (Mon Oct 28 2024)

#### ⚠️ Pushed to `main`

- docs: top readme link ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.10 (Mon Oct 28 2024)

#### ⚠️ Pushed to `main`

- docs: update readme ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.9 (Mon Oct 28 2024)

#### ⚠️ Pushed to `main`

- fix: avoid top-level await ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.8 (Mon Oct 28 2024)

#### 🐛 Bug Fix

- Remove-reject [#4](https://github.com/repobuddy/storybook-addon-vis/pull/4) ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.7 (Mon Oct 28 2024)

#### ⚠️ Pushed to `main`

- fix: remove dep on StoryContext ([@unional](https://github.com/unional))
- chore: import link ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.6 (Mon Oct 28 2024)

#### ⚠️ Pushed to `main`

- test: use storybook/test ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.5 (Mon Oct 28 2024)

#### ⚠️ Pushed to `main`

- fix: stub imagesnapshot result and handling in storybook ([@unional](https://github.com/unional))
- feat: invert vitest expect extend ([@unional](https://github.com/unional))
- feat: invert storybook export extend ([@unional](https://github.com/unional))
- chore: remove extra import ([@unional](https://github.com/unional))
- chore: comment out preset ([@unional](https://github.com/unional))
- refactor: move logic file ([@unional](https://github.com/unional))
- feat: invert vitest-setup ([@unional](https://github.com/unional))
- chore: remove building managea, preview, and preset ([@unional](https://github.com/unional))
- test: update filename ([@unional](https://github.com/unional))
- feat: add match options ([@unional](https://github.com/unional))
- feat: take snapshot in lowercase ([@unional](https://github.com/unional))
- feat: basig tag support ([@unional](https://github.com/unional))
- refactor: test image ([@unional](https://github.com/unional))
- fix: extend vitest expect only once ([@unional](https://github.com/unional))
- refactor: move page.extend to context ([@unional](https://github.com/unional))
- refactor: comment out `rootDir` ([@unional](https://github.com/unional))
- refactor: move ([@unional](https://github.com/unional))
- fix: remove extra exports ([@unional](https://github.com/unional))
- fix: create dest folder when not exist ([@unional](https://github.com/unional))
- chore: rename readme ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.4 (Sat Oct 26 2024)

#### ⚠️ Pushed to `main`

- fix: clean up dependencies ([@unional](https://github.com/unional))
- chore: monorepo ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.2 (Fri Oct 25 2024)

#### ⚠️ Pushed to `main`

- feat: handle different size ([@unional](https://github.com/unional))
- feat: take snapshot on element ([@unional](https://github.com/unional))
- feat: add distribution ([@unional](https://github.com/unional))
- docs: misc update ([@unional](https://github.com/unional))
- feat: move default snapshot location ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))

---

# v0.0.1 (Fri Oct 25 2024)

#### ⚠️ Pushed to `main`

- feat: save diff ([@unional](https://github.com/unional))
- chore: remove story examples ([@unional](https://github.com/unional))
- feat: toMatchImageSnapshot ([@unional](https://github.com/unional))
- refactor: clean ([@unional](https://github.com/unional))
- chore: update git-graph config ([@unional](https://github.com/unional))
- feat: page.imageShapshot ([@unional](https://github.com/unional))
- chore: vscode extension ([@unional](https://github.com/unional))
- chore: vscode settings ([@unional](https://github.com/unional))
- chore: removt cjs build ([@unional](https://github.com/unional))
- feat: imageData conversion ([@unional](https://github.com/unional))
- chore: comment example code ([@unional](https://github.com/unional))
- test: indicate unit test ([@unional](https://github.com/unional))
- fix: stop example exports ([@unional](https://github.com/unional))
- chore: delete eject ([@unional](https://github.com/unional))
- chore: audit ([@unional](https://github.com/unional))
- feat: add context proxy ([@unional](https://github.com/unional))
- fix: use esnext and bundler config ([@unional](https://github.com/unional))
- chore: add commitlint and changesets ([@unional](https://github.com/unional))
- refactor: rename file ([@unional](https://github.com/unional))
- refactor: add biome ([@unional](https://github.com/unional))
- docs: add doc for delay ([@unional](https://github.com/unional))
- chore: @storybook/experimental-addon-test ([@unional](https://github.com/unional))
- feat: add params ([@unional](https://github.com/unional))
- add nra2 ([@unional](https://github.com/unional))
- project setup ([@unional](https://github.com/unional))
- Initial commit ([@unional](https://github.com/unional))

#### Authors: 1

- Homa Wong ([@unional](https://github.com/unional))
