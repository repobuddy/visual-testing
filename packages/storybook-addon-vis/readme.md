# Storybook Vitest Visual Testing addon

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

[![Release][github_release]][github_action_url]

[`storybook-addon-vis`][storybook-addon-vis] captures and compares image snapshot automatically and manually.

This addon is inspired by [`jest-image-snapshot`][jest-image-snapshot].
Internally, it uses [`vitest-plugin-vis`][vitest-plugin-vis] to do the heavy lifting.

Starting from [Storybook] 8.3,
Storybook introduces [Storybook Test addon][storybook-test-addon].

It allows you to test your components directly inside Storybook.
It does this by using a [Vitest plugin][@storybook/experimental-addon-test] to transform your [stories] into [Vitest] tests using [portable stories][portable-stories].

These stories are then run by [Vitest] in the browser using [Vitest Browser Mode][vitest-browser-mode].

Since it is running in an actual browser,
[`jest-image-snapshot`][jest-image-snapshot] does not work as it depends on NodeJS.
This add-on provides similar functionality to [`jest-image-snapshot`][jest-image-snapshot].

In addition, you can capture image snapshot manually,
and controls how the auto image snapshot(s) are taken.

## Install

```sh
npm install --save-dev storybook-addon-vis

pnpm add --save-dev storybook-addon-vis

yarn add --save-dev storybook-addon-vis
```

This addon requires the [Storybook Vitest addon][storybook-vitest-addon] (`@storybook/addon-vitest`).

## Minimal configuration

Add `storybookVis()` to the Vitest plugins, and `defineStorybookVis()` to the Storybook addons.

```ts
// vitest.config.ts
import { join } from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [storybookTest({ configDir: join(import.meta.dirname, '.storybook') }), storybookVis()],
	test: {
		browser: {
			enabled: true,
			headless: true,
			api: { allowWrite: true },
			provider: playwright(),
			instances: [{ browser: 'chromium', viewport: { width: 1280, height: 720 } }],
		},
		setupFiles: ['./.storybook/vitest.setup.ts'],
	},
})
```

```ts
// .storybook/vitest.setup.ts
import { setProjectAnnotations } from '@storybook/react-vite'
import { vis, visAnnotations } from 'storybook-addon-vis/vitest-setup'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview.tsx'

const annotations = setProjectAnnotations([visAnnotations, projectAnnotations])

beforeAll(annotations.beforeAll)

vis.setup()
```

```ts
// .storybook/main.ts
import { defineStorybookVis } from 'storybook-addon-vis/node'

export default {
	// ...
	addons: ['@storybook/addon-vitest', defineStorybookVis()],
}
```

Add `tags: ['snapshot']` to your preview (or to a single story) to take an automatic snapshot of each story.
Ignore the snapshot folders in `.gitignore` and add the `storybook-addon-vis/matcher` type to your `tsconfig.json`.
The [setup guide][docs_setup] covers these, CSF Next, and the details.

The files above are adapted from the `sb-csf-3` test case (`testcases/sb-csf-3` in the repository, `@storybook/react-vite` framework), with its a11y and docs addons left out.

## Example

A manual snapshot in a `play` function:

```tsx
// button.stories.tsx
import type { StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

export default {
	render: () => <div data-testid="subject">unit</div>,
}

export const MatchingElement: StoryObj = {
	async play({ canvas }) {
		const element = canvas.getByTestId('subject')
		await expect(element).toMatchImageSnapshot()
	},
}
```

This is the `MatchingElement` story of `src/client/expect/to_match_image_snapshot.stories.tsx`, whose matching spec (`to_match_image_snapshot.spec.tsx`) runs it with `composeStories`.

## Version compatibility

| `storybook-addon-vis` | Storybook | Vitest | Source |
| --------------------- | --------- | ------ | ------ |
| 4.x | `^10.1.10` (also `@storybook/addon-vitest` `^10.1.10`) | `^4` (also `@vitest/browser` `^4`) | `peerDependencies` in `package.json` |
| 3.x | 10 | not derivable (3.0.0 depends on `vitest-plugin-vis` 4.0.0, which updated to Vitest 4) | `CHANGELOG.md` 3.0.0 |
| 2.x | 9 | not derivable | `CHANGELOG.md` 2.0.0 ("Supports Storybook 9.0.0") |
| 1.x | 8 | not derivable | previous version of this readme ("For Storybook 8, please use 1.x"), not stated in `CHANGELOG.md` |

The minimum Storybook patch version of 1.x to 3.x is not derivable.

With **Storybook 10.3+**, `@storybook/addon-vitest` often applies project annotations for you.
If you are not on CSF Next, you may need to move `visAnnotations` from `setProjectAnnotations([...])` in `vitest.setup.ts` to `.storybook/preview.ts`.
See [Storybook 10.3+ and Vitest project annotations][docs_setup_10_3].

## Documentation

Full documentation is on the [documentation website][docs]:

- [Install][docs_install]
- [Setup][docs_setup]
- [Automatic snapshots][docs_auto]
- [Manual snapshots][docs_manual]
- [Troubleshooting][docs_troubleshooting]
- [Reference: `defineStorybookVis()`][docs_define]
- [Reference: `defineStorybookVisOptions()`][docs_define_options]
- [Migrating to 3.0][docs_migrate_3] and [Migrating to 1.0][docs_migrate_1]
- [Reviewing failures with agents][docs_agents]

For AI agents, [`llms.txt`](llms.txt) in this package lists the entry points and documentation pages.
The site-wide copy is at <https://repobuddy.github.io/visual-testing/llms.txt>.

[@storybook/experimental-addon-test]: https://www.npmjs.com/package/@storybook/experimental-addon-test
[docs]: https://repobuddy.github.io/visual-testing/
[docs_agents]: https://repobuddy.github.io/visual-testing/guides/reviewing-failures-with-agents/
[docs_auto]: https://repobuddy.github.io/visual-testing/addon/automatic-snapshots/
[docs_define]: https://repobuddy.github.io/visual-testing/reference/addon/define-storybook-vis/
[docs_define_options]: https://repobuddy.github.io/visual-testing/reference/addon/define-storybook-vis-options/
[docs_install]: https://repobuddy.github.io/visual-testing/addon/install/
[docs_manual]: https://repobuddy.github.io/visual-testing/addon/manual-snapshots/
[docs_migrate_1]: https://repobuddy.github.io/visual-testing/releases/migrate-to-1/
[docs_migrate_3]: https://repobuddy.github.io/visual-testing/releases/migrate-to-3/
[docs_setup]: https://repobuddy.github.io/visual-testing/addon/setup/
[docs_setup_10_3]: https://repobuddy.github.io/visual-testing/addon/setup/#storybook-103-and-vitest-project-annotations
[docs_troubleshooting]: https://repobuddy.github.io/visual-testing/addon/troubleshooting/
[downloads_image]: https://img.shields.io/npm/dm/storybook-addon-vis.svg?style=flat
[github_action_url]: https://github.com/repobuddy/visual-testing/actions/workflows/release.yml
[github_release]: https://github.com/repobuddy/visual-testing/actions/workflows/release.yml/badge.svg
[jest-image-snapshot]: https://github.com/americanexpress/jest-image-snapshot
[npm_image]: https://img.shields.io/npm/v/storybook-addon-vis.svg?style=flat
[npm_url]: https://npmjs.org/package/storybook-addon-vis
[portable-stories]: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest
[stories]: https://storybook.js.org/docs/writing-stories
[storybook-addon-vis]: https://github.com/repobuddy/visual-testing/tree/main/packages/storybook-addon-vis
[storybook-test-addon]: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
[storybook-vitest-addon]: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
[storybook]: https://storybook.js.org
[vitest-browser-mode]: https://vitest.dev/guide/browser/
[vitest-plugin-vis]: https://www.npmjs.com/package/vitest-plugin-vis
