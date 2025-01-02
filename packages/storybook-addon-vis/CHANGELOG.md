# v0.0.16 (Tue Oct 29 2024)

## 0.15.4

### Patch Changes

- Updated dependencies [[`a8fcd75`](https://github.com/repobuddy/storybook-addon-vis/commit/a8fcd75a056cb5b16006c52190453f19e41ab182)]:
  - vitest-plugin-vis@1.0.2

## 0.15.3

### Patch Changes

- [`7667feb`](https://github.com/repobuddy/storybook-addon-vis/commit/7667febc8be0ba043d4927a0f76b14cd01b91c48) Thanks [@unional](https://github.com/unional)! - Export `ToMatchImageSnapshotOptions` type to avoid Inferred type can't be named error.

## 0.15.2

### Patch Changes

- [#119](https://github.com/repobuddy/storybook-addon-vis/pull/119) [`3567475`](https://github.com/repobuddy/storybook-addon-vis/commit/35674751157650a6685dd04c0676796bf7baa75d) Thanks [@unional](https://github.com/unional)! - Remove `/manager` and `/preset` should not include `previewAnnotations`.

## 0.15.1

### Patch Changes

- [#115](https://github.com/repobuddy/storybook-addon-vis/pull/115) [`eec65da`](https://github.com/repobuddy/storybook-addon-vis/commit/eec65da0a3f5a3470d262bf7539e7bc4fd80804a) Thanks [@unional](https://github.com/unional)! - Proxy `getCurrentTest()` from `vitest/suite`.

  This is part of the work to fix [#101](https://github.com/repobuddy/storybook-addon-vis/issues/101).

- Updated dependencies [[`ae98ec4`](https://github.com/repobuddy/storybook-addon-vis/commit/ae98ec47df104c80723892345946aebb65cb361c)]:
  - vitest-plugin-vis@1.0.1

## 0.15.0

### Minor Changes

- [#113](https://github.com/repobuddy/storybook-addon-vis/pull/113) [`6283c1d`](https://github.com/repobuddy/storybook-addon-vis/commit/6283c1d2bb3451de6e3f70c467b3a2fe689c2d37) Thanks [@unional](https://github.com/unional)! - Remove `visAnnotations` from `storybook-addon-vis` main export.
  Use `visAnnotations` from `storybook-addon-vis/preview` instead:

  <https://github.com/repobuddy/storybook-addon-vis/blob/main/packages/storybook-addon-vis/readme.md#edit-vitest-setup>

### Patch Changes

- [#113](https://github.com/repobuddy/storybook-addon-vis/pull/113) [`3143283`](https://github.com/repobuddy/storybook-addon-vis/commit/31432831069585792f9dba6eb3b8e83beb87da3e) Thanks [@unional](https://github.com/unional)! - Add `/preview` export for `visAnnotations`.

- [#113](https://github.com/repobuddy/storybook-addon-vis/pull/113) [`79d10d5`](https://github.com/repobuddy/storybook-addon-vis/commit/79d10d5091232e16e5269746438466657a5eefc4) Thanks [@unional](https://github.com/unional)! - Remove `viteFinal` setup in `/preset`.
  You need to configure Vitest in `vitest.config.ts` for Vitest Browser Mode anyway.
  So getting the config to `.storybook/main.ts` is actually worst.

- [#114](https://github.com/repobuddy/storybook-addon-vis/pull/114) [`673b202`](https://github.com/repobuddy/storybook-addon-vis/commit/673b202f4a3c61d68620c061e24fc6903e1774fe) Thanks [@unional](https://github.com/unional)! - Remove extra `visAnnotations.beforeAll()`.
  This is handled by `vitest-plugin-vis` and only need on `vitest.beforeAll`.

- [#113](https://github.com/repobuddy/storybook-addon-vis/pull/113) [`78f2776`](https://github.com/repobuddy/storybook-addon-vis/commit/78f2776e62847240988538f9bf606b491c4ef09b) Thanks [@unional](https://github.com/unional)! - Consolidate preview annotation in one place.

- [`49279f1`](https://github.com/repobuddy/storybook-addon-vis/commit/49279f1b8dc61a8710ca21cd20cfe6841acb8189) Thanks [@unional](https://github.com/unional)! - Remove unused dependencies.

## 0.14.0

### Minor Changes

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`1c6830b`](https://github.com/repobuddy/storybook-addon-vis/commit/1c6830b322881a489a2480467c0961dfeedd35f4) Thanks [@unional](https://github.com/unional)! - export `trimCommonFolder()`.
  This is made available for customizing snapshot subpath.

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`c447676`](https://github.com/repobuddy/storybook-addon-vis/commit/c4476761d8e6e961950433358af336ae2d3b22f1) Thanks [@unional](https://github.com/unional)! - Support `Locator` [#2](https://github.com/repobuddy/storybook-addon-vis/issues/2).

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`c39daf0`](https://github.com/repobuddy/storybook-addon-vis/commit/c39daf057ddc9f3cab8b3a26b69ced66c4d8d560) Thanks [@unional](https://github.com/unional)! - create baseline snapshot on server.

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`03b1e6b`](https://github.com/repobuddy/storybook-addon-vis/commit/03b1e6b5f099cd9fdc8ffdb299e34703cca2d0ac) Thanks [@unional](https://github.com/unional)! - Allow commands to work in `webdriverio`.

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`fa4dd12`](https://github.com/repobuddy/storybook-addon-vis/commit/fa4dd120311ccfee31366fa43243899c4ac46436) Thanks [@unional](https://github.com/unional)! - Rewritten to use [`vitest-plugin-vis`](https://www.npmjs.com/package/vitest-plugin-vis),
  which performs the snapshot on the server side.

  The interface is greatly improved.
  The `page.imageSnapshot()` is removed.
  Now you can perform `expect(...).toMatchImageSnapshot()` on regular element and locator.

  Please check the read me for the new API.

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`f4bda4c`](https://github.com/repobuddy/storybook-addon-vis/commit/f4bda4c7e12763d0d047050146f0a2829840ea61) Thanks [@unional](https://github.com/unional)! - Add `setSnapshotMeta()`.

### Patch Changes

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`03b1e6b`](https://github.com/repobuddy/storybook-addon-vis/commit/03b1e6b5f099cd9fdc8ffdb299e34703cca2d0ac) Thanks [@unional](https://github.com/unional)! - Change to use `ImageData(data, w, h, o)` constructor instead of `ImageData(w, h, o)` as `firefox` does not support it.

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`cbd1b4c`](https://github.com/repobuddy/storybook-addon-vis/commit/cbd1b4c46149855ac9b1d098259f123e9cc0a13e) Thanks [@unional](https://github.com/unional)! - Fix update snapshot for basic afterEach

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`3b09bb1`](https://github.com/repobuddy/storybook-addon-vis/commit/3b09bb1d202cfbcd2081ecf368c50b51e85ae38b) Thanks [@unional](https://github.com/unional)! - Use `console.error()` instead of `console.info()` when using not supported `page` method.

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`9534645`](https://github.com/repobuddy/storybook-addon-vis/commit/9534645972913a2aa1857c0704e6ed48c3dec2cf) Thanks [@unional](https://github.com/unional)! - Plugin should not set browser.

- [`7e63e9e`](https://github.com/repobuddy/storybook-addon-vis/commit/7e63e9e35f516f1e25e18209d81e8f5d6ae26750) Thanks [@unional](https://github.com/unional)! - Fix typo in error message.

- Updated dependencies [[`03893ab`](https://github.com/repobuddy/storybook-addon-vis/commit/03893ab4efae5f2d243bad67f40bc5cb4ad4d623)]:
  - vitest-plugin-vis@1.0.0

## 0.13.0

### Minor Changes

- [#88](https://github.com/repobuddy/storybook-addon-vis/pull/88) [`0fcada9`](https://github.com/repobuddy/storybook-addon-vis/commit/0fcada9b09fe7eb77a121e38410a0c8b4fcabdd0) Thanks [@unional](https://github.com/unional)! - Move the `__results__` and `__diff_output__` directory one level up to reduce nesting.

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

## 0.12.1

### Patch Changes

- [`a64d076`](https://github.com/repobuddy/storybook-addon-vis/commit/a64d0764a1f2038f0c329290a1796306ed43864b) Thanks [@unional](https://github.com/unional)! - Use `Object.create(null)` instead of `{}` to avoid prototype pollution.

## 0.12.0

### Minor Changes

- [#74](https://github.com/repobuddy/storybook-addon-vis/pull/74) [`6707f9f`](https://github.com/repobuddy/storybook-addon-vis/commit/6707f9fed43c9a01ebd0c280015189401f3d4b00) Thanks [@unional](https://github.com/unional)! - Change default snapshot folder back to `<project root>/__vis__`.
  They are now stored in folder structure mimic the test/story file.

  This makes it much easier to review the snapshot results.

  Also, it avoids the `EISDIR` error when running the tests and running the storybook at the same time.

  The `snapshotDir` option is renamed to `snapshotRootDir`.

  A `customizeSnapshotSubpath` is added to allow customizing the snapshot sub path.

### Patch Changes

- [#77](https://github.com/repobuddy/storybook-addon-vis/pull/77) [`d089502`](https://github.com/repobuddy/storybook-addon-vis/commit/d0895024817c07520a13a8327d377483a0042600) Thanks [@unional](https://github.com/unional)! - Change failure message to use full path.

  This allows the user to easily access the file in their editor.

## 0.11.2

### Patch Changes

- [`21583bf`](https://github.com/repobuddy/storybook-addon-vis/commit/21583bf7a1fc88de7170eb7e403105215090f1dd) Thanks [@unional](https://github.com/unional)! - Comment out logs

## 0.11.1

### Patch Changes

- [`eda2a48`](https://github.com/repobuddy/storybook-addon-vis/commit/eda2a484d233d2d08ef003b9d40d2270e9446cae) Thanks [@unional](https://github.com/unional)! - Update incorrect instruction

## 0.11.0

### Minor Changes

- [`ac4f759`](https://github.com/repobuddy/storybook-addon-vis/commit/ac4f759c5bce01daf57d380147d09db7d68c1b62) Thanks [@unional](https://github.com/unional)! - Change snapshot folder to `__vis__` next to the story/test file.
  This avoids conflict when there are multiple story/test files with the same name in different folder.

  The `createVisConfig({ snapshotPath })` is renamed to `snapshotDir`.

## 0.10.2

### Patch Changes

- [`ca1bf16`](https://github.com/repobuddy/storybook-addon-vis/commit/ca1bf16f7e2f08036a81f702a0c3eababb7a6e14) Thanks [@unional](https://github.com/unional)! - Add missing `beforeAll`, `afterEach`.

## 0.10.1

### Patch Changes

- [`d388c78`](https://github.com/repobuddy/storybook-addon-vis/commit/d388c780f96e49a43c0d8c9d254c58a02f16b4fb) Thanks [@unional](https://github.com/unional)! - Add missing `storybook-addon-vis/preset`.

## 0.10.0

### Minor Changes

- [`7974251`](https://github.com/repobuddy/storybook-addon-vis/commit/797425135fa5e521295555bd20b8bf01660bb563) Thanks [@unional](https://github.com/unional)! - Add global timeout and match options

- [`55439ae`](https://github.com/repobuddy/storybook-addon-vis/commit/55439aedbb22163f575eaeae7e0977c39243f8d6) Thanks [@unional](https://github.com/unional)! - Support global `customizeSnapshotId()` config.

### Patch Changes

- [`7db89b2`](https://github.com/repobuddy/storybook-addon-vis/commit/7db89b2ea69a20ff057865a48d0f2ad5789712a5) Thanks [@unional](https://github.com/unional)! - Change default timeout to 30s

## 0.9.1

### Patch Changes

- [`abd7a7f`](https://github.com/repobuddy/storybook-addon-vis/commit/abd7a7fb8e861e22885f2e1d407f9746314436be) Thanks [@unional](https://github.com/unional)! - Move `expect.extends` to module scope.
  It technically becomes a load time side effect which is not ideal,
  but at the same time avoids doing the extends on every test file.

- [`768396a`](https://github.com/repobuddy/storybook-addon-vis/commit/768396aac341df98639ba13c4a6c109aaf7fceb1) Thanks [@unional](https://github.com/unional)! - Use exact type for `storybookPreviewVis`.

## 0.9.0

### Minor Changes

- [`2db5b77`](https://github.com/repobuddy/storybook-addon-vis/commit/2db5b77009a458d17e5fbb63466ca8afba34bb25) Thanks [@unional](https://github.com/unional)! - Remove the need of taking `ctx` as argument for `shouldTakeSnapshot` and the `afterEach` handler.

- [#55](https://github.com/repobuddy/storybook-addon-vis/pull/55) [`85b9975`](https://github.com/repobuddy/storybook-addon-vis/commit/85b9975957a72cae2b0a2aa3e5f8ad1c2dffaf1b) Thanks [@unional](https://github.com/unional)! - Support `expect(element)`.

- [#59](https://github.com/repobuddy/storybook-addon-vis/pull/59) [`90153d3`](https://github.com/repobuddy/storybook-addon-vis/commit/90153d37234a0bea29f2262ceab90b8ae0b6933b) Thanks [@unional](https://github.com/unional)! - Simplify setup in `vitest.setup.ts` with `createVisConfig()`.

- [#60](https://github.com/repobuddy/storybook-addon-vis/pull/60) [`0eb677b`](https://github.com/repobuddy/storybook-addon-vis/commit/0eb677bed475d21b51527d5ee7a157323e1400a3) Thanks [@unional](https://github.com/unional)! - Internalize `expect.extends()` for `storybook` within `defineVisPreview()`.

- [`5a7777f`](https://github.com/repobuddy/storybook-addon-vis/commit/5a7777f6b080fd81117b8fe72ff6f81cb6855436) Thanks [@unional](https://github.com/unional)! - Rename `visStorybookPreview` to `storybookPreviewVis`

### Patch Changes

- [#60](https://github.com/repobuddy/storybook-addon-vis/pull/60) [`30adcef`](https://github.com/repobuddy/storybook-addon-vis/commit/30adcefcbbacfbae2264b32512ba08999021662b) Thanks [@unional](https://github.com/unional)! - Fix `play()` when running in storybook.

- [`f92a371`](https://github.com/repobuddy/storybook-addon-vis/commit/f92a371cb569f3ef138bc394360846fe6f8396ca) Thanks [@unional](https://github.com/unional)! - Change `shouldTakeSnapshot(ctx)` to accept `any`.
  Check is done at runtime.
  This change allows the user to skip the type parameter in `afterEach` hook.

  ```ts
  // from
  import { StoryContext } from "@storybook/react";
  import { shouldTakeSnapshot } from "storybook-addon-vis/vitest-setup";
  import { afterEach } from "vitest";

  afterEach<{ story?: StoryContext }>(async (ctx) => {
    if (!shouldTakeSnapshot(ctx)) return;
    // ...
  });

  // to
  afterEach(async (ctx) => {
    if (!shouldTakeSnapshot(ctx)) return;
    // ...
  });
  ```

## 0.8.0

### Minor Changes

- [`79ccf83`](https://github.com/repobuddy/storybook-addon-vis/commit/79ccf835fc753319dfe68679926ac3bedb03e01b) Thanks [@unional](https://github.com/unional)! - Refactor `configureSnapshotBeforeAll()` into `setupVitestVis()`.

  ```ts
  // from
  import { configureSnapshotBeforeAll } from "storybook-addon-vis";
  import { beforeAll } from "vitest";

  beforeAll(configureSnapshotBeforeAll);

  // to
  import { setupVitestVis } from "storybook-addon-vis";
  import { beforeAll } from "vitest";

  const vis = setupVitestVis();

  beforeAll(vis.beforeAll);
  ```

- [#50](https://github.com/repobuddy/storybook-addon-vis/pull/50) [`062991d`](https://github.com/repobuddy/storybook-addon-vis/commit/062991d22c4a52208157c78b279235b32950da75) Thanks [@unional](https://github.com/unional)! - Remove `configureSnapshotBeforeEach`, no longer needed.

- [#50](https://github.com/repobuddy/storybook-addon-vis/pull/50) [`180562a`](https://github.com/repobuddy/storybook-addon-vis/commit/180562acbe7b10458175806e0e6d71d2d05a7b70) Thanks [@unional](https://github.com/unional)! - The last `expect().toMatchImageSnapshot()` will be awaited automatically,
  making it easier to write.

## 0.7.0

### Minor Changes

- [`250611e`](https://github.com/repobuddy/storybook-addon-vis/commit/250611e03660e288ef0ed6034e423b9887087517) Thanks [@unional](https://github.com/unional)! - The `parameters.snapshot` is now honored by `expect(...).toMatchImageSnapshot()` automatically.
  This applies to both automatic and manual snapshot testing.

### Patch Changes

- [`b90b970`](https://github.com/repobuddy/storybook-addon-vis/commit/b90b97045a275ac756fb6344bb0ef7d0b8b158c8) Thanks [@unional](https://github.com/unional)! - Create a manual vitest-plugin type definition.

## 0.6.3

### Patch Changes

- [`ebc3054`](https://github.com/repobuddy/storybook-addon-vis/commit/ebc3054e1dd0388f7e56ac9a7d62e61046fa9823) Thanks [@unional](https://github.com/unional)! - Disable minify to make it easier to debug.

## 0.6.2

### Patch Changes

- [#40](https://github.com/repobuddy/storybook-addon-vis/pull/40) [`9e4cfbf`](https://github.com/repobuddy/storybook-addon-vis/commit/9e4cfbf7fa820fba8f27397ff5b65652c3f41efb) Thanks [@unional](https://github.com/unional)! - Fix [#39](https://github.com/repobuddy/storybook-addon-vis/issues/39)

## 0.6.1

### Patch Changes

- [`18ac025`](https://github.com/repobuddy/storybook-addon-vis/commit/18ac025028ad31e6ed499ad4a6c1e5e5580d1006) Thanks [@unional](https://github.com/unional)! - Enable code splitting to share state between `storybook-addon-vis` and `storybook-addon-vis/vitest-setup`.

  We couldn't reproduce the issue locally, but we believe this change will fix it.

## 0.6.0

### Minor Changes

- [`668c6d9`](https://github.com/repobuddy/storybook-addon-vis/commit/668c6d96e06cf587b319f521a122d18566049f64) Thanks [@unional](https://github.com/unional)! - Add `page.hasImageSnapshot()`.

  Rename type `SnapshotCapturer` to `ImageSnapshotAction`.

- [`85e5a7b`](https://github.com/repobuddy/storybook-addon-vis/commit/85e5a7b4203c3f1ffa57e88e5d8ac49b437ae19b) Thanks [@unional](https://github.com/unional)! - Add `options.timeout` and default to 3000

### Patch Changes

- [`620e71a`](https://github.com/repobuddy/storybook-addon-vis/commit/620e71a392ff0e26afd63e9375b6fabd8ab322ff) Thanks [@unional](https://github.com/unional)! - Add `package.json#repository.directory`.

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
