# storybook-addon-vis

Storybook Vitest Image Snapshot add-on.

Captures and compare image snapshot automatically and manually.

This add-on is inspired by [jest-image-snapshot].

Starting from [storybook] 8.3,
you can run Storybook stories with [vitest] browser mode.

Since it is running in actual browser, [jest-image-snapshot] does not work.
This add-on provides similar functionality to [jest-image-snapshot].
In addition, you can capture image snapshot manually.

## Install

```sh
npm install --save-dev storybook-addon-vis

pnpm add --save-dev storybook-addon-vis

yarn add --save-dev storybook-addon-vis
```

## Config

This add-on provides features on both [storybook] and [vitest],
thus you need to add it to both [storybook] and [vitest].

On [vitest], you need to add `storybook-addon-vis/vitest-plugin` plugin in `vitest.config.ts`.

```ts
// vite.config.ts or vitest.config.ts
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	 plugins: [
		storybookTest(),
		storybookVis()
	],
	test: {
		browser: {
			// ...
		}
		setupFiles: ['./vitest.setup.ts'],
	}
})
```

Also note that you need to add `vitest.setup.ts` file to set up the test environment.
You need to do that anyway when you set up [storybook] with [vitest].

In `vitest.setup.ts`, you can use one of the presets to do the setup for you.
You can also use the provided hooks to set up the test environment manually.

```ts
// vitest.setup.ts
import { setProjectAnnotations } from '@storybook/react'
import { createVisConfig } from 'storybook-addon-vis/vitest-setup'
import * as projectAnnotations from './preview'

const project = setProjectAnnotations([projectAnnotations])

// other presets are available
createVisConfig(/* options */).presets.basic()
```

On [storybook], you need to register `beforeEach` hook to set up the test environment.

```ts
// .storybook/preview.tsx
import { storybookPreviewVis } from 'storybook-addon-vis'

const preview: Preview = {
	// ...
	beforeEach: storybookPreviewVis.beforeEach,
}

export default preview
```

## Usage - automatic snapshot

With the `basic` preset, [storybook-addon-vis] automatically captures image snapshot for stories with `snapshot` tag.

As with how tags work in [storybook], you can add the tag globally, per story file, or per story.

```ts
// .storybook/preview.tsx
export default {
	// Enable image snapshot for all stories
	tags: ['snapshot']
}

// story.tsx
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

You can disable snapshot capturing with the `!snapshot` tag,
much like `!test`.

```ts
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

You can provide options `toMatchImageSnapshot` matcher using parameters.

```ts
import { defineSnapshotParam } from 'storybook-addon-vis'

export const MyStory = {
	// Take image snapshot automatically for this story
	parameters: defineSnapshotParam({
		failureThreshold: 70,
	})
	// ...
}
```

## Usage - manual snapshot

Besides automatic snapshot, you can capture image snapshot manually.

```ts
import { expect } from '@storybook/test'

// `page` and the like are proxy to `@vitest/browser/context` to work in storybook
import { page } from 'storybook-addon-vis'

export const PageSnapshot = {
	// typically you want to disable automatic snapshot when using manual snapshot
	tags: ['!snapshot'],
	// ...
	async play() {
		await expect(page.imageSnapshot()).toMatchImageSnapshot()
	}
}

export const ElementSnapshot = {
		// typically you want to disable automatic snapshot when using manual snapshot
	tags: ['!snapshot'],
	// ...
	async play({ canvas }) {
		const element = await canvas.getByTestid('subject')
		await expect(page.imageSnapshot({ element })).toMatchImageSnapshot()
	}
}
```

[jest-image-snapshot]: https://github.com/americanexpress/jest-image-snapshot
[storybook-addon-vis]: https://github.com/repobuddy/storybook-addon-vis
[storybook]: https://storybook.js.org
[vitest]: https://vitest.dev/
