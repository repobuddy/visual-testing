# Vitest Visual Testing Plugin

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

Vitest visual testing plugin allowing you to capture and compare image snapshots automatically and manually.

It requires [Vitest Browser Mode][vitest-browser-mode] to work.

This plugin is inspired by [`jest-image-snapshot`][jest-image-snapshot],
and extracted from [`storybook-addon-vis`][storybook-addon-vis] for better modularity.

## Install

```sh
npm install --save-dev vitest-plugin-vis

pnpm add --save-dev vitest-plugin-vis

yarn add --save-dev vitest-plugin-vis
```

## Config

The `vitest-plugin-vis` plugin can be used without customization.

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
- Local (non-CI) image snapshots are saved in the `<root>/__vis__/local` directory.
- CI image snapshots are saved in the `<root>/__vis__/<process.platform>` directory.
- Image snapshots of the current test run are saved in the `<root>/__vis__/*/__results__` directory.
- Diff images are saved in the `<root>/__vis__/*/__diffs__` directory.
- Baseline images are saved in the `<root>/__vis__/*/__baselines__` directory.

You can customize the configuration:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { vis, trimCommonFolder } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [
		vis({
			preset: 'auto',
			snapshotRootDir: ({
				ci, // true if running on CI
				platform, // process.platform
				providerName, // 'playwright' or 'webdriverio'
				browserName,
				screenshotFailures, // from `browser` config
				screenshotDirectory, // from `browser` config
			}) => `__vis__/${ci ? platform : 'local'}`,
			platform: '...', // {process.platform} or `local` (deprecated use `snapshotRootDir` instead)
			customizeSnapshotSubpath: (subpath) => trimCommonFolder(subpath),
			// will change to "isAutoSnapshot ? `${id}-auto` : `${id}-${index}`" in the next major release.
			customizeSnapshotId: ({ id, index, isAutoSnapshot }) => `${id}-${index}`,
			// set a default subject (e.g. 'subject') to capture image snapshot
			subjectDataTestId: undefined,
			comparisonMethod: 'pixel',
			// pixelmatch or ssim.js options, depending on `comparisonMethod`.
			diffOptions: undefined,
			timeout: 30000,
			failureThresholdType: 'pixel',
			failureThreshold: 0,
		})
	],
	test: {
		browser: {/* ... */}
	}
})
```

If you want to do a custom snapshot at the end of each test,
such as taking a snapshot for each theme,
you can set it up using a custom setup file:

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

// if you set `preset: none` in `vitest.config.ts`,
// you can use a preset manually here.

// Take snapshot at the end of each rendering test.
vis.presets.auto()
// Enable snapshot testing for manual snapshot only.
vis.presets.manual()
// Enable snapshot testing, allow auto snapshot with `setAutoSnapshotOptions()`
vis.presets.enable()

// Take image snapshot for each rendering test,
// one snapshot per theme (light and dark in this example).
//
// Note that this changes the theme in the `afterEach` hook.
// If you want to capture manual snapshots in different themes,
// configure Vitest to run the tests in different themes.
vis.presets.theme({
	async light() { document.body.classList.remove('dark') },
	async dark() { document.body.classList.add('dark') },
})
```

### TypeScript Configuration

The main usage of this addon is to use the `toMatchImageSnapshot` matcher.

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

## Usage

### Auto Preset

By default, the plugin will use the `auto` preset,
which will take a snapshot at the end of each rendering test.

You can control how the auto snapshot is taken using the `setAutoSnapshotOptions` function:

```ts
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { beforeEach, it } from 'vitest'

beforeAll((suite) => {
	// Apply options to all tests in the current suite (file)
	setAutoSnapshotOptions(suite, /* options */)
	// or
	setAutoSnapshotOptions(/* options */)
})

beforeEach(({ task }) => {
	// Apply options to all tests in the current scope
	setAutoSnapshotOptions(task, /* options */)
	// or
	setAutoSnapshotOptions(/* options */)
})


it('disable snapshot per test', async ({ task }) => {
	// Apply options to this test only
	setAutoSnapshotOptions(task, /* options */)
	// or
	setAutoSnapshotOptions(/* options */)
})

describe('nested scope', () => {
	beforeEach(({ task }) => {
		// Apply options to all tests in the current scope
		setAutoSnapshotOptions(task, /* options */)
		// or
		setAutoSnapshotOptions(/* options */)
	})
})
```

The options are similar to `expect(...).toMatchImageSnapshot(options)`:

```ts
// enable/disable auto snapshot
setAutoSnapshotOptions(true /* or false */)

// detailed options
setAutoSnapshotOptions({
	enable: true,
	comparisonMethod: 'pixel',
	customizeSnapshotId: ({ id, index, isAutoSnapshot }) => `${id}-custom-${index}`,
	// pixelmatch or ssim.js options, depending on `comparisonMethod`.
	diffOptions: { threshold: 0.01 },
	failureThreshold: 0.01,
	failureThresholdType: 'percent',
	timeout: 60000
})
```

You can also provide additional options, which you can use during theme to enable/disable snapshot for each theme:

```ts
setAutoSnapshotOptions({
	skipDark: true
})

// in vitest.setup.ts
vis.presets.theme({
	async dark(options) {
		if (options.skipDark) return false
		document.body.classList.add('dark')
	},
})
```

### Manual Preset

You can also set the preset to `manual` and compare snapshots manually:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		vis({ preset: 'manual' })
	],
	test:{
		browser: {/* ... */}
	}
})

// some.test.ts
import 'vitest-browser-react' // do this in your setup file to get `page.render`
import { page } from '@vitest/browser/context'
import { it } from 'vitest'

it('manual snapshot', async ({ expect }) => {
	page.render(<div data-testid="subject">hello world</div>)
	await expect(document.body).toMatchImageSnapshot(/* options */)
	// or
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot(/* options */)
})
```

You can customize the snapshot comparison options per assertion:

```ts
// some.test.ts
import 'vitest-browser-react' // do this in your setup file to get `page.render`
import { page } from '@vitest/browser/context'
import { it } from 'vitest'

it('manual snapshot with options', async ({ expect }) => {
	page.render(<div data-testid="subject">hello world</div>)
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

### Enable Preset

The `enable` preset allows you to take manual snapshot,
as well as auto snapshot at the end on a rendering test using the `setAutoSnapshotOptions` function:

```ts
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { beforeEach, it } from 'vitest'


it('take snapshot', async () => {
	setAutoSnapshotOptions(/* options */) // e.g. `true`

	// ...your test...
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
