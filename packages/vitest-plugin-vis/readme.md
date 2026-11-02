# Vitest Visual Testing Plugin

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

[![Release][github_release]][github_action_url]

Vitest visual testing plugin allowing you to capture and compare image snapshots automatically and manually.

It requires [Vitest Browser Mode][vitest-browser-mode] to work.

This plugin is inspired by [`jest-image-snapshot`][jest-image-snapshot],
and extracted from [`storybook-addon-vis`][storybook-addon-vis] to use directly in Vitest.

## Install

```sh
npm install --save-dev vitest-plugin-vis

pnpm add --save-dev vitest-plugin-vis

yarn add --save-dev vitest-plugin-vis
```

## Minimal configuration

The plugin can be used without customization.

```ts
// vitest.config.ts
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import { vis } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [vis()],
	test: {
		browser: {
			enabled: true,
			provider: playwright(),
			instances: [{ browser: 'chromium' }],
		},
	},
})
```

This default configuration will:

- Use the `auto` preset, taking image snapshot at the end on each rendering test.
- Use `pixelmatch` as the image comparison method.
- Set config to compare image snapshot with a failure threshold of `0 pixels`.
- Timeout for image comparison is set to `30000 ms`.
- Save image snapshots using the default directory structure.

The configuration follows `testcases/vpv/vitest.config.ts` in the repository, which sets more options and runs in its CI.
Ignore the snapshot folders and add the `vitest-plugin-vis` type to your `tsconfig.json`:

```sh
# .gitignore
**/__vis__/**/__diffs__
**/__vis__/**/__results__
**/__vis__/local
```

```json
{
	"compilerOptions": {
		"types": ["vitest-plugin-vis"]
	}
}
```

## Example

A manual snapshot of a locator:

```tsx
// some.test.tsx
import { it } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-react'

it('accepts a Locator', async ({ expect }) => {
	await render(
		<div data-testid="subject" style={{ width: 100 }}>
			hello
		</div>,
	)
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot()
})
```

This is the `accepts a Locator` test of `src/client/expect/to_match_image_snapshot.spec.tsx`.

## Version compatibility

| `vitest-plugin-vis` | Vitest | Source |
| ------------------- | ------ | ------ |
| 5.x | `^4` (also `@vitest/browser` `^4`; `@vitest/browser-playwright` and `@vitest/browser-webdriverio` `^4`, optional) | `peerDependencies` in `package.json` |
| 4.x | 4 | `CHANGELOG.md` 4.0.0 ("Update to Vitest v4") |
| 3.x | 2 or 3 | the [install page][docs_install] ("For Vitest 2 or 3, please use v3") |
| 1.x, 2.x | not derivable | |

Vitest 2 and 3 use a different browser configuration shape from the Vitest 4 example above (`browser.name` or a string `provider`).
Follow the readme of the version you install.

## Documentation

Full documentation is on the [documentation website][docs]:

- [Install][docs_install] and [Configuration][docs_configuration]: Vitest config, `.gitignore`, TypeScript
- [`vis()` config options][docs_vis], including `preset`, `subject`, comparison options and `shortenLongSnapshotPaths`
- [Config overview][docs_config_overview]: customizing the snapshot path (`snapshotRootDir`, `snapshotSubpath`, `snapshotKey`)
- [`vis.setup()`][docs_setup_vis]: the `custom` preset and per-theme auto snapshots
- [`setAutoSnapshotOptions()`][docs_auto]: automatic snapshots
- [`expect().toMatchImageSnapshot()`][docs_expect], [`page.toMatchImageSnapshot()`][docs_page] and [`page.hasImageSnapshot()`][docs_has]: manual snapshots, full page snapshots and checking for a snapshot
- [Reviewing failures with agents][docs_agents]

For AI agents, [`llms.txt`](llms.txt) in this package lists the entry points and documentation pages.
The site-wide copy is at <https://repobuddy.github.io/visual-testing/llms.txt>.

The sections below have no page on the website yet.

## Multiple browser instances

When using multiple browser instances (e.g., different viewports or browsers),
each instance runs the same tests and would overwrite snapshots if they shared the same directory.
Use `projectName` in `snapshotRootDir` to separate snapshots per instance:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { vis } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [
		vis({
			snapshotRootDir({ ci, rootDir, projectName, platform }) {
				return `${rootDir}/${ci ? platform : 'local'}/${projectName}`
			},
		}),
	],
	test: {
		browser: {
			enabled: true,
			provider: playwright(),
			instances: [
				{ browser: 'chromium', name: 'HD', viewport: { width: 1280, height: 720 } },
				{ browser: 'chromium', name: 'SVGA', viewport: { width: 800, height: 600 } },
			],
		},
	},
})
```

With this configuration, snapshots are stored in separate directories per instance:

```sh
__vis__/local/HD/__baselines__/...
__vis__/local/SVGA/__baselines__/...
```

On CI, the `projectName` corresponds to the `name` of each instance.
See [vitest.config.playwright.ts](https://github.com/repobuddy/visual-testing/blob/main/packages/vitest-plugin-vis/vitest.config.playwright.ts) for a full example.

## TypeScript: triple-slash reference

Instead of the `types` option in the minimal configuration, you can use a triple-slash reference.

Create a typing file, e.g. `types/vitest-plugin-vis.d.ts`:

```ts
/// <reference types="vitest-plugin-vis" />
```

Make sure to include this file in your `tsconfig.json`:

```json
{
	"files": ["types/vitest-plugin-vis.d.ts"],
	// or
	"include": ["src", "types"]
}
```

## Long snapshot paths (`shortenLongSnapshotPaths`)

Defaults to `false`. When `true`, the plugin keeps legacy snapshot files as `taskId-key.png` and only adjusts the **`snapshotSubpath` segment** when needed: it builds **absolute** paths under `__baselines__` (after `snapshotRootDir` and your `snapshotSubpath`) plus representative snapshot filenames; if those would exceed typical Windows limits (length at least **250**, below classic `MAX_PATH` **260** with margin, or a path component longer than **255**), **directory segments stay as-is** and only the **final path component** (the file name derived from your test/story path) is shortened to `{firstToken}-{hash12}{ext}` — the first token is the substring before the first `.` in the basename (similar in spirit to [tersify](https://github.com/unional/tersify) terse labels). The same resolved subpath is used for **baselines**, **results**, and **diffs**. Your `snapshotRootDir` is not rewritten.

The option is listed on the [`vis()` options page][docs_vis], in a shorter form.

## `webdriverio` Support

While Vitest Browser Mode supports both `playwright` and `webdriverio`,
`webdriverio` currently does not work well with visual testing.

There are two issues we are aware of:

> `element click intercepted: WebDriverError: element click intercepted: Element is not clickable at point`

This occurs in CI when `--window-size` is not set.
To work around this issue, you can set the `--window-size` flag in your config:

```ts
// vitest.config.ts

export default {
	test: {
		browser: {
			instances: [
				{
					browser: 'chrome',
					capabilities: {
						'goog:chromeOptions': {
						args: ['--window-size=1280,720']
						}
					}
				}
			]
		}
	}
}
```

> `fullPage` is not working

This occurs when the browser is in `headless` mode.
But even when it is not in `headless` mode,
the resulting snapshot is still not capturing the full page.

For the time being, we recommend using `playwright` for visual testing.

## Vitest Browser Mode

Vitest visual testing plugin runs on [Vitest Browser Mode][vitest-browser-mode].
Please follow its guide to set up your environment.

Bonus note, if you want to install [Firefox] on WSL,
you can follow these steps: [Install Firefox on Ubuntu 22.04](https://askubuntu.com/a/1444967).
Also, you may need to `sudo apt-get install xdg-utils` to fix [`xdg-settings: not found`](https://serverfault.com/questions/1091926/running-chrome-on-ubuntu-server-how-to-solve-xdg-settings-not-found-using).

## Running on CI

When running on CI, the plugin will save the image snapshots in the `<root>/__vis__/<process.platform>` directory.

The image snapshots are taken on the server side using `playwright` or `webdriverio` depending on your browser provider.
It is recommended to run your tests serially to avoid flakiness.

## Migrating from v2

[`vitest-plugin-vis`][vitest-plugin-vis] v3 is a number of breaking changes from v2.

If you are using `vitest-plugin-vis` v2,
you can follow the migration guide below to use v3.

> Preset changes

The `enable` and `manual` options are combined as `manual`.
The only difference between `enable` and `manual` was that `manual` was not capable to take automatic snapshot even when you use `setAutoSnapshotOptions` in your test.

> `platform` option is removed

The `platform` option is removed.
It is replaced with `snapshotRootDir` which takes a function to determine the snapshot root directory.

> `customizeSnapshotSubpath` is replaced with `snapshotSubpath`

The main difference is that `customizeSnapshotSubpath` receives the `subpath` as a string,
while `snapshotSubpath` receives `{ subpath: string }`.

This change allows us to expand it by adding more properties such as `viewport` in the future.

> `customizeSnapshotId` is replaced with `snapshotKey`

In v3, we need a stable snapshot ID to be able to identify snapshots originated from the same test.
We couldn't to that with `customizeSnapshotId`.

The `snapshotKey` has a reduced responsibility of only customizing the snapshot key,
which is added to the end of the snapshot filename.

Let's say you have a test file `src/components/x/x.test.ts`.
Within that file, you have a test:

```ts
// src/components/x/x.test.ts

describe('some scope', () => {
	it('should do something', () => {
		// ...
	})
})
```

By default, the snapshot will be saved in the following path:

```sh
// auto snapshot
__vis__/local/__baselines__/components/x/x.test.ts/some-scope/should-do-something-auto.png

// manual snapshot
__vis__/local/__baselines__/components/x/x.test.ts/some-scope/should-do-something-1.png

// auto snapshot map: `{ light() {...}, dark() {...} }`
__vis__/local/__baselines__/components/x/x.test.ts/some-scope/should-do-something-light.png
__vis__/local/__baselines__/components/x/x.test.ts/some-scope/should-do-something-dark.png
```

The `snapshotKey` defined in your config or is `setAutoSnapshotOptions()` will affect the auto snapshot

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		vis({
			snapshotKey: 'custom'
		})
	]
})

// or
// src/components/x/x.test.ts

describe('some scope', () => {
	it('should do something', () => {
		setAutoSnapshotOptions({
			snapshotKey: 'custom'
		})
		// ...
	})
})
```

```sh
// auto snapshot
__vis__/local/__baselines__/components/x/x.test.ts/some-scope/should-do-something-auto.png
// becomes
__vis__/local/__baselines__/components/x/x.test.ts/some-scope/should-do-something-custom.png
```

If you define a `snapshotKey` in your manual snapshot,
expectedly it will be used for that snapshot only.

```ts
// src/components/x/x.test.ts

describe('some scope', () => {
	it('should do something', () => {
		expect(document.body).toMatchImageSnapshot({
			snapshotKey: 'custom'
		})
		page.toMatchImageSnapshot({
			snapshotKey: 'custom'
		})
	})
})
```

```sh
// manual snapshot
__vis__/local/__baselines__/components/x/x.test.ts/some-scope/should-do-something-1.png
// becomes
__vis__/local/__baselines__/components/x/x.test.ts/some-scope/should-do-something-custom.png
```

> `subjectDataTestId` is replaced with `subject`

If you are using `subjectDataTestId` in your config,
you can replace it with `subject` in your config.

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { vis } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [
		vis({
			// subjectDataTestId: 'subject'
			subject: '[data-testid="subject"]'
		})
	]
})
```

## FAQ

> feature X in [`jest-image-snapshot`][jest-image-snapshot] is missing

Some features in [`jest-image-snapshot`][jest-image-snapshot] are not implemented in [`vitest-plugin-vis`][vitest-plugin-vis] yet.
This is because through our own usage, we do not found a good use case for them.

If you have a good use case for these features, please open an issue or PR.

[docs]: https://repobuddy.github.io/visual-testing/
[docs_agents]: https://repobuddy.github.io/visual-testing/guides/reviewing-failures-with-agents/
[docs_auto]: https://repobuddy.github.io/visual-testing/reference/plugin/set-auto-snapshot-options/
[docs_config_overview]: https://repobuddy.github.io/visual-testing/reference/plugin/config/overview/
[docs_configuration]: https://repobuddy.github.io/visual-testing/plugin/configuration/
[docs_expect]: https://repobuddy.github.io/visual-testing/reference/plugin/matchers/expect-to-match-image-snapshot/
[docs_has]: https://repobuddy.github.io/visual-testing/reference/plugin/matchers/has-image-snapshot/
[docs_install]: https://repobuddy.github.io/visual-testing/plugin/install/
[docs_page]: https://repobuddy.github.io/visual-testing/reference/plugin/matchers/page-to-match-image-snapshot/
[docs_setup_vis]: https://repobuddy.github.io/visual-testing/reference/plugin/setup/vis/
[docs_vis]: https://repobuddy.github.io/visual-testing/reference/plugin/config/vis/
[downloads_image]: https://img.shields.io/npm/dm/vitest-plugin-vis.svg?style=flat
[firefox]: https://www.mozilla.org/en-US/firefox/
[github_action_url]: https://github.com/repobuddy/visual-testing/actions/workflows/release.yml
[github_release]: https://github.com/repobuddy/visual-testing/actions/workflows/release.yml/badge.svg
[jest-image-snapshot]: https://github.com/americanexpress/jest-image-snapshot
[npm_image]: https://img.shields.io/npm/v/vitest-plugin-vis.svg?style=flat
[npm_url]: https://npmjs.org/package/vitest-plugin-vis
[storybook-addon-vis]: https://www.npmjs.com/package/storybook-addon-vis
[vitest-browser-mode]: https://vitest.dev/guide/browser/
[vitest-plugin-vis]: https://www.npmjs.com/package/vitest-plugin-vis
