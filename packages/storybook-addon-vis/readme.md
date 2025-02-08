# Storybook Vitest Visual Testing addon

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

[![Release][github_release]][github_action_url]

[`storybook-addon-vis`][storybook-addon-vis] captures and compares image snapshot automatically and manually.

This addon is inspired by [`jest-image-snapshot`][jest-image-snapshot].

Starting from [Storybook] 8.3,
Storybook introduces [Storybook Test addon][storybook-test-addon].

It allows you to test your components directly inside Storybook.
It does this by using a [Vitest plugin][@storybook/experimental-addon-test] to transform your [stories] into [Vitest] tests using [portable stories][portable-stories].

These stories are then run by [Vitest] in the browser using [Vitest Browser Mode][vitest-browser-mode].

Since it is running in an actual browser,
[`jest-image-snapshot`][jest-image-snapshot] does not work as it depends on NodeJS.
This add-on provides similar functionality to [`jest-image-snapshot`][jest-image-snapshot].

In addition, you can capture image snapshot manually,
and more controls to the auto image snapshot taken.

## Install

```sh
npm install --save-dev storybook-addon-vis

pnpm add --save-dev storybook-addon-vis

yarn add --save-dev storybook-addon-vis
```

## Config

This add-on provides features on both [Storybook] and [Vitest],
thus you need to add it to both [Storybook] and [Vitest].

### Vitest Configuration

For [Vitest], you need to:

- Add the `storybookVis` plugin in your `vitest.config.ts`.
- Add project annotations and setup Vitest life cycle in `vitest.setup.ts`.

#### Edit Vitest Config

```ts
// vitest.config.ts
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		storybookTest(),
		storybookVis(/* options */)
	],
	test: {
		browser: {
			// typical browser config
			enabled: true,
			provider: 'playwright',
			name: 'chromium'
		},
		// recommend to set to false
		globals: false,
		// Needed by both Storybook Test Addon and Storybook Visual Testing
		setupFiles: ['./vitest.setup.ts'],
	}
})
```

This default configuration will:

- Use `pixelmatch` as the diffing algorithm.
- Set config to compare image snapshot with a failure threshold of `0 pixels`.
- Timeout for image comparison is set to `30000 ms`.
- Local (non-CI) image snapshots are saved in the `<root>/__vis__/local` directory.
- CI image snapshots are saved in the `<root>/__vis__/<process.platform>` directory.
- Image snapshots of the current test run are saved in the `<root>/__vis__/*/__results__` directory.
- Diff images are saved in the `<root>/__vis__/*/__diffs__` directory.
- Baseline images are saved in the `<root>/__vis__/*/__baselines__` directory.

You can customize `storybookVis()` by providing additional `options`.
It is the same option in [`vitest-plugin-vis`][vitest-plugin-vis] minus the `preset`:

```ts
// vitest.config.ts
import { storybookVis, trimCommonFolder } from 'storybook-addon-vis/vitest-plugin'

export default defineConfig({
	plugins: [
		storybookVis({
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
			customizeSnapshotId: (id, index) => `${id}-${index}`,
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
})
```

`storybookVis()` does not provide the `auto` or `manual` presets because you will need to [provide your `vitest.setup.ts`][storybook-test-addon#example-config] to make the story configuration available to Vitest anyway.
So it is better to do the setup in one place.

##### Snapshot folder

By default, the snapshots are stored under the `__vis__` folder at the root of your project:

```ini
v __vis__
	˃ darwin # snapshot generated on macos by CI
	˃ linux # snapshot generated on linux by CI
	v local # snapshot generated on local machine
		˃ __diffs__ # where the diff images are stored
		˃ __results__ # where the resulting snapshot of the current run are stored
		˃ __baselines__ # where the baseline images are stored
			v button.stories.tsx
				snapshot-1.png
				snapshot-2.png
v src
	button.stories.tsx
```

You can change the snapshot folder by providing the `snapshotRootDir` option to the `storybookVis` function.

```ts
// vitest.config.ts
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		storybookVis({
			snapshotRootDir: 'path/to/snapshot'
		})
	],
	// ...
})
```

Typically, you place your test files either in a dedicated `tests` folder or in the `src` folder along with your source code.
By default, [`storybook-addon-vis`][storybook-addon-vis] removes that folder to reduces nesting.

If you place your test files in multiple folders,
such as in both `tests` and `src` folders,
you can use `customizeSnapshotSubpath` to customize the snapshot sub-path to avoid conflicts.

```ts
// vitest.config.ts
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		storybookVis({
			// keep the folder structure
			customizeSnapshotSubpath: (subpath) => subpath
		})
	],
	// ...
})
```

With the above configuration, the snapshot folder structure will look like this:

```ini
v __vis__
	> # ...
	v local # snapshot generated on local machine
		> __baselines__
			v examples
				v button.stories.tsx
					snapshot-1.png
					snapshot-2.png
			v src
				v button.stories.tsx
					snapshot-1.png
					snapshot-2.png
			v tests
				v button.stories.tsx
					snapshot-1.png
					snapshot-2.png
v examples
	button.stories.tsx
v src
	button.stories.tsx
v tests
	button.stories.tsx
```

##### Disable Vitest global API

We recommend to set `globals` to `false` (which is the default).
Setting `globals` to `true` actually works ok during test.
But they don't exist in the story files:

```tsx
// some.stories.tsx
export const Story = {
	async play() {
		// does not work
		expect(true).toBeTruthy()
	}
}
```

This is obvious because the story files are executed on the browser.
In fact, you need to import the functions from `@storybook/test` instead:

```ts
// some.test.ts
import { expect } from 'vitest'

// some.stories.ts
import { expect } from '@storybook/test'
```

Setting `globals: true` (and adding `types: ["vitest/globals"]` in your `tsconfig.json`)
causes inconsistency and confuses both the editor and you.

#### Edit Vitest Setup

After you set up [Storybook Test Addon][storybook-test-addon],
you should have a `.storybook/vitest.setup.ts` like this (using React as an example):

```ts
// .storybook/vitest.setup.ts
import { setProjectAnnotations } from '@storybook/react'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview.ts'

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([projectAnnotations])

beforeAll(project.beforeAll)
```

Edit it to add the following:

```ts
import * as visAnnotations from 'storybook-addon-vis/preview'
import { vis } from 'storybook-addon-vis/vitest-setup'

const project = setProjectAnnotations([
	visAnnotations, // add this
	projectAnnotations
])

// setup visual testing but no post-test image snapshot
vis.presets.manual()

// capture image snapshot at the end of each test and story with `snapshot` tag
vis.presets.auto()

// capture image snapshot at the end of each test and story with `snapshot` tag
// for multiple themes (light and dark in this example)
vis.presets.theme({
	async light() { document.body.classList.remove('dark') },
	async dark() { document.body.classList.add('dark') },
})
```

### Storybook Configuration

For [Storybook], all you need is to add the `storybook-addon-vis` to your `.storybook/main.js`:

```ts
// .storybook/main.ts
// ...

const config: StorybookConfig = {
	// ...
	addons: [
		'@storybook/addon-essentials',
		// ...
		'@storybook/experimental-addon-test',
		'storybook-addon-vis'
	]
}
```

Note that you may need to do `getAbsolutePath()`:

```ts
// .storybook/main.ts
// ...

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
	return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
	addons: [
		getAbsolutePath('@storybook/addon-essentials'),
		// ...
		getAbsolutePath('@storybook/experimental-addon-test'),
		getAbsolutePath('storybook-addon-vis')
	]
}
```

### TypeScript Configuration

The main usage of this addon is to use the `toMatchImageSnapshot` matcher.

Since it is exposed under the `expect` object of `vitest` or `@storybook/test`,
you typically do not need to import `storybook-addon-vis` directly.

Because of this, TypeScript may not recognize the matcher.
To address this, you can add the following to your `tsconfig.json`:

```json
{
	"compilerOptions": {
		"types": ["storybook-addon-vis/matcher"]
	}
}
```

## Usage - automatic snapshot

With the `auto` preset, [`storybook-addon-vis`][storybook-addon-vis] automatically captures image snapshot for stories with `snapshot` tag.

As how tags work in [Storybook], you can add the tag globally, per story file, or per story.

```tsx
// .storybook/preview.tsx
export default {
	// Enable image snapshot for all stories
	tags: ['snapshot']
}

// some.stories.tsx
export default {
	title: 'Button',
	// Take image snapshot automatically for all stories in this file
	tags: ['snapshot']
}

export const MyStory = {
	// Take image snapshot automatically for this story
	tags: ['snapshot'],
	// ...
}
```

You can disable snapshot with the `!snapshot` tag, much like `!test`.

```tsx
export default {
	title: 'Button',
	// Enable image snapshot for all stories in this file
	tags: ['snapshot']
}

export const MyStory = {
	// Disable image snapshot for this story
	tags: ['!snapshot'],
	// ...
}
```

Note that since they are captured during test,
if you set `tags: ['!test']` to disable testing,
no snapshot will be taken either.

You can also provide additional tags, which you will receive when you use the theme preset:

```tsx
export const MyStory = {
	tags: ['snapshot', '!light'],
	// ...
}

// in vitest.setup.ts
vis.presets.theme({
	light(options) {
		if (options.tags.includes('!light')) return false
		document.body.classList.remove('dark')
	}
})
```

You can provide options to the `toMatchImageSnapshot` matcher using Storybook parameters.
`defineAutoSnapshotParam()` is a helper function to provide autocompletion:

```tsx
import { defineAutoSnapshotParam } from 'storybook-addon-vis'

export const MyStory = {
	parameters: defineAutoSnapshotParam({
		failureThreshold: 70,
	})
	// ...
}
```

## Usage - manual snapshot

Besides automatic snapshot, you can capture image snapshot manually.

```tsx
import { expect } from '@storybook/test'

// `page` and the like are proxies of `@vitest/browser/context` to work within storybook
import { page } from 'storybook-addon-vis'

export const PageSnapshot = {
	// typically you want to disable automatic snapshot when using manual snapshot
	// but you can use both at the same time.
	tags: ['!snapshot'],
	async play({ canvasElement }) {
		await expect(canvasElement).toMatchImageSnapshot(/* options */)
	}
}

export const ElementSnapshot = {
	// typically you want to disable automatic snapshot when using manual snapshot
	// but you can use both at the same time.
	tags: ['!snapshot'],
	async play({ canvas }) {
		const element = await canvas.getByTestid('subject')
		await expect(element).toMatchImageSnapshot(/* options */)
	}
}
```

## Usage - has image snapshot

While less common, you can also check if a snapshot exists:

```tsx
import { hasImageSnapshot } from 'storybook-addon-vis'

export const HasImageSnapshot = {
	tags: ['!snapshot'],
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot(/* options */) })],
	render(_, { loaded: { hasImageSnapshot } }) {
		return <div data-testid="subject">Has snapshot: {String(hasImageSnapshot)}</div>
	},
	async play({ canvas, loaded: { hasImageSnapshot } }) {
		const subject = canvas.getByTestId('subject')
		if (!hasImageSnapshot) {
			await expect(subject).toMatchImageSnapshot()
			return
		}

		// This will only execute in Vitest
		await expect(subject)
			.toMatchImageSnapshot()
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) => {
					expect(error.message).toMatch(/Expected image to match but was differ by \d+ pixels./)
				},
			)
	},
}
```

This is useful when you are performing some negative test.

### Ignore snapshot folders

Some snapshot folders should be ignored by git.

With the default snapshot folder structure, you should add the following to your `.gitignore`:

```ini
# .gitignore
**/__vis__/__diffs__
**/__vis__/__results__
**/__vis__/local
```

## Troubleshooting

> Internal server error: Failed to resolve import "pathe"

This is likely [a compatibility issue with `pnpm` and `vite` in monorepo](https://discord.com/channels/917386801235247114/1305110710229008435/1305325581839368202).

To work around this, you can add [`shamefully-hoist`](https://pnpm.io/npmrc#shamefully-hoist) to your `.npmrc`:

```sh
# .npmrc

shamefully-hoist=true
```

or hoist the `pathe` package:

```sh
# .npmrc

hoist-pattern[] = pathe
```

[@storybook/experimental-addon-test]: https://www.npmjs.com/package/@storybook/experimental-addon-test
[downloads_image]: https://img.shields.io/npm/dm/storybook-addon-vis.svg?style=flat
[github_action_url]: https://github.com/repobuddy/storybook-addon-vis/actions
[github_release]: https://github.com/repobuddy/storybook-addon-vis/workflows/release/badge.svg
[jest-image-snapshot]: https://github.com/americanexpress/jest-image-snapshot
[npm_image]: https://img.shields.io/npm/v/storybook-addon-vis.svg?style=flat
[npm_url]: https://npmjs.org/package/storybook-addon-vis
[portable-stories]: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest
[stories]: https://storybook.js.org/docs/writing-stories
[storybook-addon-vis]: https://github.com/repobuddy/storybook-addon-vis
[storybook-test-addon]: https://storybook.js.org/docs/writing-tests/test-addon
[storybook-test-addon#example-config]: https://storybook.js.org/docs/writing-tests/test-addon#example-configuration-files
[storybook]: https://storybook.js.org
[vitest-browser-mode]: https://vitest.dev/guide/browser/
[vitest-plugin-vis]: https://www.npmjs.com/package/vitest-plugin-vis
[vitest]: https://vitest.dev/
