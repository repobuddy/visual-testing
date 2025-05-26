# v0.0.16 (Tue Oct 29 2024)

## 1.0.0

### Major Changes

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`a7c2a49`](https://github.com/repobuddy/visual-testing/commit/a7c2a49891c4b5b1724ff8f2f4a81ec01ae16c2c) Thanks [@unional](https://github.com/unional)! - Move `storybook-addon-vis/preview` into `storybook-addon-vis/vitest-setup`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`d8c2dac`](https://github.com/repobuddy/visual-testing/commit/d8c2dace2fb6f56fe555d122590937029736e713) Thanks [@unional](https://github.com/unional)! - Add `Storybook Vis` panel to show the results of the visual tests.

### Minor Changes

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`36dcd4e`](https://github.com/repobuddy/visual-testing/commit/36dcd4e5ecf00078fbcf6ddf30852fab6e962eff) Thanks [@unional](https://github.com/unional)! - Rename `ImageSnapshotIdOptions` to `ImageSnapshotKeyOptions`.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`ccb67af`](https://github.com/repobuddy/visual-testing/commit/ccb67aff835baaefc883004fbada7a811425dbd3) Thanks [@unional](https://github.com/unional)! - Remove `SnapshotMeta` from API.

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`ba025cb`](https://github.com/repobuddy/visual-testing/commit/ba025cb9872ac184646b41912d87b4608d5f2b01) Thanks [@unional](https://github.com/unional)! - Add `StorybookVisOptions`

### Patch Changes

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`29ea8dc`](https://github.com/repobuddy/visual-testing/commit/29ea8dc41c1fe64a15f35840617e629b12e4123b) Thanks [@unional](https://github.com/unional)! - Rename `matchImageSnapshot` to `matchImageSnapshotAction` (breaking).

- [#259](https://github.com/repobuddy/visual-testing/pull/259) [`fbaa75b`](https://github.com/repobuddy/visual-testing/commit/fbaa75be2421bf70e0a7a7a296f307d8564421e7) Thanks [@unional](https://github.com/unional)! - Use `hasImageSnapshotAction` from `vitest-plugin-vis`.

- [`f19d4c9`](https://github.com/repobuddy/visual-testing/commit/f19d4c931f346b5cf813a3d66131ae92fb6f07c5) - Depends on `vitest-plugin-vis` with version range `^`.

- Updated dependencies [[`1d322c4`](https://github.com/repobuddy/visual-testing/commit/1d322c439db6f6160dbc70a6710e00ed03e3ce19), [`38734c5`](https://github.com/repobuddy/visual-testing/commit/38734c508633168e73d87c264b3dabf44dd617b8), [`14f57c5`](https://github.com/repobuddy/visual-testing/commit/14f57c5be3569d7620d7288b0fc9aba7a3a798b6), [`7ff4a7b`](https://github.com/repobuddy/visual-testing/commit/7ff4a7b22e20c94b554b2c99e406b93343953d0f), [`b68f90a`](https://github.com/repobuddy/visual-testing/commit/b68f90a74899bfed4fca3083696b955f35f5f11b), [`6f74919`](https://github.com/repobuddy/visual-testing/commit/6f74919691ac97dd9759447cc7feab58cf7f24d8), [`29ea8dc`](https://github.com/repobuddy/visual-testing/commit/29ea8dc41c1fe64a15f35840617e629b12e4123b), [`594c9c9`](https://github.com/repobuddy/visual-testing/commit/594c9c9511ea74dde10329eeee64f51a257f92bd), [`34973ca`](https://github.com/repobuddy/visual-testing/commit/34973ca0a017f35e58ce4e706da1a83a693ee6a9), [`4c9bf36`](https://github.com/repobuddy/visual-testing/commit/4c9bf365db466c159395996c56ca76b2112bef09), [`aa957fc`](https://github.com/repobuddy/visual-testing/commit/aa957fc3dcae07a43583e219b33b92a19de31f6b), [`899ce35`](https://github.com/repobuddy/visual-testing/commit/899ce35a89488bc1c00ed3771c2a4d51e042fee2), [`f3ef08c`](https://github.com/repobuddy/visual-testing/commit/f3ef08cc57bdaa3a5d28d0588fde81d115e79150), [`abcedab`](https://github.com/repobuddy/visual-testing/commit/abcedabc46860ddd5fc015be9ccd38e6959cc77a), [`5539f6d`](https://github.com/repobuddy/visual-testing/commit/5539f6d6d0d4d192b1a8318fa5c91543a46abd39), [`eb1eeee`](https://github.com/repobuddy/visual-testing/commit/eb1eeeeab6021ba5d58306519333d5099a173ee0), [`4f9ce14`](https://github.com/repobuddy/visual-testing/commit/4f9ce14214531cd430c14a9e703a9652744864fe), [`fb8603d`](https://github.com/repobuddy/visual-testing/commit/fb8603df43c71303b92f40ddfc6b9d42982b1dd2), [`1b1c13a`](https://github.com/repobuddy/visual-testing/commit/1b1c13a986b708a8e1adc52cf05f52c46e937000), [`11e52da`](https://github.com/repobuddy/visual-testing/commit/11e52da2ebd7dc5d4d5d252942b7edbc40c81713), [`2f57b5b`](https://github.com/repobuddy/visual-testing/commit/2f57b5bf35f149b3058df5fd0b2e663387d26bf3), [`ccb67af`](https://github.com/repobuddy/visual-testing/commit/ccb67aff835baaefc883004fbada7a811425dbd3), [`31d9e29`](https://github.com/repobuddy/visual-testing/commit/31d9e29186a2fb0caa2e4c26be002e248f1160de), [`577e42b`](https://github.com/repobuddy/visual-testing/commit/577e42b5321b50b183a71a23c54dfaa87d5ad7a5), [`c3ec8f8`](https://github.com/repobuddy/visual-testing/commit/c3ec8f8f538f9aa84f17e4749dc46563d1605ed0), [`d7e7802`](https://github.com/repobuddy/visual-testing/commit/d7e780233226f4d6bfea955819789a00687a1fe9), [`033f725`](https://github.com/repobuddy/visual-testing/commit/033f725ca44bb8e213e94b6b001e7d8657fc48d7), [`766c035`](https://github.com/repobuddy/visual-testing/commit/766c035e798334e44e6489de86f05f4809e7fb76), [`51b4855`](https://github.com/repobuddy/visual-testing/commit/51b48557f66447b302ad1a27a9482db42c4dc90d), [`755f18a`](https://github.com/repobuddy/visual-testing/commit/755f18aba217a9d3beca842701b68f85873561e4), [`3c8eee0`](https://github.com/repobuddy/visual-testing/commit/3c8eee04308506040dafede505ab53736545c20d), [`f7ce143`](https://github.com/repobuddy/visual-testing/commit/f7ce1438e435aaaac6449b7f138034bb34b598f3), [`ea3735f`](https://github.com/repobuddy/visual-testing/commit/ea3735fbb88ecf93ef6f1b287871afe44a8185de), [`6978c83`](https://github.com/repobuddy/visual-testing/commit/6978c8371b626e508044f422bbfe9c3694337565)]:
  - vitest-plugin-vis@3.0.0

## 0.19.4

### Patch Changes

- Updated dependencies [[`0b83a6e`](https://github.com/repobuddy/visual-testing/commit/0b83a6e63fe7d7d770277dfd020443972ebbd9ad)]:
  - vitest-plugin-vis@2.4.4

## 0.19.3

### Patch Changes

- Updated dependencies [[`57be521`](https://github.com/repobuddy/visual-testing/commit/57be5217c3c12a7313c724c144c9227a4f227a4c)]:
  - vitest-plugin-vis@2.4.3

## 0.19.2

### Patch Changes

- Updated dependencies [[`349e021`](https://github.com/repobuddy/visual-testing/commit/349e02112ced61af05cc37bfbafa28363485c223)]:
  - vitest-plugin-vis@2.4.2

## 0.19.1

### Patch Changes

- Updated dependencies [[`e877872`](https://github.com/repobuddy/visual-testing/commit/e877872131ef2b14981cd8203b7f85f4141e4dd9)]:
  - vitest-plugin-vis@2.4.1

## 0.19.0

### Minor Changes

- [#238](https://github.com/repobuddy/storybook-addon-vis/pull/238) [`51346e2`](https://github.com/repobuddy/storybook-addon-vis/commit/51346e2c0c13850200b32db39a83d0d68f76cf26) Thanks [@unional](https://github.com/unional)! - Export `setAutoSnapshotOptions` and `SnapshotMeta` which are useful under `storybook-addon-vis/vitest-setup`.

### Patch Changes

- Updated dependencies [[`16c7886`](https://github.com/repobuddy/storybook-addon-vis/commit/16c78862fc5a14e7137fb3c7d3c60c9fe6ff674f), [`2c7afe9`](https://github.com/repobuddy/storybook-addon-vis/commit/2c7afe9778b3ea60b0667b3bae5a0ac066995c65)]:
  - vitest-plugin-vis@2.4.0

## 0.18.8

### Patch Changes

- Updated dependencies [[`4b665f9`](https://github.com/repobuddy/storybook-addon-vis/commit/4b665f940fd8f290de99875d3b0b6332e3aed38a)]:
  - vitest-plugin-vis@2.3.3

## 0.18.7

### Patch Changes

- Updated dependencies [[`2a2b000`](https://github.com/repobuddy/storybook-addon-vis/commit/2a2b000e1e9acc85dd9e81e0c569623ef1eb0724)]:
  - vitest-plugin-vis@2.3.2

## 0.18.6

### Patch Changes

- [#227](https://github.com/repobuddy/storybook-addon-vis/pull/227) [`b74a986`](https://github.com/repobuddy/storybook-addon-vis/commit/b74a9863fdef5227ae9fb5a23927be7b0323148f) Thanks [@unional](https://github.com/unional)! - Adjust `vitest-plugin-vis` usage

- Updated dependencies [[`13ef2a5`](https://github.com/repobuddy/storybook-addon-vis/commit/13ef2a53ca1a5e319b90e2c9d6a8f09945d87c0e)]:
  - vitest-plugin-vis@2.3.1

## 0.18.5

### Patch Changes

- [#225](https://github.com/repobuddy/storybook-addon-vis/pull/225) [`4692f23`](https://github.com/repobuddy/storybook-addon-vis/commit/4692f2360737e03699646a68572f7456badd53b6) Thanks [@unional](https://github.com/unional)! - Workaround a Storybook 8.4 issue where the `preview.beforeEach` is called after test instead of before.
  Because of that, the `setAutoSnapshotOptions()` called within test is not honored.
- Updated dependencies [[`15bbbed`](https://github.com/repobuddy/storybook-addon-vis/commit/15bbbedb717b57d94c334e26d99b59431f1f17e0), [`4692f23`](https://github.com/repobuddy/storybook-addon-vis/commit/4692f2360737e03699646a68572f7456badd53b6)]:
  - vitest-plugin-vis@2.3.0

## 0.18.4

### Patch Changes

- Updated dependencies [[`13601ef`](https://github.com/repobuddy/storybook-addon-vis/commit/13601ef5ecd4260eacf844f71dcf4ca941b88f6b)]:
  - vitest-plugin-vis@2.2.0

## 0.18.3

### Patch Changes

- Updated dependencies [[`bbbc8e8`](https://github.com/repobuddy/storybook-addon-vis/commit/bbbc8e89286c1dd39a67a267d64185ce5dc61908)]:
  - vitest-plugin-vis@2.1.1

## 0.18.2

### Patch Changes

- Updated dependencies [[`472acc9`](https://github.com/repobuddy/storybook-addon-vis/commit/472acc9e5ea0e78b26343fa662fdfc82dc3aaf2a)]:
  - vitest-plugin-vis@2.1.0

## 0.18.1

### Patch Changes

- [`24621e0`](https://github.com/repobuddy/storybook-addon-vis/commit/24621e0683bebc08d112d93c99e58d28e0dffb67) Thanks [@unional](https://github.com/unional)! - Update `type-plus`.

- Updated dependencies [[`a68f5c9`](https://github.com/repobuddy/storybook-addon-vis/commit/a68f5c9ea3786aa70dc03304236a67ef3fb333df), [`24621e0`](https://github.com/repobuddy/storybook-addon-vis/commit/24621e0683bebc08d112d93c99e58d28e0dffb67)]:
  - vitest-plugin-vis@2.0.1

## 0.18.0

### Minor Changes

- [#204](https://github.com/repobuddy/storybook-addon-vis/pull/204) [`020121f`](https://github.com/repobuddy/storybook-addon-vis/commit/020121f04d08feaf071db0beb65236e79feb695d) Thanks [@unional](https://github.com/unional)! - Change the `customizeSnapshotId` to accept `context` object.

  This is a breaking change.
  Feature-wise, it is the same as before.
  We will enable better customization by passing `viewport` to the `customizeSnapshotId` function in the future.

- [#204](https://github.com/repobuddy/storybook-addon-vis/pull/204) [`76b09cc`](https://github.com/repobuddy/storybook-addon-vis/commit/76b09cc00c5fc94026e2a5ab6283300325716675) Thanks [@unional](https://github.com/unional)! - Add support to customize `snapshotRootDir` with a function.
  Deprecate `platform` option.

### Patch Changes

- Updated dependencies [[`020121f`](https://github.com/repobuddy/storybook-addon-vis/commit/020121f04d08feaf071db0beb65236e79feb695d), [`76b09cc`](https://github.com/repobuddy/storybook-addon-vis/commit/76b09cc00c5fc94026e2a5ab6283300325716675)]:
  - vitest-plugin-vis@2.0.0

## 0.17.11

### Patch Changes

- [`caa49e3`](https://github.com/repobuddy/storybook-addon-vis/commit/caa49e34dd4eb6e4a31a88f2c254288ff0b6ccb1) Thanks [@unional](https://github.com/unional)! - Remove extra `vitest-plugin.js` and `vitest-plugin.d.ts`.

- [`e753448`](https://github.com/repobuddy/storybook-addon-vis/commit/e7534484526dc2e4d104076d9f564f47efca6297) Thanks [@unional](https://github.com/unional)! - Remove extra `vitest-setup.js` file.

## 0.17.10

### Patch Changes

- [#195](https://github.com/repobuddy/storybook-addon-vis/pull/195) [`d9ed547`](https://github.com/repobuddy/storybook-addon-vis/commit/d9ed547228ca4f51abd699dc2444aab06cbf0017) Thanks [@unional](https://github.com/unional)! - Add Storybook `tags` to snapshot options.

- Updated dependencies [[`972db1b`](https://github.com/repobuddy/storybook-addon-vis/commit/972db1bb1f511d9073a2600afa030ff9c46e864f)]:
  - vitest-plugin-vis@1.7.0

## 0.17.9

### Patch Changes

- Updated dependencies [[`be483d4`](https://github.com/repobuddy/storybook-addon-vis/commit/be483d412358158c4016eba573bf035252f6cbb5)]:
  - vitest-plugin-vis@1.6.5

## 0.17.8

### Patch Changes

- Updated dependencies [[`78b117f`](https://github.com/repobuddy/storybook-addon-vis/commit/78b117fef0510c993aad33ff92114d9a786b41d8)]:
  - vitest-plugin-vis@1.6.4

## 0.17.7

### Patch Changes

- [`433d0d8`](https://github.com/repobuddy/storybook-addon-vis/commit/433d0d87bcd498a56ce173534595b20563fdfa92) Thanks [@unional](https://github.com/unional)! - Export even more types to fix the inferred type cannot be named error!

## 0.17.6

### Patch Changes

- [#185](https://github.com/repobuddy/storybook-addon-vis/pull/185) [`c5296a1`](https://github.com/repobuddy/storybook-addon-vis/commit/c5296a15933cb26bb1792701c691f7ca67c5a4ee) Thanks [@unional](https://github.com/unional)! - Export more types to fix the inferred type cannot be named error.

- Updated dependencies [[`c5296a1`](https://github.com/repobuddy/storybook-addon-vis/commit/c5296a15933cb26bb1792701c691f7ca67c5a4ee)]:
  - vitest-plugin-vis@1.6.3

## 0.17.5

### Patch Changes

- Updated dependencies [[`49e8fbc`](https://github.com/repobuddy/storybook-addon-vis/commit/49e8fbc60a9e9e07e700a5d61164cf954186ce2d)]:
  - vitest-plugin-vis@1.6.2

## 0.17.4

### Patch Changes

- Updated dependencies [[`537cf83`](https://github.com/repobuddy/storybook-addon-vis/commit/537cf83b7cd6120876f46fc4bd5d51391128cab4)]:
  - vitest-plugin-vis@1.6.1

## 0.17.3

### Patch Changes

- [#171](https://github.com/repobuddy/storybook-addon-vis/pull/171) [`abd1c47`](https://github.com/repobuddy/storybook-addon-vis/commit/abd1c47fb032fc91ae69b10dafc5ab1186f70577) Thanks [@unional](https://github.com/unional)! - Support `subjectDataTestId` in `defineAutoSnapshotParam()`.

- Updated dependencies [[`5335011`](https://github.com/repobuddy/storybook-addon-vis/commit/5335011f32b59604cd0a3b653c04ac690b6ca5fa)]:
  - vitest-plugin-vis@1.6.0

## 0.17.2

### Patch Changes

- Updated dependencies [[`611e0cc`](https://github.com/repobuddy/storybook-addon-vis/commit/611e0cca505bfea0fe67ce10e45af2946a7cc578)]:
  - vitest-plugin-vis@1.5.1

## 0.17.1

### Patch Changes

- [#156](https://github.com/repobuddy/storybook-addon-vis/pull/156) [`72959a6`](https://github.com/repobuddy/storybook-addon-vis/commit/72959a6bd2bea3d9c1cff652b8ff384c10e017f2) Thanks [@unional](https://github.com/unional)! - Add top level `types` field to `package.json` for project not using ESM module resolution.

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

- Updated dependencies [[`72959a6`](https://github.com/repobuddy/storybook-addon-vis/commit/72959a6bd2bea3d9c1cff652b8ff384c10e017f2), [`d2fdcbe`](https://github.com/repobuddy/storybook-addon-vis/commit/d2fdcbe023917ea9dc85ac332dfd8b46f6936f20), [`43fc2ce`](https://github.com/repobuddy/storybook-addon-vis/commit/43fc2ce3385c0086de567816a1a1328ea4df336f), [`995140f`](https://github.com/repobuddy/storybook-addon-vis/commit/995140f0bda8c389a24f143f744dabe6d682a8ce), [`a020417`](https://github.com/repobuddy/storybook-addon-vis/commit/a02041770b32ca52baa35326ff77a39fe4b249c2), [`ee4ef14`](https://github.com/repobuddy/storybook-addon-vis/commit/ee4ef1492a0444bf1b24d2614c8365154038b351)]:
  - vitest-plugin-vis@1.5.0

## 0.17.0

### Minor Changes

- [#150](https://github.com/repobuddy/storybook-addon-vis/pull/150) [`e8ffc6b`](https://github.com/repobuddy/storybook-addon-vis/commit/e8ffc6bdc5b6df46e0f854b910db0d8a2691dcd6) Thanks [@unional](https://github.com/unional)! - Add `ssim` support.

### Patch Changes

- Updated dependencies [[`da95b08`](https://github.com/repobuddy/storybook-addon-vis/commit/da95b08e496d1f8a8b1663e55681510803e41082)]:
  - vitest-plugin-vis@1.4.0

## 0.16.4

### Patch Changes

- [`513d95c`](https://github.com/repobuddy/storybook-addon-vis/commit/513d95c9b1313a31589368daa4937e69aa64ee98) Thanks [@unional](https://github.com/unional)! - Add missing `.d.ts` files due to `tsup` set `clean` to `true` by default.

- Updated dependencies [[`1b22d2d`](https://github.com/repobuddy/storybook-addon-vis/commit/1b22d2d290a1fb18156cda3b846a402ad51481a2)]:
  - vitest-plugin-vis@1.3.2

## 0.16.3

### Patch Changes

- Updated dependencies [[`3ebc865`](https://github.com/repobuddy/storybook-addon-vis/commit/3ebc8655f3364a59de1d87930af53554dd9b4faa)]:
  - vitest-plugin-vis@1.3.1

## 0.16.2

### Patch Changes

- [#142](https://github.com/repobuddy/storybook-addon-vis/pull/142) [`9eaf9a8`](https://github.com/repobuddy/storybook-addon-vis/commit/9eaf9a8d887c4e5340150be2367134f0185b6312) Thanks [@unional](https://github.com/unional)! - Add `/matcher`.

- [#143](https://github.com/repobuddy/storybook-addon-vis/pull/143) [`7ebf3ae`](https://github.com/repobuddy/storybook-addon-vis/commit/7ebf3aefd5192e8f8b98a89295c8a328ff742b02) Thanks [@unional](https://github.com/unional)! - Use `ImageSnapshotMatcher` from `vitest-plugin-vis`.

- [#144](https://github.com/repobuddy/storybook-addon-vis/pull/144) [`f642dbf`](https://github.com/repobuddy/storybook-addon-vis/commit/f642dbfbb6a715ef14a944c50e656b79c926b5d4) Thanks [@unional](https://github.com/unional)! - Use `imageSnapshotMatcher` instead of `matchImageSnapshot` to fix storybook loading issue.

- Updated dependencies [[`2d4f1c0`](https://github.com/repobuddy/storybook-addon-vis/commit/2d4f1c02394ca4fd8880452a98399c825e686ee5), [`78cc195`](https://github.com/repobuddy/storybook-addon-vis/commit/78cc195e1ae9afe2fe102e0e916cffff406e0ebd), [`17510d3`](https://github.com/repobuddy/storybook-addon-vis/commit/17510d32272730ebf4677ed2c4b177f636e75cc2), [`f642dbf`](https://github.com/repobuddy/storybook-addon-vis/commit/f642dbfbb6a715ef14a944c50e656b79c926b5d4)]:
  - vitest-plugin-vis@1.3.0

## 0.16.1

### Patch Changes

- Updated dependencies [[`e4bef32`](https://github.com/repobuddy/storybook-addon-vis/commit/e4bef32a897015f5f84407610ef184eb3872f424), [`e0fec8e`](https://github.com/repobuddy/storybook-addon-vis/commit/e0fec8edf7c082bf31b10ea6040b216836740ab2), [`a3e3c89`](https://github.com/repobuddy/storybook-addon-vis/commit/a3e3c89341183a8ced5339290cc74d172b78f82d), [`eaa3bbe`](https://github.com/repobuddy/storybook-addon-vis/commit/eaa3bbe91076d42b7eb8b773c404b2e62d6c4930)]:
  - vitest-plugin-vis@1.2.0

## 0.16.0

### Minor Changes

- [#133](https://github.com/repobuddy/storybook-addon-vis/pull/133) [`badf227`](https://github.com/repobuddy/storybook-addon-vis/commit/badf2273828ad883763e1e328b4e180c07b4960a) Thanks [@unional](https://github.com/unional)! - Update to use `matchImageSnapshot` function from `vitest-plugin-vis/client` which runs image comparison on the client side.

### Patch Changes

- [#133](https://github.com/repobuddy/storybook-addon-vis/pull/133) [`ca68f7f`](https://github.com/repobuddy/storybook-addon-vis/commit/ca68f7fca68d225d495697214f397cbfc1e1cedb) Thanks [@unional](https://github.com/unional)! - Remove extra extend

- Updated dependencies [[`176d28f`](https://github.com/repobuddy/storybook-addon-vis/commit/176d28fc459cb0823f3fda94ad4e3372690dbd8d), [`0360253`](https://github.com/repobuddy/storybook-addon-vis/commit/03602536b5ebf67b7d898f95d6511e5b05da96a9), [`6912ad7`](https://github.com/repobuddy/storybook-addon-vis/commit/6912ad73041f7e46757f0f364dcaa6594a35ce9d), [`badf227`](https://github.com/repobuddy/storybook-addon-vis/commit/badf2273828ad883763e1e328b4e180c07b4960a)]:
  - vitest-plugin-vis@1.1.0

## 0.15.7

### Patch Changes

- Updated dependencies [[`e242444`](https://github.com/repobuddy/storybook-addon-vis/commit/e242444908766274014b5fc94afaf31392627c88)]:
  - vitest-plugin-vis@1.0.5

## 0.15.6

### Patch Changes

- Updated dependencies [[`d695c4f`](https://github.com/repobuddy/storybook-addon-vis/commit/d695c4fb0b0be80ce53e38884fcb7a6340a8e52d)]:
  - vitest-plugin-vis@1.0.4

## 0.15.5

### Patch Changes

- Updated dependencies [[`1068941`](https://github.com/repobuddy/storybook-addon-vis/commit/1068941b1495966cb3ee15a53dd5937e37365373)]:
  - vitest-plugin-vis@1.0.3

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
