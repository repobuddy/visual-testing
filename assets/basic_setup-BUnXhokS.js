import{j as t,M as i}from"./iframe-DH5Gow12.js";import{useMDXComponents as n}from"./index-DtmMaUxK.js";function o(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...s.components};return t.jsxs(t.Fragment,{children:[t.jsx(i,{title:"Basic Setup"}),`
`,t.jsx(e.h1,{id:"basic-setup",children:"Basic Setup"}),`
`,t.jsx(e.p,{children:"The basic setup is pretty straightforward."}),`
`,t.jsx(e.h2,{id:"vitest",children:"Vitest"}),`
`,t.jsxs(e.p,{children:["For ",t.jsx(e.a,{href:"https://vitest.dev/",rel:"nofollow",children:"Vitest"}),", you need to add the following to your ",t.jsx(e.code,{children:"vitest.config.ts"}),":"]}),`
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
		// vitest v2
		browser: {
			enabled: true,
			headless: true,
			provider: 'playwright',
			name: 'chromium',
		},
		// vitest v3
		browser: {
			enabled: true,
			headless: true,
			provider: 'playwright',
			instances: [
				{ browser: 'chromium' }
			]
		}
		// recommend to set to false
		globals: false,
		// Needed by both Storybook Test Addon and Storybook Visual Testing
		setupFiles: ['./vitest.setup.ts'],
	}
})
`})}),`
`,t.jsxs(e.p,{children:["And your ",t.jsx(e.code,{children:"vitest.setup.ts"}),":"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// vitest.setup.ts

import { vis, visAnnotations } from 'storybook-addon-vis/vitest-setup'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview.ts'

const project = setProjectAnnotations([
	projectAnnotations,
	visAnnotations // ADD THIS
])

beforeAll(project.beforeAll)

// ADD THIS to setup visual testing
vis.setup()
`})}),`
`,t.jsx(e.h2,{id:"storybook",children:"Storybook"}),`
`,t.jsxs(e.p,{children:["For ",t.jsx(e.a,{href:"https://storybook.js.org/",rel:"nofollow",children:"Storybook"}),", update your ",t.jsx(e.code,{children:".storybook/main.ts"})," to add the addon:"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`// .storybook/main.ts

const config: StorybookConfig = {
	// ...
	addons: [
		// ...
		'@storybook/experimental-addon-test',
		'storybook-addon-vis' // ADD THIS
	]
}
`})}),`
`,t.jsxs(e.p,{children:["With this setup, ",t.jsx(e.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," is configured to do the following:"]}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:["Take snapshots for every story with the ",t.jsx(e.code,{children:"snapshot"})," tag."]}),`
`,t.jsxs(e.li,{children:["Use ",t.jsx(e.code,{children:"pixelmatch"})," as the comparison algorithm.",`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:["Compare snapshots with a failure threshold of ",t.jsx(e.code,{children:"0 pixels"}),"."]}),`
`,t.jsxs(e.li,{children:["Timeout for image comparison is set to ",t.jsx(e.code,{children:"30000 ms"}),"."]}),`
`]}),`
`]}),`
`,t.jsxs(e.li,{children:["Local (non-CI) image snapshots are saved in the ",t.jsx(e.code,{children:"<root>/__vis__/local"})," directory."]}),`
`,t.jsxs(e.li,{children:["CI image snapshots are saved in the ",t.jsx(e.code,{children:"<root>/__vis__/<process.platform>"})," directory."]}),`
`,t.jsxs(e.li,{children:["Baseline images are saved in the ",t.jsx(e.code,{children:"<root>/__vis__/*/__baselines__"})," directory."]}),`
`,t.jsxs(e.li,{children:["Current test images are saved in the ",t.jsx(e.code,{children:"<root>/__vis__/*/__results__"})," directory."]}),`
`,t.jsxs(e.li,{children:["Diff images (if any) are saved in the ",t.jsx(e.code,{children:"<root>/__vis__/*/__diffs__"})," directory."]}),`
`,t.jsxs(e.li,{children:["You can review the baseline and diff images in addon ",t.jsx(e.code,{children:"Vis"})," panel."]}),`
`]}),`
`,t.jsx(e.h2,{id:"git-or-other-version-control-system",children:"Git (or other version control system)"}),`
`,t.jsxs(e.p,{children:["Since ",t.jsx(e.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"}),` will save snapshot on your file system,
you need to tell your v2ersion control system to ignore the snapshot directory.`]}),`
`,t.jsxs(e.p,{children:["With the basic setup, add this to your ",t.jsx(e.code,{children:".gitignore"})," (or your version control system's ignore file):"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ini",children:`# snapshot images
__vis__/local
__vis__/**/__results__
__vis__/**/__diffs__
`})}),`
`,t.jsxs(e.p,{children:["Note that the ",t.jsx(e.code,{children:"__vis__/*/__baselines__"}),` should not be ignored,
as it is used to store the baseline images.
They should be committed to your repository.`]})]})}function l(s={}){const{wrapper:e}={...n(),...s.components};return e?t.jsx(e,{...s,children:t.jsx(o,{...s})}):o(s)}export{l as default};
