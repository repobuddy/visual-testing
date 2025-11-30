import{j as t,M as i}from"./iframe-DUflMRLr.js";import{useMDXComponents as o}from"./index-BbkR72zv.js";import"./preload-helper-PPVm8Dsz.js";function s(n){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(i,{title:"Overview"}),`
`,t.jsx(e.h1,{id:"storybook-visual-testing-addon",children:"Storybook Visual Testing addon"}),`
`,t.jsxs(e.p,{children:[t.jsx(e.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," allows you to perform self contained Visual Testing for ",t.jsx(e.a,{href:"https://storybook.js.org",rel:"nofollow",children:"Storybook"}),"."]}),`
`,t.jsx(e.p,{children:"The image snapshots are stored locally and are used to detect visual regressions."}),`
`,t.jsx(e.h2,{id:"features",children:"Features"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"You can capture and compare image snapshot both automatically and manually."}),`
`,t.jsx(e.li,{children:"You can take a snapshot of the whole page or a specific component."}),`
`,t.jsx(e.li,{children:"You can take snapshots in different environments, platform, browser, screen size and themes."}),`
`,t.jsx(e.li,{children:"You can enable, disable, and customize how the snapshots are taken and compared."}),`
`,t.jsx(e.li,{children:"The snapshots are stored locally."}),`
`]}),`
`,t.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,t.jsxs(e.p,{children:["You can install ",t.jsx(e.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," with your package manager of choice:"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-sh",children:`npm install --save-dev storybook-addon-vis

pnpm add --save-dev storybook-addon-vis

yarn add --save-dev storybook-addon-vis
`})}),`
`,t.jsxs(e.p,{children:["This addon requires ",t.jsx(e.a,{href:"https://storybook.js.org/docs/writing-tests/integrations/vitest-addon",rel:"nofollow",children:"Storybook Vitest addon"}),` to work.
Please refer to its documentation for installation and setup instructions.`]}),`
`,t.jsx(e.h2,{id:"setup",children:"Setup"}),`
`,t.jsxs(e.p,{children:["To setup ",t.jsx(e.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"}),", you need to do the following:"]}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:["Add the ",t.jsx(e.code,{children:"storybookVis"})," plugin in ",t.jsx(e.a,{href:"https://vitest.dev/",rel:"nofollow",children:"Vitest"})," along with the ",t.jsx(e.code,{children:"storybookTest"})," plugin."]}),`
`,t.jsxs(e.li,{children:["Configure visual testing in ",t.jsx(e.code,{children:"vitest.setup.ts"})," (and ",t.jsx(e.code,{children:".storybook/preview.ts"})," if you are writing your stories in CSF Next)."]}),`
`,t.jsxs(e.li,{children:["Add ",t.jsx(e.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," addon to your ",t.jsx(e.a,{href:"https://storybook.js.org",rel:"nofollow",children:"Storybook"})," configuration in ",t.jsx(e.code,{children:".storybook/main.ts"}),"."]}),`
`,t.jsxs(e.li,{children:["Ignore snapshot folders in your ",t.jsx(e.code,{children:".gitignore"})," file."]}),`
`]}),`
`,t.jsxs(e.p,{children:["Also, if you are using TypeScript, you need to add the ",t.jsx(e.code,{children:"storybook-addon-vis/matcher"})," type to your ",t.jsx(e.code,{children:"tsconfig.json"}),"."]}),`
`,t.jsx(e.h3,{id:"basic-setup",children:"Basic Setup"}),`
`,t.jsxs(e.p,{children:[t.jsx(e.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," provides sensible default setup for both ",t.jsx(e.a,{href:"https://storybook.js.org",rel:"nofollow",children:"Storybook"})," and ",t.jsx(e.a,{href:"https://vitest.dev/",rel:"nofollow",children:"Vitest"}),`.
So setting it up is pretty straightforward.`]}),`
`,t.jsx(e.p,{children:"The basic setup will:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:["Use ",t.jsx(e.code,{children:"pixelmatch"})," as the diffing algorithm."]}),`
`,t.jsxs(e.li,{children:["Set config to compare image snapshot with a failure threshold of ",t.jsx(e.code,{children:"0 pixels"}),"."]}),`
`,t.jsxs(e.li,{children:["Timeout for image comparison is set to ",t.jsx(e.code,{children:"30000 ms"}),"."]}),`
`,t.jsxs(e.li,{children:["Local (non-CI) image snapshots are saved in the ",t.jsx(e.code,{children:"<root>/__vis__/local"})," directory."]}),`
`,t.jsxs(e.li,{children:["CI image snapshots are saved in the ",t.jsx(e.code,{children:"<root>/__vis__/<process.platform>"})," directory."]}),`
`,t.jsxs(e.li,{children:["Baseline images are saved in the ",t.jsx(e.code,{children:"<root>/__vis__/*/__baselines__"})," directory."]}),`
`,t.jsxs(e.li,{children:["Image snapshots of the current test run are saved in the ",t.jsx(e.code,{children:"<root>/__vis__/*/__results__"})," directory."]}),`
`,t.jsxs(e.li,{children:["Diff images are saved in the ",t.jsx(e.code,{children:"<root>/__vis__/*/__diffs__"})," directory."]}),`
`,t.jsxs(e.li,{children:["You can review the baseline and diff images in addon ",t.jsx(e.code,{children:"Vis"})," panel."]}),`
`]}),`
`,t.jsxs(e.p,{children:[`This setup assumes that you are writing your stories in CSF 3.
If you are writing your stories in CSF Next, check out `,t.jsx(e.a,{href:"#basic-setup-for-csf-next",children:"Basic Setup for CSF Next"}),"."]}),`
`,t.jsxs(e.p,{children:["For ",t.jsx(e.a,{href:"https://vitest.dev/",rel:"nofollow",children:"Vitest"}),", you need to do two things:"]}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:["Add the ",t.jsx(e.code,{children:"storybookVis"})," plugin in ",t.jsx(e.code,{children:"vitest.config.ts"}),"."]}),`
`,t.jsxs(e.li,{children:["Enable visual testing in ",t.jsx(e.code,{children:"vitest.setup.ts"}),"."]}),`
`]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// vitest.config.ts
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
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// vitest.setup.ts
import { vis, visAnnotations } from 'storybook-addon-vis/vitest-setup'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview.ts'

const annotations = setProjectAnnotations([
	projectAnnotations,
	visAnnotations
])

beforeAll(annotations.beforeAll)

// ADD THIS to setup automatic visual testing
vis.setup({ auto: true })
`})}),`
`,t.jsxs(e.p,{children:["For ",t.jsx(e.a,{href:"https://storybook.js.org",rel:"nofollow",children:"Storybook"}),", you need to add the addon to your ",t.jsx(e.code,{children:".storybook/main.ts"}),":"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// .storybook/main.ts

const config: StorybookConfig = {
	addons: [
		'storybook-addon-vis' // ADD THIS
	]
}
`})}),`
`,t.jsxs(e.p,{children:["In monorepo, you need to use the ",t.jsx(e.code,{children:"getAbsolutePath"})," helper function to resolve the absolute path of the addon."]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// .storybook/main.ts
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
`,t.jsxs(e.p,{children:["The ",t.jsx(e.code,{children:"getAbsolutePath"})," function is a helper function typically added by ",t.jsx(e.a,{href:"https://storybook.js.org",rel:"nofollow",children:"Storybook"})," automatically."]}),`
`,t.jsx(e.h3,{id:"ignore-snapshot-folders",children:"Ignore snapshot folders"}),`
`,t.jsxs(e.p,{children:["Since ",t.jsx(e.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"}),` will save snapshot on your file system,
you need to tell your version control system to ignore the snapshot directory.`]}),`
`,t.jsxs(e.p,{children:["With the basic setup, add this to your ",t.jsx(e.code,{children:".gitignore"})," (or your version control system's ignore file):"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ini",children:`# .gitignore
**/__vis__/**/__diffs__
**/__vis__/**/__results__
**/__vis__/local
`})}),`
`,t.jsxs(e.p,{children:["Note that the ",t.jsx(e.code,{children:"__vis__/*/__baselines__"}),` should not be ignored,
as it is used to store the baseline images.
They should be committed to your repository.`]}),`
`,t.jsx(e.h3,{id:"typescript-configuration",children:"TypeScript Configuration"}),`
`,t.jsx(e.p,{children:"If you want to do manual snapshot testing, you need to tell TypeScript about the matcher."}),`
`,t.jsxs(e.p,{children:["You can add the following to your ",t.jsx(e.code,{children:"tsconfig.json"}),":"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-json",children:`{
	"compilerOptions": {
		"types": ["storybook-addon-vis/matcher"]
	}
}
`})}),`
`,t.jsx(e.p,{children:"Or use the triple-slash reference:"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-json",children:`{
	"includes": [..., "types"]
}


\`\`\`ts
// types/storybook-addon-vis.d.ts
/// <reference types="storybook-addon-vis/matcher" />
`})}),`
`,t.jsx(e.h3,{id:"disable-vitest-global-api",children:"Disable Vitest global API"}),`
`,t.jsxs(e.p,{children:["We recommend to set ",t.jsx(e.code,{children:"globals"})," to ",t.jsx(e.code,{children:"false"}),` (which is the default).
Setting `,t.jsx(e.code,{children:"globals"})," to ",t.jsx(e.code,{children:"true"}),` actually works ok during test.
But they don't exist in the story files:`]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-tsx",children:`// some.stories.tsx
export const Story = {
	async play() {
		// does not work
		expect(true).toBeTruthy()
	}
}
`})}),`
`,t.jsxs(e.p,{children:[`This is obvious because the story files are executed on the browser.
In fact, you need to import the functions from `,t.jsx(e.code,{children:"@storybook/test"})," instead:"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// some.test.ts
import { expect } from 'vitest'

// some.stories.ts
import { expect } from '@storybook/test'
`})}),`
`,t.jsxs(e.p,{children:["Setting ",t.jsx(e.code,{children:"globals: true"})," (and adding ",t.jsx(e.code,{children:'types: ["vitest/globals"]'})," in your ",t.jsx(e.code,{children:"tsconfig.json"}),`)
causes inconsistency and confuses both the editor and you.`]}),`
`,t.jsx(e.h3,{id:"basic-setup-for-csf-next",children:"Basic Setup for CSF Next"}),`
`,t.jsxs(e.p,{children:[`If you are writing your stories in CSF Next,
You need to setup the visual testing also in `,t.jsx(e.code,{children:".storybook/preview.ts"}),"."]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// .storybook/preview.ts
import addonVis from 'storybook-addon-vis'
import { definePreview } from '@storybook/your-framework/node'

export default definePreview({
	addons: [
		// Enable automatic snapshot taking at the end of each test
		addonVis({ auto: true })
	]
})
`})}),`
`,t.jsx(e.h3,{id:"advanced-setup",children:"Advanced Setup"}),`
`,t.jsx(e.p,{children:"If you need more control over the visual testing, you can customize the addon configuration."}),`
`,t.jsxs(e.p,{children:["In ",t.jsx(e.code,{children:"vitest.config.ts"}),", you can customize where the snapshots are saved and how they are compared."]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// vitest.config.ts
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
`,t.jsxs(e.p,{children:["The options are the same as the options in [",t.jsx(e.code,{children:"vitest-plugin-vis"}),"][vitest-plugin-vis] minus the ",t.jsx(e.code,{children:"preset"}),"."]}),`
`,t.jsxs(e.p,{children:["For more details, please refer to the ",t.jsx(e.a,{href:"https://github.com/repobuddy/visual-testing/tree/main/packages/vitest-plugin-vis",rel:"nofollow",children:"vitest-plugin-vis documentation"}),"."]}),`
`,t.jsxs(e.p,{children:["In ",t.jsx(e.code,{children:"vitest.setup.ts"}),", you can customize how the automatic snapshots are taken."]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// vitest.setup.ts
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
`,t.jsx(e.h4,{id:"multiple-vitest-projects-or-custom-snapshot-paths",children:"Multiple vitest projects or custom snapshot paths"}),`
`,t.jsxs(e.p,{children:[`If your setup uses multiple vitest projects or custom paths,
you need to tell the addon where to load the snapshot so it can show them in the `,t.jsx(e.code,{children:"Vis"})," panel."]}),`
`,t.jsx(e.p,{children:"For example,"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// vitest.config.ts

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
`,t.jsxs(e.p,{children:["Update your ",t.jsx(e.code,{children:".storybook/main.ts"})," to specify the correct paths:"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// .storybook/main.ts

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
`,t.jsxs(e.p,{children:["You can also use the ",t.jsx(e.code,{children:"defineStorybookVis"})," helper function to configure the addon:"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// .storybook/main.ts
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
`,t.jsx(e.h2,{id:"usage---automatic-snapshot",children:"Usage - automatic snapshot"}),`
`,t.jsxs(e.p,{children:["With visual testing enabled, ",t.jsx(e.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," automatically captures image snapshot for stories with ",t.jsx(e.code,{children:"snapshot"})," tag."]}),`
`,t.jsxs(e.p,{children:["As how tags work in ",t.jsx(e.a,{href:"https://storybook.js.org",rel:"nofollow",children:"Storybook"}),", you can add the tag globally, per story file, or per story."]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-tsx",children:`// .storybook/preview.tsx
export default {
	// Enable image snapshot for all stories
	// For CSF Next, this is added automatically by the addon.
	tags: ['snapshot']
}
`})}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-tsx",children:`// some.stories.tsx
export default {
	// Enable image snapshot for all stories in this file
	tags: ['snapshot']
}
`})}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-tsx",children:`export const MyStory = {
	// Enable image snapshot for this story
	tags: ['snapshot'],
	// ...
}
`})}),`
`,t.jsxs(e.p,{children:["You can disable snapshot with the ",t.jsx(e.code,{children:"!snapshot"})," tag, much like ",t.jsx(e.code,{children:"!test"}),"."]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-tsx",children:`export const MyStory = {
	// Disable image snapshot for this story
	tags: ['!snapshot'],
	// ...
}
`})}),`
`,t.jsxs(e.p,{children:[`Note that since they are captured during test,
if you set `,t.jsx(e.code,{children:"tags: ['!test']"}),` to disable testing,
no snapshot will be taken either.`]}),`
`,t.jsx(e.p,{children:"You can also provide additional tags, which you will receive when you use the theme preset:"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-tsx",children:`export const MyStory = {
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
`,t.jsxs(e.p,{children:[`If you want to customize the snapshot options for the automatic snapshot,
you can provide options using Storybook parameters.
`,t.jsx(e.code,{children:"defineAutoSnapshotParam()"})," is a helper function to provide autocompletion:"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-tsx",children:`import { defineAutoSnapshotParam } from 'storybook-addon-vis'

export const MyStory = {
	parameters: defineAutoSnapshotParam({
		failureThreshold: 70,
	})
	// ...
}
`})}),`
`,t.jsx(e.h2,{id:"usage---manual-snapshot",children:"Usage - manual snapshot"}),`
`,t.jsx(e.p,{children:"Besides automatic snapshot, you can capture image snapshot manually."}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-tsx",children:`import { expect } from '@storybook/test'

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
`,t.jsx(e.h2,{id:"usage---has-image-snapshot",children:"Usage - has image snapshot"}),`
`,t.jsx(e.p,{children:"While less common, you can also check if a snapshot exists:"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-tsx",children:`import { hasImageSnapshot } from 'storybook-addon-vis'

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
`,t.jsx(e.p,{children:"This is useful when you are performing some negative test."}),`
`,t.jsx(e.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsx(e.p,{children:'Internal server error: Failed to resolve import "pathe"'}),`
`]}),`
`,t.jsxs(e.p,{children:["This is likely ",t.jsxs(e.a,{href:"https://discord.com/channels/917386801235247114/1305110710229008435/1305325581839368202",rel:"nofollow",children:["a compatibility issue with ",t.jsx(e.code,{children:"pnpm"})," and ",t.jsx(e.code,{children:"vite"})," in monorepo"]}),"."]}),`
`,t.jsxs(e.p,{children:["To work around this, you can add ",t.jsx(e.a,{href:"https://pnpm.io/npmrc#shamefully-hoist",rel:"nofollow",children:t.jsx(e.code,{children:"shamefully-hoist"})})," to your ",t.jsx(e.code,{children:".npmrc"}),":"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-sh",children:`# .npmrc

shamefully-hoist=true
`})}),`
`,t.jsxs(e.p,{children:["or hoist the ",t.jsx(e.code,{children:"pathe"})," package:"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-sh",children:`# .npmrc

hoist-pattern[] = pathe
`})}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsx(e.p,{children:"It takes empty snapshots on Vitest tests"}),`
`]}),`
`,t.jsxs(e.p,{children:["If you are using Storybook 8.5 and using the workaround to run both stories and tests ",t.jsx(e.a,{href:"https://github.com/storybookjs/storybook/issues/30307",rel:"nofollow",children:"as described here"}),`,
Storybook are also transforming the tests as if they are stories.
That causes it to inject elements into the DOM and this addon detect that as some rendering by your tests,
thus taking an image snapshot.`]}),`
`,t.jsxs(e.p,{children:[`Since it is a bug to be addressed soon,
please disable the snapshots for your tests by adding a `,t.jsx(e.code,{children:"beforeAll"})," hook:"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`import { setAutoSnapshotOptions } from 'storybook-addon-vis'
import { beforeAll } from 'vitest'

beforeAll(() => setAutoSnapshotOptions(false))
`})})]})}function l(n={}){const{wrapper:e}={...o(),...n.components};return e?t.jsx(e,{...n,children:t.jsx(s,{...n})}):s(n)}export{l as default};
