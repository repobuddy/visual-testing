import{j as t,M as i}from"./iframe-3ZLhaDUd.js";import{useMDXComponents as o}from"./index-BzaOSM2N.js";function n(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...o(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(i,{title:"Advance Setup"}),`
`,t.jsx(s.h1,{id:"advance-setup",children:"Advance Setup"}),`
`,t.jsxs(s.p,{children:[t.jsx(s.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," is very flexible and provides a lot of options to customize the visual testing."]}),`
`,t.jsxs(s.p,{children:["It is built on top of ",t.jsx(s.a,{href:"https://www.npmjs.com/package/vitest-plugin-vis",rel:"nofollow",children:"vitest-plugin-vis"}),`,
so most of the options are the same as `,t.jsx(s.a,{href:"https://www.npmjs.com/package/vitest-plugin-vis",rel:"nofollow",children:"vitest-plugin-vis"}),`.
You can check its documentation for those options.`]}),`
`,t.jsxs(s.p,{children:["This document will focus on things that are specific to ",t.jsx(s.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"}),"."]}),`
`,t.jsx(s.h2,{id:"removal-of-presets",children:"Removal of presets"}),`
`,t.jsxs(s.p,{children:[t.jsx(s.a,{href:"https://www.npmjs.com/package/vitest-plugin-vis",rel:"nofollow",children:"vitest-plugin-vis"})," provides ",t.jsx(s.code,{children:"auto"})," or ",t.jsx(s.code,{children:"manual"}),` presets,
but `,t.jsx(s.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," does not provide any presets."]}),`
`,t.jsxs(s.p,{children:["This is because those presets setup the ",t.jsx(s.code,{children:"vitest.setup.ts"}),` for you,
but `,t.jsx(s.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," needs to update the ",t.jsx(s.code,{children:"vitest.setup.ts"})," file you already have from ",t.jsx(s.a,{href:"https://storybook.js.org/docs/writing-tests/test-addon",rel:"nofollow",children:"Storybook Test addon"}),`,
so those presets does not work and we need to customize the file directly.`]}),`
`,t.jsx(s.h2,{id:"disable-vitest-global-api",children:"Disable Vitest global API"}),`
`,t.jsx(s.pre,{children:t.jsx(s.code,{className:"language-ts",children:`// vitest.config.ts

export default defineConfig({
	test: {
		globals: false,
	}
})
`})}),`
`,t.jsxs(s.p,{children:["We recommend to set ",t.jsx(s.code,{children:"globals"})," to ",t.jsx(s.code,{children:"false"}),` (which is the default).
Setting `,t.jsx(s.code,{children:"globals"})," to ",t.jsx(s.code,{children:"true"}),` actually works ok during test.
But they don't exist in the story files:`]}),`
`,t.jsx(s.pre,{children:t.jsx(s.code,{className:"language-tsx",children:`// some.stories.tsx
export const Story = {
	async play() {
		// does not work
		expect(true).toBeTruthy()
	}
}
`})}),`
`,t.jsxs(s.p,{children:[`This is obvious because the story files are executed on the browser.
In fact, you need to import the functions from `,t.jsx(s.code,{children:"@storybook/test"})," instead:"]}),`
`,t.jsx(s.pre,{children:t.jsx(s.code,{className:"language-ts",children:`// some.test.ts
import { expect } from 'vitest'

// some.stories.ts
import { expect } from '@storybook/test'
`})}),`
`,t.jsxs(s.p,{children:["Setting ",t.jsx(s.code,{children:"globals: true"})," (and adding ",t.jsx(s.code,{children:'types: ["vitest/globals"]'})," in your ",t.jsx(s.code,{children:"tsconfig.json"}),`)
causes inconsistency and confuses both the editor and you.`]}),`
`,t.jsx(s.h2,{id:"disable-auto-snapshot-for-tests",children:"Disable auto snapshot for tests"}),`
`,t.jsxs(s.p,{children:[t.jsx(s.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," uses the same auto snapshot feature as ",t.jsx(s.a,{href:"https://www.npmjs.com/package/vitest-plugin-vis",rel:"nofollow",children:"vitest-plugin-vis"}),"."]}),`
`,t.jsxs(s.p,{children:["That means if you set ",t.jsx(s.code,{children:"auto: true"})," in your ",t.jsx(s.code,{children:"vitest.setup.ts"}),`,
your render tests will be automatically snapshot tested:`]}),`
`,t.jsx(s.pre,{children:t.jsx(s.code,{className:"language-ts",children:`// vitest.setup.ts

vis.setup({	auto: true })
`})}),`
`,t.jsx(s.p,{children:`When you use it to take snapshots for multiple themes, e.g. light and dark,
the same will occurs:`}),`
`,t.jsx(s.pre,{children:t.jsx(s.code,{className:"language-ts",children:`vis.setup({
	auto: {
		async light() { document.body.classList.remove('dark') },
		async dark() { document.body.classList.add('dark') },
	}
})
`})}),`
`,t.jsxs(s.p,{children:["If this is not what you want, you can disable the auto snapshot for tests by checking for the ",t.jsx(s.code,{children:"snapshot"})," tag:"]}),`
`,t.jsx(s.pre,{children:t.jsx(s.code,{className:"language-ts",children:`vis.setup({
	auto: {
		async light({ tags }) {
			if (!tags.includes('snapshot')) return false
			document.body.classList.remove('dark')
		},
		async dark({ tags }) {
			if (!tags.includes('snapshot')) return false
			document.body.classList.add('dark')
		}
	}
})
`})}),`
`,t.jsx(s.h2,{id:"multiple-vitest-projects-or-custom-paths",children:"Multiple vitest projects or custom paths"}),`
`,t.jsxs(s.p,{children:[`If your setup uses multiple vitest projects or custom paths,
you need to tell the addon where to load the snapshot so it can show them in the `,t.jsx(s.code,{children:"Vis"})," panel."]}),`
`,t.jsx(s.p,{children:"For example,"}),`
`,t.jsx(s.pre,{children:t.jsx(s.code,{className:"language-ts",children:`// vitest.config.ts

export default defineConfig({
	test: {
		workspace: [{
			plugins: [
				storybookVis({
					snapshotRootDir: '__vis__/chromium',
					// or
					snapshotSubpath: '...'
				}),
			],
		}, {
			plugins: [
				storybookVis({
					snapshotRootDir: '__vis__/firefox',
					// or
					snapshotSubpath: '...'
				}),
			],
		}],
	}
})
`})}),`
`,t.jsxs(s.p,{children:["Update your ",t.jsx(s.code,{children:".storybook/main.ts"})," to specify the correct paths:"]}),`
`,t.jsx(s.pre,{children:t.jsx(s.code,{className:"language-ts",children:`// .storybook/main.ts

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
`,t.jsx(s.h2,{id:"taking-specific-snapshots",children:"Taking specific snapshots"}),`
`,t.jsx(s.p,{children:`Say you want to take snapshots for multiple themes,
but for certain stories, you want to take skip snapshots for a specific theme.`}),`
`,t.jsx(s.p,{children:"You can do this by using a custom tag:"}),`
`,t.jsx(s.pre,{children:t.jsx(s.code,{className:"language-tsx",children:`// some.stories.tsx
export const Story = {
	tags: ['snapshot', 'skip-dark']
}
`})}),`
`,t.jsx(s.pre,{children:t.jsx(s.code,{className:"language-ts",children:`// vitest.setup.ts

vis.setup({
	auto: {
		async dark({ tags }) {
			if (tags.includes('skip-dark')) return false
			document.body.classList.add('dark')
		}
	}
})
`})})]})}function c(e={}){const{wrapper:s}={...o(),...e.components};return s?t.jsx(s,{...e,children:t.jsx(n,{...e})}):n(e)}export{c as default};
