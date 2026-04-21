import{n as e}from"./chunk-BneVvdWh.js";import{c as t,s as n}from"./blocks-pk6s6g-r.js";import{a as r}from"./chunk-RD3KTAHR-C3fY6nk_.js";import{r as i}from"./react-D3_z09Pp.js";import{t as a}from"./mdx-react-shim-DMzzWKkY.js";function o(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...i(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{title:`Overview`}),`
`,(0,c.jsx)(t.h1,{id:`storybook-visual-testing-addon`,children:`Storybook Visual Testing addon`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.a,{href:`https://www.npmjs.com/package/storybook-addon-vis`,rel:`nofollow`,children:`storybook-addon-vis`}),` allows you to perform self contained Visual Testing for `,(0,c.jsx)(t.a,{href:`https://storybook.js.org`,rel:`nofollow`,children:`Storybook`}),`.`]}),`
`,(0,c.jsx)(t.p,{children:`The image snapshots are stored locally and are used to detect visual regressions.`}),`
`,(0,c.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`You can capture and compare image snapshot both automatically and manually.`}),`
`,(0,c.jsx)(t.li,{children:`You can take a snapshot of the whole page or a specific component.`}),`
`,(0,c.jsx)(t.li,{children:`You can take snapshots in different environments, platform, browser, screen size and themes.`}),`
`,(0,c.jsx)(t.li,{children:`You can enable, disable, and customize how the snapshots are taken and compared.`}),`
`,(0,c.jsx)(t.li,{children:`The snapshots are stored locally.`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,c.jsxs)(t.p,{children:[`You can install `,(0,c.jsx)(t.a,{href:`https://www.npmjs.com/package/storybook-addon-vis`,rel:`nofollow`,children:`storybook-addon-vis`}),` with your package manager of choice:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-sh`,children:`npm install --save-dev storybook-addon-vis

pnpm add --save-dev storybook-addon-vis

yarn add --save-dev storybook-addon-vis
`})}),`
`,(0,c.jsxs)(t.p,{children:[`This addon requires `,(0,c.jsx)(t.a,{href:`https://storybook.js.org/docs/writing-tests/integrations/vitest-addon`,rel:`nofollow`,children:`Storybook Vitest addon`}),` to work.
Please refer to its documentation for installation and setup instructions.`]}),`
`,(0,c.jsx)(t.h2,{id:`setup`,children:`Setup`}),`
`,(0,c.jsxs)(t.p,{children:[`To setup `,(0,c.jsx)(t.a,{href:`https://www.npmjs.com/package/storybook-addon-vis`,rel:`nofollow`,children:`storybook-addon-vis`}),`, you need to do the following:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Add the `,(0,c.jsx)(t.code,{children:`storybookVis`}),` plugin in `,(0,c.jsx)(t.a,{href:`https://vitest.dev/`,rel:`nofollow`,children:`Vitest`}),` along with the `,(0,c.jsx)(t.code,{children:`storybookTest`}),` plugin.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Configure visual testing in `,(0,c.jsx)(t.code,{children:`vitest.setup.ts`}),` and/or `,(0,c.jsx)(t.code,{children:`.storybook/preview.ts`}),` (see `,(0,c.jsx)(t.a,{href:`#storybook-103-and-vitest-project-annotations`,children:`Storybook 10.3+ and Vitest project annotations`}),`; with CSF Next, prefer preview-only setup as in `,(0,c.jsx)(t.a,{href:`#basic-setup-for-csf-next`,children:`Basic Setup for CSF Next`}),`).`]}),`
`,(0,c.jsxs)(t.li,{children:[`Add `,(0,c.jsx)(t.a,{href:`https://www.npmjs.com/package/storybook-addon-vis`,rel:`nofollow`,children:`storybook-addon-vis`}),` addon to your `,(0,c.jsx)(t.a,{href:`https://storybook.js.org`,rel:`nofollow`,children:`Storybook`}),` configuration in `,(0,c.jsx)(t.code,{children:`.storybook/main.ts`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Ignore snapshot folders in your `,(0,c.jsx)(t.code,{children:`.gitignore`}),` file.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Also, if you are using TypeScript, you need to add the `,(0,c.jsx)(t.code,{children:`storybook-addon-vis/matcher`}),` type to your `,(0,c.jsx)(t.code,{children:`tsconfig.json`}),`.`]}),`
`,(0,c.jsx)(t.h3,{id:`basic-setup`,children:`Basic Setup`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.a,{href:`https://www.npmjs.com/package/storybook-addon-vis`,rel:`nofollow`,children:`storybook-addon-vis`}),` provides sensible default setup for both `,(0,c.jsx)(t.a,{href:`https://storybook.js.org`,rel:`nofollow`,children:`Storybook`}),` and `,(0,c.jsx)(t.a,{href:`https://vitest.dev/`,rel:`nofollow`,children:`Vitest`}),`.
So setting it up is pretty straightforward.`]}),`
`,(0,c.jsx)(t.p,{children:`The basic setup will:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Use `,(0,c.jsx)(t.code,{children:`pixelmatch`}),` as the diffing algorithm.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Set config to compare image snapshot with a failure threshold of `,(0,c.jsx)(t.code,{children:`0 pixels`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Timeout for image comparison is set to `,(0,c.jsx)(t.code,{children:`30000 ms`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Local (non-CI) image snapshots are saved in the `,(0,c.jsx)(t.code,{children:`<root>/__vis__/local`}),` directory.`]}),`
`,(0,c.jsxs)(t.li,{children:[`CI image snapshots are saved in the `,(0,c.jsx)(t.code,{children:`<root>/__vis__/<process.platform>`}),` directory.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Baseline images are saved in the `,(0,c.jsx)(t.code,{children:`<root>/__vis__/*/__baselines__`}),` directory.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Image snapshots of the current test run are saved in the `,(0,c.jsx)(t.code,{children:`<root>/__vis__/*/__results__`}),` directory.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Diff images are saved in the `,(0,c.jsx)(t.code,{children:`<root>/__vis__/*/__diffs__`}),` directory.`]}),`
`,(0,c.jsxs)(t.li,{children:[`You can review the baseline and diff images in addon `,(0,c.jsx)(t.code,{children:`Vis`}),` panel.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`This setup assumes that you are writing your stories in CSF 3.
If you are writing your stories in CSF Next, check out `,(0,c.jsx)(t.a,{href:`#basic-setup-for-csf-next`,children:`Basic Setup for CSF Next`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[`For `,(0,c.jsx)(t.a,{href:`https://vitest.dev/`,rel:`nofollow`,children:`Vitest`}),`, you need to do two things:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Add the `,(0,c.jsx)(t.code,{children:`storybookVis`}),` plugin in `,(0,c.jsx)(t.code,{children:`vitest.config.ts`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Enable visual testing in `,(0,c.jsx)(t.code,{children:`vitest.setup.ts`}),`.`]}),`
`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// vitest.config.ts
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		storybookTest(),
		storybookVis() // ADD THIS
	],
	test: {
		browser: { ... }, // your Vitest Browser Mode configuration
		setupFiles: ['./vitest.setup.ts'], // ADD THIS
	}
})
`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// vitest.setup.ts
import { vis, visAnnotations } from 'storybook-addon-vis/vitest-setup'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview.ts'

const annotations = setProjectAnnotations([
	projectAnnotations,
	visAnnotations
])

beforeAll(annotations.beforeAll)

// ADD THIS to enable visual testing
vis.setup()
`})}),`
`,(0,c.jsx)(`a`,{id:`storybook-103-and-vitest-project-annotations`}),`
`,(0,c.jsx)(t.h3,{id:`storybook-103-and-vitest-project-annotations`,children:`Storybook 10.3+ and Vitest project annotations`}),`
`,(0,c.jsxs)(t.p,{children:[`From `,(0,c.jsx)(t.strong,{children:`Storybook 10.3`}),` onward, `,(0,c.jsx)(t.a,{href:`https://storybook.js.org/docs/writing-tests/integrations/vitest-addon`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`@storybook/addon-vitest`})}),` often injects project annotations for you (for example via `,(0,c.jsx)(t.code,{children:`setProjectAnnotations(getProjectAnnotations())`}),`), so you may not need a hand-maintained `,(0,c.jsx)(t.code,{children:`vitest.setup.ts`}),` in every project. See the `,(0,c.jsx)(t.a,{href:`https://storybook.js.org/docs/writing-tests/integrations/vitest-addon`,rel:`nofollow`,children:`Storybook Vitest integration docs`}),` for the current recommendation.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`If you are not using CSF Next`}),` (or have not moved your preview config to `,(0,c.jsx)(t.code,{children:`definePreview`}),`), you may still need to adjust your setup: `,(0,c.jsx)(t.strong,{children:`do not`}),` rely only on merging `,(0,c.jsx)(t.code,{children:`visAnnotations`}),` inside `,(0,c.jsx)(t.code,{children:`setProjectAnnotations([...])`}),` in `,(0,c.jsx)(t.code,{children:`vitest.setup.ts`}),`. Put the same lifecycle hooks in `,(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.code,{children:`.storybook/preview.ts`})}),` instead, so `,(0,c.jsx)(t.code,{children:`getProjectAnnotations()`}),` includes them when the Vitest addon builds annotations from your preview stack.`]}),`
`,(0,c.jsx)(t.p,{children:`You can do that in either of these ways:`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Recommended:`}),` use `,(0,c.jsx)(t.code,{children:`definePreview({ addons: [addonVis({ auto: true })] })`}),` in `,(0,c.jsx)(t.code,{children:`preview.ts`}),` even while your stories stay CSF 3—the pattern is the same as in `,(0,c.jsx)(t.a,{href:`#basic-setup-for-csf-next`,children:`Basic Setup for CSF Next`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Minimal migration:`}),` import `,(0,c.jsx)(t.code,{children:`visAnnotations`}),` from `,(0,c.jsx)(t.code,{children:`storybook-addon-vis/vitest-setup`}),` and spread them into a classic preview export, for example `,(0,c.jsx)(t.code,{children:`export default { ...visAnnotations, tags: ['snapshot'] }`}),`, if you are not ready for `,(0,c.jsx)(t.code,{children:`definePreview`}),`.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`You may still need `,(0,c.jsx)(t.code,{children:`vis.setup()`}),` and the `,(0,c.jsx)(t.code,{children:`storybookVis()`}),` Vitest plugin depending on your project; this note is only about `,(0,c.jsx)(t.strong,{children:`where`}),` `,(0,c.jsx)(t.code,{children:`visAnnotations`}),` is merged (preview vs Vitest setup).`]}),`
`,(0,c.jsxs)(t.p,{children:[`For `,(0,c.jsx)(t.a,{href:`https://storybook.js.org`,rel:`nofollow`,children:`Storybook`}),`, you need to add the addon to your `,(0,c.jsx)(t.code,{children:`.storybook/main.ts`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// .storybook/main.ts

const config: StorybookConfig = {
	addons: [
		'storybook-addon-vis' // ADD THIS
	]
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[`In monorepo, you need to use the `,(0,c.jsx)(t.code,{children:`getAbsolutePath`}),` helper function to resolve the absolute path of the addon.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// .storybook/main.ts
import { defineStorybookVis } from '#storybook-addon-vis/node'
import type { StorybookConfig } from '@storybook/<your-framework>'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(\`\${value}/package.json\`)))
}

const config: StorybookConfig = {
	addons: [
		getAbsolutePath('storybook-addon-vis') // ADD THIS
	]
}

export default config
`})}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`getAbsolutePath`}),` function is a helper function typically added by `,(0,c.jsx)(t.a,{href:`https://storybook.js.org`,rel:`nofollow`,children:`Storybook`}),` automatically.`]}),`
`,(0,c.jsxs)(t.p,{children:[`In `,(0,c.jsx)(t.code,{children:`.storybook/preview.ts`}),`, you can enable automatic snapshot by adding the `,(0,c.jsx)(t.code,{children:`addonVis`}),` addon and setting `,(0,c.jsx)(t.code,{children:`auto`}),` to `,(0,c.jsx)(t.code,{children:`true`}),`.
This will enable automatic snapshot taking at the end of each test.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// .storybook/preview.ts
export default {
	tags: ['snapshot'],
}
`})}),`
`,(0,c.jsx)(t.h3,{id:`ignore-snapshot-folders`,children:`Ignore snapshot folders`}),`
`,(0,c.jsxs)(t.p,{children:[`Since `,(0,c.jsx)(t.a,{href:`https://www.npmjs.com/package/storybook-addon-vis`,rel:`nofollow`,children:`storybook-addon-vis`}),` will save snapshot on your file system,
you need to tell your version control system to ignore the snapshot directory.`]}),`
`,(0,c.jsxs)(t.p,{children:[`With the basic setup, add this to your `,(0,c.jsx)(t.code,{children:`.gitignore`}),` (or your version control system's ignore file):`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ini`,children:`# .gitignore
**/__vis__/**/__diffs__
**/__vis__/**/__results__
**/__vis__/local
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Note that the `,(0,c.jsx)(t.code,{children:`__vis__/*/__baselines__`}),` should not be ignored,
as it is used to store the baseline images.
They should be committed to your repository.`]}),`
`,(0,c.jsxs)(t.h3,{id:`first-run-baselines-createmissingbaseline-vs-updatesnapshot`,children:[`First-run baselines (`,(0,c.jsx)(t.code,{children:`createMissingBaseline`}),` vs `,(0,c.jsx)(t.code,{children:`updateSnapshot`}),`)`]}),`
`,(0,c.jsxs)(t.p,{children:[`In `,(0,c.jsx)(t.strong,{children:`vitest-plugin-vis`}),` (and when using the same client APIs outside Storybook’s Vitest bridge), `,(0,c.jsx)(t.code,{children:`createMissingBaseline: true`}),` on `,(0,c.jsx)(t.code,{children:`toMatchImageSnapshot`}),` / `,(0,c.jsx)(t.code,{children:`page.toMatchImageSnapshot`}),`, or `,(0,c.jsx)(t.code,{children:`vis.setup({ createMissingBaseline: true, ... })`}),`, can create a missing baseline without passing `,(0,c.jsx)(t.code,{children:`-u`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[`When running `,(0,c.jsx)(t.strong,{children:`Storybook + Vitest browser mode`}),` through this addon, matcher options are serialized over RPC; custom fields such as `,(0,c.jsx)(t.code,{children:`createMissingBaseline`}),` may not reach the server. In that setup, use Vitest’s snapshot update mode instead (for example temporarily set `,(0,c.jsx)(t.code,{children:`server.config.snapshotOptions.updateSnapshot = 'all'`}),` around the first run, or run with `,(0,c.jsx)(t.code,{children:`-u`}),`) to write new baselines—the same mechanism as a normal snapshot update.`]}),`
`,(0,c.jsx)(t.h3,{id:`typescript-configuration`,children:`TypeScript Configuration`}),`
`,(0,c.jsx)(t.p,{children:`If you want to do manual snapshot testing, you need to tell TypeScript about the matcher.`}),`
`,(0,c.jsxs)(t.p,{children:[`You can add the following to your `,(0,c.jsx)(t.code,{children:`tsconfig.json`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-json`,children:`{
	"compilerOptions": {
		"types": ["storybook-addon-vis/matcher"]
	}
}
`})}),`
`,(0,c.jsx)(t.p,{children:`Or use the triple-slash reference:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-json`,children:`{
	"includes": [..., "types"]
}

`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// types/storybook-addon-vis.d.ts
/// <reference types="storybook-addon-vis/matcher" />
`})}),`
`,(0,c.jsx)(t.h3,{id:`disable-vitest-global-api`,children:`Disable Vitest global API`}),`
`,(0,c.jsxs)(t.p,{children:[`We recommend to set `,(0,c.jsx)(t.code,{children:`globals`}),` to `,(0,c.jsx)(t.code,{children:`false`}),` (which is the default).
Setting `,(0,c.jsx)(t.code,{children:`globals`}),` to `,(0,c.jsx)(t.code,{children:`true`}),` actually works ok during test.
But they don't exist in the story files:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// some.stories.tsx
export const Story = {
	async play() {
		// does not work
		expect(true).toBeTruthy()
	}
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[`This is obvious because the story files are executed on the browser.
In fact, you need to import the functions from `,(0,c.jsx)(t.code,{children:`@storybook/test`}),` instead:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// some.test.ts
import { expect } from 'vitest'

// some.stories.ts
import { expect } from '@storybook/test'
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Setting `,(0,c.jsx)(t.code,{children:`globals: true`}),` (and adding `,(0,c.jsx)(t.code,{children:`types: ["vitest/globals"]`}),` in your `,(0,c.jsx)(t.code,{children:`tsconfig.json`}),`)
causes inconsistency and confuses both the editor and you.`]}),`
`,(0,c.jsx)(t.h3,{id:`basic-setup-for-csf-next`,children:`Basic Setup for CSF Next`}),`
`,(0,c.jsxs)(t.p,{children:[`If you are writing your stories in CSF Next,
You don't need to setup the visual testing in `,(0,c.jsx)(t.code,{children:`vitest.setup.ts`}),`.
Instead, you should setup the visual testing in `,(0,c.jsx)(t.code,{children:`.storybook/preview.ts`}),`.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// vitest.config.ts
// vitest.config.ts
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		storybookTest(),
		storybookVis() // ADD THIS
	],
	test: {
		browser: { ... }, // your Vitest Browser Mode configuration
		// setupFiles: ['./vitest.setup.ts'], // REMOVE THIS
	}
})

// .storybook/preview.ts
import addonVis from 'storybook-addon-vis'
import { definePreview } from '@storybook/your-framework/node'

export default definePreview({
	addons: [
		// Enable automatic snapshot taking at the end of each test
		addonVis({ auto: true })
	]
})
`})}),`
`,(0,c.jsx)(t.h3,{id:`advanced-setup`,children:`Advanced Setup`}),`
`,(0,c.jsx)(t.p,{children:`If you need more control over the visual testing, you can customize the addon configuration.`}),`
`,(0,c.jsxs)(t.p,{children:[`In `,(0,c.jsx)(t.code,{children:`vitest.config.ts`}),`, you can customize where the snapshots are saved and how they are compared.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// vitest.config.ts
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		storybookVis({
			snapshotRootDir: ({
				ci, // true if running on CI
				platform, // process.platform
				providerName, // 'playwright' or 'webdriverio'
				browserName,
				screenshotFailures, // from \`browser\` config
				screenshotDirectory, // from \`browser\` config
			}) => \`__vis__/\${ci ? platform : 'local'}\`,
			snapshotSubpath: ({ subpath }) => trimCommonFolder(subpath),
			// Alphanumeric characters, and underscore are allowed. Dash is not allowed.
			snapshotKey: 'auto',
			// set a default subject selector (e.g. \`[data-testid="subject"]\`) to capture image snapshot
			subject: undefined,
			comparisonMethod: 'pixel', // or 'ssim'
			// pixelmatch or ssim.js options, depending on \`comparisonMethod\`.
			diffOptions: undefined,
			timeout: 30000,
			failureThresholdType: 'pixel',
			failureThreshold: 0,
		})
	]
})
`})}),`
`,(0,c.jsxs)(t.p,{children:[`The options are the same as the options in [`,(0,c.jsx)(t.code,{children:`vitest-plugin-vis`}),`][vitest-plugin-vis] minus the `,(0,c.jsx)(t.code,{children:`preset`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[`For more details, please refer to the `,(0,c.jsx)(t.a,{href:`https://github.com/repobuddy/visual-testing/tree/main/packages/vitest-plugin-vis`,rel:`nofollow`,children:`vitest-plugin-vis documentation`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[`In `,(0,c.jsx)(t.code,{children:`vitest.setup.ts`}),`, you can customize how the automatic snapshots are taken.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// vitest.setup.ts
import { vis } from 'storybook-addon-vis/setup'

vis.setup({
	// With automatic snapshot taking at the end of each test
	auto: true,

	// Control when automatic snapshot taking occurs
	auto: async ({ tags }) => tags.includes('presentation'),


	// Capture image snapshot at the end of each test for multiple themes (light and dark in this example).
	//
	// Note that this changes the theme in the \`afterEach\` hook.
	// If you want to capture manual snapshots in different themes,
	// configure Vitest to run the tests in different themes.
	auto: {
		async dark() { document.body.classList.add('dark') },
		async light() { document.body.classList.remove('dark') },
	}
})
`})}),`
`,(0,c.jsx)(t.h4,{id:`multiple-vitest-projects-or-custom-snapshot-paths`,children:`Multiple vitest projects or custom snapshot paths`}),`
`,(0,c.jsxs)(t.p,{children:[`If your setup uses multiple vitest projects or custom paths,
you need to tell the addon where to load the snapshot so it can show them in the `,(0,c.jsx)(t.code,{children:`Vis`}),` panel.`]}),`
`,(0,c.jsx)(t.p,{children:`For example,`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// vitest.config.ts

export default defineConfig({
	test: {
		projects: [{
			plugins: [
				storybookVis({
					snapshotRootDir: '__vis__/chromium',
					snapshotSubpath: '...'
				}),
			],
		}, {
			plugins: [
				storybookVis({
					snapshotRootDir: '__vis__/firefox',
					snapshotSubpath: '...'
				}),
			],
		}],
	}
})
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Update your `,(0,c.jsx)(t.code,{children:`.storybook/main.ts`}),` to specify the correct paths:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// .storybook/main.ts

export default {
  addons: [
		{
			name: 'storybook-addon-vis',
			options: {
				visProjects: [{
					snapshotRootDir: '__vis__/chromium',
					snapshotSubpath: '...'
				},{
					snapshotRootDir: '__vis__/firefox',
					snapshotSubpath: '...'
				}]
			}
		}
	]
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[`You can also use the `,(0,c.jsx)(t.code,{children:`defineStorybookVis`}),` helper function to configure the addon:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// .storybook/main.ts
import { defineStorybookVis } from 'storybook-addon-vis/node'

export default {
	addons: [
		defineStorybookVis({
			visProjects: [{
				snapshotRootDir: '__vis__/chromium',
			}]
		})
	]
}
`})}),`
`,(0,c.jsx)(t.h2,{id:`usage---automatic-snapshot`,children:`Usage - automatic snapshot`}),`
`,(0,c.jsxs)(t.p,{children:[`With visual testing enabled, `,(0,c.jsx)(t.a,{href:`https://www.npmjs.com/package/storybook-addon-vis`,rel:`nofollow`,children:`storybook-addon-vis`}),` automatically captures image snapshot for stories with `,(0,c.jsx)(t.code,{children:`snapshot`}),` tag.`]}),`
`,(0,c.jsxs)(t.p,{children:[`As how tags work in `,(0,c.jsx)(t.a,{href:`https://storybook.js.org`,rel:`nofollow`,children:`Storybook`}),`, you can add the tag globally, per story file, or per story.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// .storybook/preview.tsx
export default {
	// Enable image snapshot for all stories
	// For CSF Next, this is added automatically by the addon.
	tags: ['snapshot']
}
`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// some.stories.tsx
export default {
	// Enable image snapshot for all stories in this file
	tags: ['snapshot']
}
`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`export const MyStory = {
	// Enable image snapshot for this story
	tags: ['snapshot'],
	// ...
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[`You can disable snapshot with the `,(0,c.jsx)(t.code,{children:`!snapshot`}),` tag, much like `,(0,c.jsx)(t.code,{children:`!test`}),`.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`export const MyStory = {
	// Disable image snapshot for this story
	tags: ['!snapshot'],
	// ...
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Note that since they are captured during test,
if you set `,(0,c.jsx)(t.code,{children:`tags: ['!test']`}),` to disable testing,
no snapshot will be taken either.`]}),`
`,(0,c.jsx)(t.p,{children:`You can also provide additional tags, which you will receive when you use the theme preset:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`export const MyStory = {
	tags: ['snapshot', 'skip-dark'],
	// ...
}

// in vitest.setup.ts
vis.setup({
	auto: {
		async dark({ tags }) {
			if (tags.includes('skip-dark')) return false
			document.body.classList.add('dark')
		}
	}
})
`})}),`
`,(0,c.jsxs)(t.p,{children:[`If you want to customize the snapshot options for the automatic snapshot,
you can provide options using Storybook parameters.
`,(0,c.jsx)(t.code,{children:`defineAutoSnapshotParam()`}),` is a helper function to provide autocompletion:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { defineAutoSnapshotParam } from 'storybook-addon-vis'

export const MyStory = {
	parameters: defineAutoSnapshotParam({
		failureThreshold: 70,
	})
	// ...
}
`})}),`
`,(0,c.jsx)(t.h2,{id:`usage---manual-snapshot`,children:`Usage - manual snapshot`}),`
`,(0,c.jsx)(t.p,{children:`Besides automatic snapshot, you can capture image snapshot manually.`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { expect } from '@storybook/test'

// \`page\` and the like are proxies of \`@vitest/browser/context\` to work within storybook
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
`})}),`
`,(0,c.jsx)(t.h2,{id:`usage---has-image-snapshot`,children:`Usage - has image snapshot`}),`
`,(0,c.jsx)(t.p,{children:`While less common, you can also check if a snapshot exists:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { hasImageSnapshot } from 'storybook-addon-vis'

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
					expect(error.message).toMatch(/Expected image to match but was differ by \\d+ pixels./)
				},
			)
	},
}
`})}),`
`,(0,c.jsx)(t.p,{children:`This is useful when you are performing some negative test.`}),`
`,(0,c.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,c.jsxs)(t.blockquote,{children:[`
`,(0,c.jsx)(t.p,{children:`Internal server error: Failed to resolve import "pathe"`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`This is likely `,(0,c.jsxs)(t.a,{href:`https://discord.com/channels/917386801235247114/1305110710229008435/1305325581839368202`,rel:`nofollow`,children:[`a compatibility issue with `,(0,c.jsx)(t.code,{children:`pnpm`}),` and `,(0,c.jsx)(t.code,{children:`vite`}),` in monorepo`]}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[`To work around this, you can add `,(0,c.jsx)(t.a,{href:`https://pnpm.io/npmrc#shamefully-hoist`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`shamefully-hoist`})}),` to your `,(0,c.jsx)(t.code,{children:`.npmrc`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-sh`,children:`# .npmrc

shamefully-hoist=true
`})}),`
`,(0,c.jsxs)(t.p,{children:[`or hoist the `,(0,c.jsx)(t.code,{children:`pathe`}),` package:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-sh`,children:`# .npmrc

hoist-pattern[] = pathe
`})}),`
`,(0,c.jsxs)(t.blockquote,{children:[`
`,(0,c.jsx)(t.p,{children:`It takes empty snapshots on Vitest tests`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`If you are using Storybook 8.5 and using the workaround to run both stories and tests `,(0,c.jsx)(t.a,{href:`https://github.com/storybookjs/storybook/issues/30307`,rel:`nofollow`,children:`as described here`}),`,
Storybook are also transforming the tests as if they are stories.
That causes it to inject elements into the DOM and this addon detect that as some rendering by your tests,
thus taking an image snapshot.`]}),`
`,(0,c.jsxs)(t.p,{children:[`Since it is a bug to be addressed soon,
please disable the snapshots for your tests by adding a `,(0,c.jsx)(t.code,{children:`beforeAll`}),` hook:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`import { setAutoSnapshotOptions } from 'storybook-addon-vis'
import { beforeAll } from 'vitest'

beforeAll(() => setAutoSnapshotOptions(false))
`})})]})}function s(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=r(),a(),t()}))();export{s as default};