# Vitest Visual Testing Plugin

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

Vitest visual testing plugin supports zero-config setup.

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { vis } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [vis()],
	test: {
		browser: {
			// typical browser config
			enabled: true,
			provider: 'playwright',
			name: 'chromium'
		}
	}
})
```

This default configuration will:

- Use `pixelmatch` as the image comparison method.
- Use the `auto` preset, taking image snapshot at the end on each rendering test.
- Set config to compare image snapshot with a failure threshold of `0 pixels`.
- Local (non-CI) image snapshots are saved in the `<root>/__vis__/local` directory.
- CI image snapshots are saved in the `<root>/__vis__/<process.platform>` directory.
- Image snapshots of the current test run are saved in the `<root>/__vis__/__results__` directory.
- Diff images are saved in the `<root>/__vis__/__diffs__` directory.

You can customize the configuration:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { vis, trimCommonFolder } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [
		vis({
			preset: 'auto',
			comparisonMethod: 'pixel',
			snapshotRootDir: '__vis__',
			customizeSnapshotSubpath: (subpath) => trimCommonFolder(subpath),
			customizeSnapshotId: (id, index) => `${id}-${index}`,
			platform: '...', // {process.platform} or `local`
			// pixelmatch or ssim.js options, depending on `comparisonMethod`.
			diffOptions: undefined,
			failureThresholdType: 'pixel',
			failureThreshold: 0,
			timeout: 30000
		})
	],
	test:{
		browser:{/* ... */}
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
		// preset is disabled by default when you provide a custom config
		vis({}) // or vis({ preset: 'none' })
	],
	test:{
		browser:{/* ... */},
		setupFiles: ['vitest.setup.ts']
	}
})

// vitest.setup.ts
import { vis } from 'vitest-plugin-vis/setup'

// if you set `preset: none` in `vitest.config.ts`,
// you can enable `auto` or `manual` setup here
vis.presets.auto()
vis.presets.manual()


// or capture image snapshot for all rendering tests
// for multiple themes (light and dark in this example)
vis.presets.theme({
	light() { document.body.classList.remove('dark') },
	dark() { document.body.classList.add('dark') },
})
```

### TypeScript Configuration

The main usage of this addon is to use the `toMatchImageSnapshot` matcher.

Since it is exposed under the `expect` object of `vitest`,
you typically do not need to import `storybook-addon-vis` directly.

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

### Auto Snapshot

By default, the plugin will use the `auto` preset,
which will take a snapshot at the end of each test.

You can control how the auto snapshot is taken using the `setAutoSnapshotOptions` function:

```ts
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { beforeEach, it } from 'vitest'

beforeAll((suite) => {
	// Apply options to all tests in the current suite (file)
	setAutoSnapshotOptions(suite, /* options */)
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
	customizeSnapshotId: (id, index) => `${id}-custom-${index}`,
	// pixelmatch or ssim.js options, depending on `comparisonMethod`.
	diffOptions: { threshold: 0.01 },
	failureThreshold: 0.01,
	failureThresholdType: 'percent',
	timeout: 60000
})
```

### Manual Snapshot

You can also set the preset to `manual` and compare snapshots manually:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		vis({ preset: 'manual' })
	],
	test:{
		browser:{/* ... */}
	}
})

// some.test.ts
import 'vitest-browser-react' // do this in your setup file to get `page.render`
import { page } from '@vitest/browser/context'
import { expect, it } from 'vitest'

it('manual snapshot', async () => {
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
import { expect, it } from 'vitest'

it('manual snapshot with options', async () => {
	page.render(<div data-testid="subject">hello world</div>)
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot({
		customizeSnapshotId: (id, index) => `${id}-custom-${index}`,
		failureThreshold: 0.01,
		failureThresholdType: 'percent',
		diffOptions: {
			threshold: 0.1
		},
		timeout: 60000
	})
})
```

### Has Snapshot

While less common, you can also check if a snapshot exists:

```ts
import { page } from '@vitest/browser/context'
import { expect, it } from 'vitest'

it('Has Snapshot', async () => {
	const hasSnapshot = await page.hasImageSnapshot(/* options */)
	if (!hasSnapshot) {
		// do something
	}
	else {
		// do something else
	}
})
```

This is useful when you are performing some negative test.

## Git Ignore

The local snapshots, current run results, and diffs should be ignored by git.
Add the following lines to your `.gitignore` file:

```sh
**/__vis__/__diffs__
**/__vis__/__results__
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

[firefox]: https://www.mozilla.org/en-US/firefox/
[jest-image-snapshot]: https://github.com/americanexpress/jest-image-snapshot
[storybook-addon-vis]: https://github.com/repobuddy/storybook-addon-vis
[vitest-browser-mode]: https://vitest.dev/guide/browser/
[vitest-plugin-vis]: https://www.npmjs.com/package/vitest-plugin-vis
