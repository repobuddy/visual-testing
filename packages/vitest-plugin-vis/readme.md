# Vitest Visual Testing Plugin

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

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

## Config

The [`vitest-plugin-vis`][vitest-plugin-vis] plugin can be used without customization.

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { vis } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [vis()],
	test: {
		// vitest v2
		browser: {
			enabled: true,
			provider: 'playwright',
			name: 'chromium',
		},
		// vitest v3
		browser: {
			enabled: true,
			provider: 'playwright',
			instances: [
				{ browser: 'chromium' }
			]
		}
	}
})
```

This default configuration will:

- Use the `auto` preset, taking image snapshot at the end on each rendering test.
- Use `pixelmatch` as the image comparison method.
- Set config to compare image snapshot with a failure threshold of `0 pixels`.
- Timeout for image comparison is set to `30000 ms`.
- Save image snapshots using the default directory structure.

### Customizing snapshot path

Let's say you have this test:

```ts
// src/components/MyComponent.spec.tsx

describe('MyComponent', () => {
	describe('className', () => {
		it('can customize className', () => {
			// ...
		})
	})
})
```

By default, when you run the test locally, the image snapshot will be saved in the following path:

```sh
__vis__/local/__baselines__/components/MyComponent.spec.tsx/MyComponent/className/can-customize-className-auto.png
```

This path can be broken down into a few parts:

> `__vis__/local`: `snapshotRootDir`

This is the `snapshotRootDir` where the image snapshots folders are placed.
When running on CI, the `snapshotRootDir` is default to `__vis__/<process.platform>`.

> `__baselines__`: baseline folder

This is the folder where the baseline images are saved and used for comparison.
There is also a `__results__` folder where the current test run images are saved,
and a `__diffs__` folder where the diff images are saved if the comparison fails.

> `components/MyComponent.spec.tsx`: `snapshotSubpath`

This is part of the path based on the path of the test file relative to the project root.
By default, the plugin will trim the common folder such as `src` or `test` from the path to reduce the path length.

If you place your test files in multiple folders,
such as in both `tests` and `src` folders,
and they might have files with the same name and create conflicting snapshots,
you can customize it.

> `MyComponent/className/can-customize-className`: `snapshotId`

This is the ID of the snapshot based on the test name and scope.
This is not customizable.

> `auto`: `snapshotKey`

This is the key of the snapshot.
In this case, it is `auto` because the snapshot is taken automatically at the end of the test.

You can customize the `snapshotRootDir`, `snapshotSubpath`, and `snapshotKey` with corresponding options:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { vis, trimCommonFolder } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [
		vis({
			snapshotRootDir: ({
				ci, // true if running on CI
				platform, // process.platform
				providerName, // 'playwright' or 'webdriverio'
				browserName, // 'chromium', 'firefox', etc.
				screenshotFailures, // from `browser` config
				screenshotDirectory, // from `browser` config
			}) => `__vis__/${ci ? platform : 'local'}`,
			snapshotSubpath: ({ subpath }) => trimCommonFolder(subpath),
			snapshotKey: ({ key }) => key,
		})
	]
})
```

### `preset`

The `preset` option set up typical visual testing scenarios.

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { vis } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [
		vis({
			preset: 'auto' // or 'manual' or 'none'
		})
	],
})
```

- `auto` (default): Automatically take a snapshot at the end of each rendering test.
- `manual`: You control which test(s) should take a snapshot automatically with the `setAutoSnapshotOptions()` function.
- `none`: Without preset. Set up your visual testing strategy in `vitest.setup.ts`.

When using the `auto` or `manual` preset,
manual snapshots are enabled. You can take manual snapshot using the `expect().toMatchImageSnapshot()` matcher,
or the `page.toMatchImageSnapshot()` for full page snapshot.

If you want to customize the snapshot behavior,
you can set the `preset` to `none` and configure your own snapshot strategy in `vitest.setup.ts`:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { vis } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [
		vis({ preset: 'none' })
	],
	test: {
		browser: {/* ... */},
		setupFiles: ['vitest.setup.ts']
	}
})

// vitest.setup.ts
import { vis } from 'vitest-plugin-vis/setup'

vis.setup({
	auto: true,
	auto: async ({ meta }) => meta['darkOnly'],
	auto: {
		async light() { document.body.classList.remove('dark') },
		async dark() { document.body.classList.add('dark') },
	}
})
```

As seen in the example above,
you can configure the `auto` preset to:

- Enable/disable auto snapshot for all tests with `auto: true/false`,
- Perform some actions before the snapshot is taken,
- Skip certain snapshots for specific tests by returning `false` in the function,
- Take snapshots for different themes by providing an object.

### Customizing snapshot comparison options

You can customize the snapshot comparison options globally in the config:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { vis } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [
		vis({
			// set a default subject (e.g. 'subject') to capture image snapshot
			subjectDataTestId: undefined,
			comparisonMethod: 'pixel', // or 'ssim'
			// pixelmatch or ssim.js options, depending on `comparisonMethod`.
			diffOptions: undefined,
			timeout: 30000,
			failureThresholdType: 'pixel',
			failureThreshold: 0,
		})
	]
})
```

### TypeScript Configuration

The main usage of this add-on is to use the `toMatchImageSnapshot` matcher.

Since it is exposed under the `expect` object of `vitest`,
you typically do not need to import `vitest-plugin-vis` directly.

Because of this, TypeScript may not recognize the matcher.
To address this, you can add the following to your `tsconfig.json`:

```json
{
	"compilerOptions": {
		"types": ["vitest-plugin-vis"]
	}
}
```

Or use the triple-slash reference.

To do that, create a typing file, e.g. `types/vitest-plugin-vis.d.ts`:

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

## Usage

### Automatic snapshots

By default, the plugin will use the `auto` preset,
which will take a snapshot at the end of each rendering test.

You can control how the auto snapshot is taken using the `setAutoSnapshotOptions` function:

```ts
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { beforeEach, it } from 'vitest'

beforeAll((suite) => {
	// Apply options to all tests in the current suite (file)
	setAutoSnapshotOptions(/* options */)
})

beforeEach(({ task }) => {
	// Apply options to all tests in the current scope
	setAutoSnapshotOptions(/* options */)
})


it('disable snapshot per test', async ({ task }) => {
	// Apply options to this test only
	setAutoSnapshotOptions(/* options */)
})

describe('nested scope', ()  => {
	beforeEach(({ task }) => {
		// Apply options to all tests in the current scope
		setAutoSnapshotOptions(/* options */)
	})
})
```

It supports options of `expect(...).toMatchImageSnapshot(options)`:

```ts
setAutoSnapshotOptions({
	enable: true,
	comparisonMethod: 'pixel',
	snapshotKey: 'auto',
	diffOptions: { threshold: 0.01 },
	failureThreshold: 0.01,
	failureThresholdType: 'percent',
	timeout: 60000
})
```

You can also enable/disable auto snapshot by passing boolean:

```ts
// enable/disable auto snapshot
setAutoSnapshotOptions(true /* or false */)
```

You can also provide additional options, which you can use during theme to enable/disable snapshot for each theme:

```ts
setAutoSnapshotOptions({
	skipDark: true
})

// in vitest.setup.ts
vis.setup({
	auto: {
		async dark(options) {
			if (options.skipDark) return false
			document.body.classList.add('dark')
		},
	}
})
```

### Manual Snapshots

You can take snapshots manually:

```ts
// some.test.ts
import { render } from 'vitest-browser-react'
import { page } from '@vitest/browser/context'
import { it } from 'vitest'

it('manual snapshot', async ({ expect }) => {
	render(<div data-testid="subject">hello world</div>)
	await expect(document.body).toMatchImageSnapshot(/* options */)
	// or
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot(/* options */)
})
```

You can customize the snapshot comparison options per assertion:

```ts
// some.test.ts
import { render } from 'vitest-browser-react'
import { page } from '@vitest/browser/context'
import { it } from 'vitest'

it('manual snapshot with options', async ({ expect }) => {
	render(<div data-testid="subject">hello world</div>)
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot({
		customizeSnapshotId: ({ id, index, isAutoSnapshot }) => `${id}-custom-${index}`,
		failureThreshold: 0.01,
		failureThresholdType: 'percent',
		diffOptions: {
			threshold: 0.1
		},
		timeout: 60000
	})
})
```

### Full Page Snapshot

You can also take a full page snapshot:

```ts
import { page } from '@vitest/browser/context'
import { it } from 'vitest'

it('full page snapshot', async () => {
	await page.toMatchImageSnapshot({ fullPage: true })
})
```

### Has Snapshot

While less common, you can also check if a snapshot exists:

```ts
import { page } from '@vitest/browser/context'
import { it } from 'vitest'

it('Has Snapshot', async ({ expect }) => {
	const hasSnapshot = await page.hasImageSnapshot(/* options */)
	if (!hasSnapshot) {
		// do something
	}
	else {
		// do something else
	}
})
```

This is useful when you are performing negative test.

### `webdriverio` Support

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

## Git Ignore

The local snapshots, current run results, and diffs should be ignored by git.
Add the following lines to your `.gitignore` file:

```sh
**/__vis__/**/__diffs__
**/__vis__/**/__results__
**/__vis__/local
```

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
you can follow the migration guide here to use v3.

> Preset changes

The `enable` and `manual` options are combined as `manual`.
The only difference between `enable` and `manual` was that `manual` was not capable to take automatic snapshot even when you use `setAutoSnapshotOptions` in your test.

> `platform` option is removed

The `platform` option is removed.
It is replaced with `snapshotRootDir` which takes a function to determine the snapshot root directory.

> `customizeSnapshotSubpath` and `customizeSnapshotId` is replaced with `snapshotInfo`

In v3, we need a stable snapshot ID to be able to identify snapshots originated from the same test.
We couldn't to that with `customizeSnapshotSubpath` and `customizeSnapshotId`.

With `snapshotInfo`, you can still customize the snapshot overall path,
but it is separated into three parts: `path`, `name`, and `key`.

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

For this test, the `snapshotInfo()` will be called with:

- `path`: `src/components/x/x.test.ts`
- `name`: `some scope/should do something`

The `key` indicates which snapshot it is:

- `key`: `'auto'` when using the `auto` preset
- `key`: `'some key'` is the key of the object when you pass an object to the `auto` props.
- `key`: `0..n` for each manual snapshot

## FAQ

> feature X in [`jest-image-snapshot`][jest-image-snapshot] is missing

Some features in [`jest-image-snapshot`][jest-image-snapshot] are not implemented in [`vitest-plugin-vis`][vitest-plugin-vis] yet.
This is because through our own usage, we do not found a good use case for them.

If you have a good use case for these features, please open an issue or PR.

[downloads_image]: https://img.shields.io/npm/dm/vitest-plugin-vis.svg?style=flat
[firefox]: https://www.mozilla.org/en-US/firefox/
[jest-image-snapshot]: https://github.com/americanexpress/jest-image-snapshot
[npm_image]: https://img.shields.io/npm/v/vitest-plugin-vis.svg?style=flat
[npm_url]: https://npmjs.org/package/vitest-plugin-vis
[storybook-addon-vis]: https://github.com/repobuddy/storybook-addon-vis
[vitest-browser-mode]: https://vitest.dev/guide/browser/
[vitest-plugin-vis]: https://www.npmjs.com/package/vitest-plugin-vis
