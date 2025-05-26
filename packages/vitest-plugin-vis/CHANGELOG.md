# vitest-plugin-vis

## 3.0.0

### Major Changes

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`1d322c4`](https://github.com/repobuddy/visual-testing/commit/1d322c439db6f6160dbc70a6710e00ed03e3ce19) Thanks [@unional](https://github.com/unional)! - Remove `parseImageSnapshotSubject` from the public API (breaking change).

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`38734c5`](https://github.com/repobuddy/visual-testing/commit/38734c508633168e73d87c264b3dabf44dd617b8) Thanks [@unional](https://github.com/unional)! - Remove the ability to customize `snapshotKey` with function.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`14f57c5`](https://github.com/repobuddy/visual-testing/commit/14f57c5be3569d7620d7288b0fc9aba7a3a798b6) Thanks [@unional](https://github.com/unional)! - Remove `shouldTaeSnapshot()` from API.
  The consumer don't need to know. Tell don't ask.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`b68f90a`](https://github.com/repobuddy/visual-testing/commit/b68f90a74899bfed4fca3083696b955f35f5f11b) Thanks [@unional](https://github.com/unional)! - Update `customizeSnapshotSubpath` to `snapshotSubpath`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`29ea8dc`](https://github.com/repobuddy/visual-testing/commit/29ea8dc41c1fe64a15f35840617e629b12e4123b) Thanks [@unional](https://github.com/unional)! - Rename `matchImageSnapshot` to `matchImageSnapshotAction` (breaking).

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`4c9bf36`](https://github.com/repobuddy/visual-testing/commit/4c9bf365db466c159395996c56ca76b2112bef09) Thanks [@unional](https://github.com/unional)! - Move `/client` to `/client-api` to indicate that it's an API, not meant to be used directly (breaking).

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`899ce35`](https://github.com/repobuddy/visual-testing/commit/899ce35a89488bc1c00ed3771c2a4d51e042fee2) Thanks [@unional](https://github.com/unional)! - Change `imageSnapshotMatcher` to `matchImageSnapshot` (breaking change).

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`abcedab`](https://github.com/repobuddy/visual-testing/commit/abcedabc46860ddd5fc015be9ccd38e6959cc77a) Thanks [@unional](https://github.com/unional)! - Replace `subjectDataTestId` with `subject`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`4f9ce14`](https://github.com/repobuddy/visual-testing/commit/4f9ce14214531cd430c14a9e703a9652744864fe) Thanks [@unional](https://github.com/unional)! - Remove `matchImageSnapshot` command.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`fb8603d`](https://github.com/repobuddy/visual-testing/commit/fb8603df43c71303b92f40ddfc6b9d42982b1dd2) Thanks [@unional](https://github.com/unional)! - Remove extra `/commands` export.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`11e52da`](https://github.com/repobuddy/visual-testing/commit/11e52da2ebd7dc5d4d5d252942b7edbc40c81713) Thanks [@unional](https://github.com/unional)! - Rename `ImageSnapshotIdOptions` to `ImageSnapshotKeyOptions`

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`2f57b5b`](https://github.com/repobuddy/visual-testing/commit/2f57b5bf35f149b3058df5fd0b2e663387d26bf3) Thanks [@unional](https://github.com/unional)! - Improve `vis.presets.theme()` and `vis.afterEach.matchPerTheme()` type params to not depends on `SnapshotMeta`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`ccb67af`](https://github.com/repobuddy/visual-testing/commit/ccb67aff835baaefc883004fbada7a811425dbd3) Thanks [@unional](https://github.com/unional)! - Remove `SnapshotMeta` from API.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`31d9e29`](https://github.com/repobuddy/visual-testing/commit/31d9e29186a2fb0caa2e4c26be002e248f1160de) Thanks [@unional](https://github.com/unional)! - Remove `isAutosnapshot` from commands signature.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`d7e7802`](https://github.com/repobuddy/visual-testing/commit/d7e780233226f4d6bfea955819789a00687a1fe9) Thanks [@unional](https://github.com/unional)! - Remove the first argument from the `setAutoSnapshotOptions` function.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`033f725`](https://github.com/repobuddy/visual-testing/commit/033f725ca44bb8e213e94b6b001e7d8657fc48d7) Thanks [@unional](https://github.com/unional)! - Remove `customizeSnapshotId`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`51b4855`](https://github.com/repobuddy/visual-testing/commit/51b48557f66447b302ad1a27a9482db42c4dc90d) Thanks [@unional](https://github.com/unional)! - Remove `toTaskId` from public API.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`755f18a`](https://github.com/repobuddy/visual-testing/commit/755f18aba217a9d3beca842701b68f85873561e4) Thanks [@unional](https://github.com/unional)! - Remove `platform` support.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`ea3735f`](https://github.com/repobuddy/visual-testing/commit/ea3735fbb88ecf93ef6f1b287871afe44a8185de) Thanks [@unional](https://github.com/unional)! - Remove server context from `/server-api`. It can't be used outside of Vitest.
  Rename `/server-api` to `/server-utils` as it is not an API.

### Minor Changes

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`7ff4a7b`](https://github.com/repobuddy/visual-testing/commit/7ff4a7b22e20c94b554b2c99e406b93343953d0f) Thanks [@unional](https://github.com/unional)! - Change `actions` to take `taskId` instead of `test`.
  This allows the `taskId` to be built from other means, such as from Storybook runtime.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`6f74919`](https://github.com/repobuddy/visual-testing/commit/6f74919691ac97dd9759447cc7feab58cf7f24d8) Thanks [@unional](https://github.com/unional)! - Add `loadImageSnapshotResultsAction`

- [#283](https://github.com/repobuddy/visual-testing/pull/283) [`594c9c9`](https://github.com/repobuddy/visual-testing/commit/594c9c9511ea74dde10329eeee64f51a257f92bd) Thanks [@unional](https://github.com/unional)! - Restrict `snapshotKey` to not accept dash `-`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`34973ca`](https://github.com/repobuddy/visual-testing/commit/34973ca0a017f35e58ce4e706da1a83a693ee6a9) Thanks [@unional](https://github.com/unional)! - Add `page.toMatchImageSnapshot`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`aa957fc`](https://github.com/repobuddy/visual-testing/commit/aa957fc3dcae07a43583e219b33b92a19de31f6b) Thanks [@unional](https://github.com/unional)! - Deprecate `MatchImageSnapshotCommand`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`f3ef08c`](https://github.com/repobuddy/visual-testing/commit/f3ef08cc57bdaa3a5d28d0588fde81d115e79150) Thanks [@unional](https://github.com/unional)! - Add image size diff message

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`5539f6d`](https://github.com/repobuddy/visual-testing/commit/5539f6d6d0d4d192b1a8318fa5c91543a46abd39) Thanks [@unional](https://github.com/unional)! - Support full page screenshots with `playwright`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`1b1c13a`](https://github.com/repobuddy/visual-testing/commit/1b1c13a986b708a8e1adc52cf05f52c46e937000) Thanks [@unional](https://github.com/unional)! - Pass options to page screenshot

- [#283](https://github.com/repobuddy/visual-testing/pull/283) [`577e42b`](https://github.com/repobuddy/visual-testing/commit/577e42b5321b50b183a71a23c54dfaa87d5ad7a5) Thanks [@unional](https://github.com/unional)! - Export `trimCommonFolder` under `/server-utils`

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`766c035`](https://github.com/repobuddy/visual-testing/commit/766c035e798334e44e6489de86f05f4809e7fb76) Thanks [@unional](https://github.com/unional)! - Adjust code to work with latest `webdriverio`.
  It now expect file paths relative to the project root to save screenshots.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`3c8eee0`](https://github.com/repobuddy/visual-testing/commit/3c8eee04308506040dafede505ab53736545c20d) Thanks [@unional](https://github.com/unional)! - Add `vis.setup()`.
  Deprecate `vis.presets.enable()`, `vis.presets.manual()`, `vis.presets.auto()`, and `vis.presets.theme()`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`f7ce143`](https://github.com/repobuddy/visual-testing/commit/f7ce1438e435aaaac6449b7f138034bb34b598f3) Thanks [@unional](https://github.com/unional)! - Export types to `/config`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`6978c83`](https://github.com/repobuddy/visual-testing/commit/6978c8371b626e508044f422bbfe9c3694337565) Thanks [@unional](https://github.com/unional)! - Add `hasImageSnapshotAction` to contain the business logic.

### Patch Changes

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`eb1eeee`](https://github.com/repobuddy/visual-testing/commit/eb1eeeeab6021ba5d58306519333d5099a173ee0) Thanks [@unional](https://github.com/unional)! - Adjust commands type.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`c3ec8f8`](https://github.com/repobuddy/visual-testing/commit/c3ec8f8f538f9aa84f17e4749dc46563d1605ed0) Thanks [@unional](https://github.com/unional)! - Export missing `SnapshotTestMeta` type.

## 2.4.4

### Patch Changes

- [`0b83a6e`](https://github.com/repobuddy/visual-testing/commit/0b83a6e63fe7d7d770277dfd020443972ebbd9ad) - Sanitize suite ID to prevent invalid paths. (#270)
  Thanks @jacob-noble for the contribution 🎉

## 2.4.3

### Patch Changes

- [#265](https://github.com/repobuddy/visual-testing/pull/265) [`57be521`](https://github.com/repobuddy/visual-testing/commit/57be5217c3c12a7313c724c144c9227a4f227a4c) Thanks [@unional](https://github.com/unional)! - Pass down options for `playwright`.

## 2.4.2

### Patch Changes

- [#251](https://github.com/repobuddy/visual-testing/pull/251) [`349e021`](https://github.com/repobuddy/visual-testing/commit/349e02112ced61af05cc37bfbafa28363485c223) Thanks [@unional](https://github.com/unional)! - Fix handling of server options introduced by workspace support.

## 2.4.1

### Patch Changes

- [#246](https://github.com/repobuddy/visual-testing/pull/246) [`e877872`](https://github.com/repobuddy/visual-testing/commit/e877872131ef2b14981cd8203b7f85f4141e4dd9) Thanks [@unional](https://github.com/unional)! - Fix workspace feature to work with multiple browser instances.

## 2.4.0

### Minor Changes

- [#240](https://github.com/repobuddy/storybook-addon-vis/pull/240) [`16c7886`](https://github.com/repobuddy/storybook-addon-vis/commit/16c78862fc5a14e7137fb3c7d3c60c9fe6ff674f) Thanks [@unional](https://github.com/unional)! - Fix relative path issue regarding workspace support.

- [#240](https://github.com/repobuddy/storybook-addon-vis/pull/240) [`2c7afe9`](https://github.com/repobuddy/storybook-addon-vis/commit/2c7afe9778b3ea60b0667b3bae5a0ac066995c65) Thanks [@unional](https://github.com/unional)! - Support monorepo workspace usage.

## 2.3.3

### Patch Changes

- [#230](https://github.com/repobuddy/storybook-addon-vis/pull/230) [`4b665f9`](https://github.com/repobuddy/storybook-addon-vis/commit/4b665f940fd8f290de99875d3b0b6332e3aed38a) Thanks [@unional](https://github.com/unional)! - Fix handling multiple projects running in a workspace.

## 2.3.2

### Patch Changes

- [`2a2b000`](https://github.com/repobuddy/storybook-addon-vis/commit/2a2b000e1e9acc85dd9e81e0c569623ef1eb0724) Thanks [@unional](https://github.com/unional)! - Remove extra import

## 2.3.1

### Patch Changes

- [#227](https://github.com/repobuddy/storybook-addon-vis/pull/227) [`13ef2a5`](https://github.com/repobuddy/storybook-addon-vis/commit/13ef2a53ca1a5e319b90e2c9d6a8f09945d87c0e) Thanks [@unional](https://github.com/unional)! - Fix handling of `isAutoSnapshot` handling on the server side.

## 2.3.0

### Minor Changes

- [#225](https://github.com/repobuddy/storybook-addon-vis/pull/225) [`15bbbed`](https://github.com/repobuddy/storybook-addon-vis/commit/15bbbedb717b57d94c334e26d99b59431f1f17e0) Thanks [@unional](https://github.com/unional)! - Add type param to `vis.presets.theme()` and `vis.afterEach.matchPerTheme()`.

- [#225](https://github.com/repobuddy/storybook-addon-vis/pull/225) [`4692f23`](https://github.com/repobuddy/storybook-addon-vis/commit/4692f2360737e03699646a68572f7456badd53b6) Thanks [@unional](https://github.com/unional)! - Add `isAutoSnapshot` prop to `customizeSnapshotId()`.

## 2.2.0

### Minor Changes

- [#223](https://github.com/repobuddy/storybook-addon-vis/pull/223) [`13601ef`](https://github.com/repobuddy/storybook-addon-vis/commit/13601ef5ecd4260eacf844f71dcf4ca941b88f6b) Thanks [@unional](https://github.com/unional)! - Add `vis.preset.enable()`.

## 2.1.1

### Patch Changes

- [#219](https://github.com/repobuddy/storybook-addon-vis/pull/219) [`bbbc8e8`](https://github.com/repobuddy/storybook-addon-vis/commit/bbbc8e89286c1dd39a67a267d64185ce5dc61908) Thanks [@unional](https://github.com/unional)! - Improve `setAutoSnapshotOptions()` to work in `beforeAll` hook without passing in the `suite` object.

## 2.1.0

### Minor Changes

- [#217](https://github.com/repobuddy/storybook-addon-vis/pull/217) [`472acc9`](https://github.com/repobuddy/storybook-addon-vis/commit/472acc9e5ea0e78b26343fa662fdfc82dc3aaf2a) Thanks [@unional](https://github.com/unional)! - Update `pixelmatch` to `7.1.0`.

## 2.0.1

### Patch Changes

- [#209](https://github.com/repobuddy/storybook-addon-vis/pull/209) [`a68f5c9`](https://github.com/repobuddy/storybook-addon-vis/commit/a68f5c9ea3786aa70dc03304236a67ef3fb333df) Thanks [@unional](https://github.com/unional)! - Avoid setting `setupFiles` in `vitest.config.ts` to undefined,
  as Vite v5 does not support it.

- [`24621e0`](https://github.com/repobuddy/storybook-addon-vis/commit/24621e0683bebc08d112d93c99e58d28e0dffb67) Thanks [@unional](https://github.com/unional)! - Update `type-plus`.

## 2.0.0

### Major Changes

- [#204](https://github.com/repobuddy/storybook-addon-vis/pull/204) [`020121f`](https://github.com/repobuddy/storybook-addon-vis/commit/020121f04d08feaf071db0beb65236e79feb695d) Thanks [@unional](https://github.com/unional)! - Change the `customizeSnapshotId` to accept `context` object.

  This is a breaking change.
  Feature-wise, it is the same as before.
  We will enable better customization by passing `viewport` to the `customizeSnapshotId` function in the future.

- [#204](https://github.com/repobuddy/storybook-addon-vis/pull/204) [`76b09cc`](https://github.com/repobuddy/storybook-addon-vis/commit/76b09cc00c5fc94026e2a5ab6283300325716675) Thanks [@unional](https://github.com/unional)! - Add support to customize `snapshotRootDir` with a function.
  Deprecate `platform` option.

## 1.7.0

### Minor Changes

- [#195](https://github.com/repobuddy/storybook-addon-vis/pull/195) [`972db1b`](https://github.com/repobuddy/storybook-addon-vis/commit/972db1bb1f511d9073a2600afa030ff9c46e864f) Thanks [@unional](https://github.com/unional)! - Allow `setAutoSnapshotOptions` to specify additional properties.
  Each theme in `vis.presets.theme()` and `vis.afterEach.matchPerTheme()` will receive the options.

  ```ts
  vis.presets.theme({
  	theme1(options) { ... }
  })
  ```

## 1.6.5

### Patch Changes

- [#190](https://github.com/repobuddy/storybook-addon-vis/pull/190) [`be483d4`](https://github.com/repobuddy/storybook-addon-vis/commit/be483d412358158c4016eba573bf035252f6cbb5) Thanks [@unional](https://github.com/unional)! - Support `customizeSnapshotId` option during theme auto snapshot.

## 1.6.4

### Patch Changes

- [#188](https://github.com/repobuddy/storybook-addon-vis/pull/188) [`78b117f`](https://github.com/repobuddy/storybook-addon-vis/commit/78b117fef0510c993aad33ff92114d9a786b41d8) Thanks [@unional](https://github.com/unional)! - Use bounded `expect`.

## 1.6.3

### Patch Changes

- [#185](https://github.com/repobuddy/storybook-addon-vis/pull/185) [`c5296a1`](https://github.com/repobuddy/storybook-addon-vis/commit/c5296a15933cb26bb1792701c691f7ca67c5a4ee) Thanks [@unional](https://github.com/unional)! - Export `AutoSnapshotOptions` under `/client`.

## 1.6.2

### Patch Changes

- [#183](https://github.com/repobuddy/storybook-addon-vis/pull/183) [`49e8fbc`](https://github.com/repobuddy/storybook-addon-vis/commit/49e8fbc60a9e9e07e700a5d61164cf954186ce2d) Thanks [@unional](https://github.com/unional)! - Export `AutoSnapshotOptions` to fix the inferred type cannot be named error.

## 1.6.1

### Patch Changes

- [#182](https://github.com/repobuddy/storybook-addon-vis/pull/182) [`537cf83`](https://github.com/repobuddy/storybook-addon-vis/commit/537cf83b7cd6120876f46fc4bd5d51391128cab4) Thanks [@unional](https://github.com/unional)! - Should not take snapshot when the test failed.
  Ensure the theme is awaited before taking the snapshot.

## 1.6.0

### Minor Changes

- [#171](https://github.com/repobuddy/storybook-addon-vis/pull/171) [`5335011`](https://github.com/repobuddy/storybook-addon-vis/commit/5335011f32b59604cd0a3b653c04ac690b6ca5fa) Thanks [@unional](https://github.com/unional)! - Support default subject using `data-testid` attribute.

## 1.5.1

### Patch Changes

- [#166](https://github.com/repobuddy/storybook-addon-vis/pull/166) [`611e0cc`](https://github.com/repobuddy/storybook-addon-vis/commit/611e0cca505bfea0fe67ce10e45af2946a7cc578) Thanks [@unional](https://github.com/unional)! - Use `config.root` instead of `runner.root`.
  `runner.root` is protected in Vitest v3.

## 1.5.0

### Minor Changes

- [#162](https://github.com/repobuddy/storybook-addon-vis/pull/162) [`995140f`](https://github.com/repobuddy/storybook-addon-vis/commit/995140f0bda8c389a24f143f744dabe6d682a8ce) Thanks [@unional](https://github.com/unional)! - Support customizing `platform` by @joekrump.

  For example, with `vis({ platform: 'ci' })`,
  Instead of saving the snapshots to `<root>/__vis__/{local or process.platform}`,
  the snapshots will be saved to `<root>/__vis__/ci`.

### Patch Changes

- [#156](https://github.com/repobuddy/storybook-addon-vis/pull/156) [`72959a6`](https://github.com/repobuddy/storybook-addon-vis/commit/72959a6bd2bea3d9c1cff652b8ff384c10e017f2) Thanks [@unional](https://github.com/unional)! - Add top level `types` field to `package.json` for project not using ESM module resolution.

- [#160](https://github.com/repobuddy/storybook-addon-vis/pull/160) [`d2fdcbe`](https://github.com/repobuddy/storybook-addon-vis/commit/d2fdcbe023917ea9dc85ac332dfd8b46f6936f20) Thanks [@unional](https://github.com/unional)! - Remove `expectToFail` from `VisOptions`.
  It should not have that property.

- [#161](https://github.com/repobuddy/storybook-addon-vis/pull/161) [`43fc2ce`](https://github.com/repobuddy/storybook-addon-vis/commit/43fc2ce3385c0086de567816a1a1328ea4df336f) Thanks [@unional](https://github.com/unional)! - Change default timeout to 30s.
  The initial timeout of 1s was set by Vitest.
  It is causing tests to fail with `TimeoutError`,
  even when getting `Locator` like `getByRole`.

  This timeout will be removed in Vitest 3.

  The underlying provider (`playwright`) does not have a default timeout.

  Setting to 30s should be a good default for most cases.

  It could still be too short for slow CI or when it is running scripts in parallel.
  That was the case for `storybook-test-runner` but could be improved in Vitest browser mode.

  If timeout is still an issue, we can further default it to 60s or even 120s.

- [#158](https://github.com/repobuddy/storybook-addon-vis/pull/158) [`a020417`](https://github.com/repobuddy/storybook-addon-vis/commit/a02041770b32ca52baa35326ff77a39fe4b249c2) Thanks [@unional](https://github.com/unional)! - Add a blank line to separate the theme error messages.

- [#160](https://github.com/repobuddy/storybook-addon-vis/pull/160) [`ee4ef14`](https://github.com/repobuddy/storybook-addon-vis/commit/ee4ef1492a0444bf1b24d2614c8365154038b351) Thanks [@unional](https://github.com/unional)! - Fix the global setting not being applied.

## 1.4.0

### Minor Changes

- [#150](https://github.com/repobuddy/storybook-addon-vis/pull/150) [`da95b08`](https://github.com/repobuddy/storybook-addon-vis/commit/da95b08e496d1f8a8b1663e55681510803e41082) Thanks [@unional](https://github.com/unional)! - Add `ssim` support.

## 1.3.2

### Patch Changes

- [`1b22d2d`](https://github.com/repobuddy/storybook-addon-vis/commit/1b22d2d290a1fb18156cda3b846a402ad51481a2) Thanks [@unional](https://github.com/unional)! - Misc update to error message

## 1.3.1

### Patch Changes

- [#145](https://github.com/repobuddy/storybook-addon-vis/pull/145) [`3ebc865`](https://github.com/repobuddy/storybook-addon-vis/commit/3ebc8655f3364a59de1d87930af53554dd9b4faa) Thanks [@unional](https://github.com/unional)! - Fix `expectToFail` during snapshot update.

## 1.3.0

### Minor Changes

- [#139](https://github.com/repobuddy/storybook-addon-vis/pull/139) [`17510d3`](https://github.com/repobuddy/storybook-addon-vis/commit/17510d32272730ebf4677ed2c4b177f636e75cc2) Thanks [@unional](https://github.com/unional)! - Add `expectToFail` support.
  This is useful to test where the visual should be changed beyond the threshold.

- [#144](https://github.com/repobuddy/storybook-addon-vis/pull/144) [`f642dbf`](https://github.com/repobuddy/storybook-addon-vis/commit/f642dbfbb6a715ef14a944c50e656b79c926b5d4) Thanks [@unional](https://github.com/unional)! - Change `import { matchImageSnapshot } from 'vitest-plugin-vis/client'` to `import { imageSnapshotMatcher } from 'vitest-plugin-vis/client'`.

  This is a bug in 1.2.0 because `matchImageSnapshot` is hard loading `@vitest/browser/context`, which causes storybook to fail to load.

### Patch Changes

- [#144](https://github.com/repobuddy/storybook-addon-vis/pull/144) [`2d4f1c0`](https://github.com/repobuddy/storybook-addon-vis/commit/2d4f1c02394ca4fd8880452a98399c825e686ee5) Thanks [@unional](https://github.com/unional)! - Extends `expect` and `page` in presets.

- [#144](https://github.com/repobuddy/storybook-addon-vis/pull/144) [`78cc195`](https://github.com/repobuddy/storybook-addon-vis/commit/78cc195e1ae9afe2fe102e0e916cffff406e0ebd) Thanks [@unional](https://github.com/unional)! - Augment `expect` and `page` in main so that consumer can load the types:

  ```json
  {
    "compilerOptions": {
      "types": ["vitest-plugin-vis"]
    }
  }
  ```

## 1.2.0

### Minor Changes

- [#137](https://github.com/repobuddy/storybook-addon-vis/pull/137) [`e4bef32`](https://github.com/repobuddy/storybook-addon-vis/commit/e4bef32a897015f5f84407610ef184eb3872f424) Thanks [@unional](https://github.com/unional)! - Assert `context.testPath` on `setupVisSuite` command.

  Add `stubBrowserCommandContext` to `/testing`.

### Patch Changes

- [#137](https://github.com/repobuddy/storybook-addon-vis/pull/137) [`e0fec8e`](https://github.com/repobuddy/storybook-addon-vis/commit/e0fec8edf7c082bf31b10ea6040b216836740ab2) Thanks [@unional](https://github.com/unional)! - Remove import of `vitest-browser-react` in the presets.
  The plugin is not React specific.

- [#137](https://github.com/repobuddy/storybook-addon-vis/pull/137) [`a3e3c89`](https://github.com/repobuddy/storybook-addon-vis/commit/a3e3c89341183a8ced5339290cc74d172b78f82d) Thanks [@unional](https://github.com/unional)! - Update `writeImageSnapshot` signature.

- [#137](https://github.com/repobuddy/storybook-addon-vis/pull/137) [`eaa3bbe`](https://github.com/repobuddy/storybook-addon-vis/commit/eaa3bbe91076d42b7eb8b773c404b2e62d6c4930) Thanks [@unional](https://github.com/unional)! - Improve `testPath` assertion message.

## 1.1.0

### Minor Changes

- [`0360253`](https://github.com/repobuddy/storybook-addon-vis/commit/03602536b5ebf67b7d898f95d6511e5b05da96a9) Thanks [@unional](https://github.com/unional)! - Depreacate `toTaskId`.

- [#133](https://github.com/repobuddy/storybook-addon-vis/pull/133) [`badf227`](https://github.com/repobuddy/storybook-addon-vis/commit/badf2273828ad883763e1e328b4e180c07b4960a) Thanks [@unional](https://github.com/unional)! - Perform image comparison on the client side.
  This is similar to `storybook-addon-vis@0.13.0`, but the image taking is still done on the server side.

  Try to address the issue of the slower image comparison on the server side.

  Export `matchImageSnapshot` function on the client side.
  Mark `parseImageSnapshotSubject` as deprecated as it is not needed anymore.

### Patch Changes

- [#136](https://github.com/repobuddy/storybook-addon-vis/pull/136) [`176d28f`](https://github.com/repobuddy/storybook-addon-vis/commit/176d28fc459cb0823f3fda94ad4e3372690dbd8d) Thanks [@unional](https://github.com/unional)! - Update error message during threshold conversion.

- [#135](https://github.com/repobuddy/storybook-addon-vis/pull/135) [`6912ad7`](https://github.com/repobuddy/storybook-addon-vis/commit/6912ad73041f7e46757f0f364dcaa6594a35ce9d) Thanks [@unional](https://github.com/unional)! - Improve options message.

## 1.0.5

### Patch Changes

- [#130](https://github.com/repobuddy/storybook-addon-vis/pull/130) [`e242444`](https://github.com/repobuddy/storybook-addon-vis/commit/e242444908766274014b5fc94afaf31392627c88) Thanks [@unional](https://github.com/unional)! - Add update snapshot back to the server implementation.

## 1.0.4

### Patch Changes

- [#128](https://github.com/repobuddy/storybook-addon-vis/pull/128) [`d695c4f`](https://github.com/repobuddy/storybook-addon-vis/commit/d695c4fb0b0be80ce53e38884fcb7a6340a8e52d) Thanks [@unional](https://github.com/unional)! - Avoid buffer conversion.

## 1.0.3

### Patch Changes

- [#125](https://github.com/repobuddy/storybook-addon-vis/pull/125) [`1068941`](https://github.com/repobuddy/storybook-addon-vis/commit/1068941b1495966cb3ee15a53dd5937e37365373) Thanks [@unional](https://github.com/unional)! - Try to improve the performance of the plugin by skipping the rescale step and not checking the CRC of the image.

  This should be safe because the image is generated by the browser, or it is a base64 string (not 100% sure on this), and the CRC is not used for anything.

  If not performance improvement is seen, we can revert this change.

## 1.0.2

### Patch Changes

- [#123](https://github.com/repobuddy/storybook-addon-vis/pull/123) [`a8fcd75`](https://github.com/repobuddy/storybook-addon-vis/commit/a8fcd75a056cb5b16006c52190453f19e41ab182) Thanks [@unional](https://github.com/unional)! - Avoid resizing images when not necessary.

## 1.0.1

### Patch Changes

- [#117](https://github.com/repobuddy/storybook-addon-vis/pull/117) [`ae98ec4`](https://github.com/repobuddy/storybook-addon-vis/commit/ae98ec47df104c80723892345946aebb65cb361c) Thanks [@unional](https://github.com/unional)! - Proxy `vitest/suite`.

  This fix the warning message `Module "util" has been externalized for browser compatibility.` when it is loaded in the browser.

  Fixes [#101](https://github.com/repobuddy/storybook-addon-vis/issues/101).

## 1.0.0

### Major Changes

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`03893ab`](https://github.com/repobuddy/storybook-addon-vis/commit/03893ab4efae5f2d243bad67f40bc5cb4ad4d623) Thanks [@unional](https://github.com/unional)! - Initial Release.

  [`vitest-plugin-vis`](https://www.npmjs.com/package/vitest-plugin-vis) is a visual testing plugin for [Vitest](https://vitest.dev/), running on [Vitest Browser Mode](https://vitest.dev/guide/browser/).
