import{j as s}from"./jsx-runtime-Cf8x2fCZ.js";import{useMDXComponents as o}from"./index-DI2gBlDf.js";import{M as i}from"./index-DEkWjMFa.js";import"./index-yBjzXJbu.js";import"./index-BlmOqGMO.js";import"./index-DUfm9Vh_.js";import"./index-fNjTmf9T.js";import"./iframe-Joza8t-l.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function n(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...o(),...e.components};return s.jsxs(s.Fragment,{children:[s.jsx(i,{title:"Advance Setup"}),`
`,s.jsx(t.h1,{id:"advance-setup",children:"Advance Setup"}),`
`,s.jsxs(t.p,{children:[s.jsx(t.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," is very flexible and provides a lot of options to customize the visual testing."]}),`
`,s.jsxs(t.p,{children:["It is built on top of ",s.jsx(t.a,{href:"https://www.npmjs.com/package/vitest-plugin-vis",rel:"nofollow",children:"vitest-plugin-vis"}),`,
so most of the options are the same as `,s.jsx(t.a,{href:"https://www.npmjs.com/package/vitest-plugin-vis",rel:"nofollow",children:"vitest-plugin-vis"}),`.
You can check its documentation for those options.`]}),`
`,s.jsxs(t.p,{children:["This document will focus on things that are specific to ",s.jsx(t.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"}),"."]}),`
`,s.jsx(t.h2,{id:"removal-of-presets",children:"Removal of presets"}),`
`,s.jsxs(t.p,{children:[s.jsx(t.a,{href:"https://www.npmjs.com/package/vitest-plugin-vis",rel:"nofollow",children:"vitest-plugin-vis"})," provides ",s.jsx(t.code,{children:"auto"})," or ",s.jsx(t.code,{children:"manual"}),` presets,
but `,s.jsx(t.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," does not provide any presets."]}),`
`,s.jsxs(t.p,{children:["This is because those presets setup the ",s.jsx(t.code,{children:"vitest.setup.ts"}),` for you,
but `,s.jsx(t.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," needs to update the ",s.jsx(t.code,{children:"vitest.setup.ts"}),` file you already have from [Storybook Test addon][storybook-test-addon],
so those presets does not work and we need to customize the file directly.`]}),`
`,s.jsx(t.h2,{id:"disable-vitest-global-api",children:"Disable Vitest global API"}),`
`,s.jsx(t.pre,{children:s.jsx(t.code,{className:"language-ts",children:`// vitest.config.ts

export default defineConfig({
	test: {
		globals: false,
	}
})
`})}),`
`,s.jsxs(t.p,{children:["We recommend to set ",s.jsx(t.code,{children:"globals"})," to ",s.jsx(t.code,{children:"false"}),` (which is the default).
Setting `,s.jsx(t.code,{children:"globals"})," to ",s.jsx(t.code,{children:"true"}),` actually works ok during test.
But they don't exist in the story files:`]}),`
`,s.jsx(t.pre,{children:s.jsx(t.code,{className:"language-tsx",children:`// some.stories.tsx
export const Story = {
	async play() {
		// does not work
		expect(true).toBeTruthy()
	}
}
`})}),`
`,s.jsxs(t.p,{children:[`This is obvious because the story files are executed on the browser.
In fact, you need to import the functions from `,s.jsx(t.code,{children:"@storybook/test"})," instead:"]}),`
`,s.jsx(t.pre,{children:s.jsx(t.code,{className:"language-ts",children:`// some.test.ts
import { expect } from 'vitest'

// some.stories.ts
import { expect } from '@storybook/test'
`})}),`
`,s.jsxs(t.p,{children:["Setting ",s.jsx(t.code,{children:"globals: true"})," (and adding ",s.jsx(t.code,{children:'types: ["vitest/globals"]'})," in your ",s.jsx(t.code,{children:"tsconfig.json"}),`)
causes inconsistency and confuses both the editor and you.`]}),`
`,s.jsx(t.h2,{id:"disable-auto-snapshot-for-tests",children:"Disable auto snapshot for tests"}),`
`,s.jsxs(t.p,{children:[s.jsx(t.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," uses the same auto snapshot feature as ",s.jsx(t.a,{href:"https://www.npmjs.com/package/vitest-plugin-vis",rel:"nofollow",children:"vitest-plugin-vis"}),"."]}),`
`,s.jsxs(t.p,{children:["That means if you set ",s.jsx(t.code,{children:"auto: true"})," in your ",s.jsx(t.code,{children:"vitest.setup.ts"}),`,
your render tests will be automatically snapshot tested:`]}),`
`,s.jsx(t.pre,{children:s.jsx(t.code,{className:"language-ts",children:`// vitest.setup.ts

vis.setup({	auto: true })
`})}),`
`,s.jsx(t.p,{children:`When you use it to take snapshots for multiple themes, e.g. light and dark,
the same will occurs:`}),`
`,s.jsx(t.pre,{children:s.jsx(t.code,{className:"language-ts",children:`vis.setup({
	auto: {
		async light() { document.body.classList.remove('dark') },
		async dark() { document.body.classList.add('dark') },
	}
})
`})}),`
`,s.jsxs(t.p,{children:["If this is not what you want, you can disable the auto snapshot for tests by checking for the ",s.jsx(t.code,{children:"snapshot"})," tag:"]}),`
`,s.jsx(t.pre,{children:s.jsx(t.code,{className:"language-ts",children:`vis.setup({
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
`,s.jsx(t.h2,{id:"taking-specific-snapshots",children:"Taking specific snapshots"}),`
`,s.jsx(t.p,{children:`Say you want to take snapshots for multiple themes,
but for certain stories, you want to take skip snapshots for a specific theme.`}),`
`,s.jsx(t.p,{children:"You can do this by using a custom tag:"}),`
`,s.jsx(t.pre,{children:s.jsx(t.code,{className:"language-tsx",children:`// some.stories.tsx
export const Story = {
	tags: ['snapshot', 'skip-dark']
}
`})}),`
`,s.jsx(t.pre,{children:s.jsx(t.code,{className:"language-ts",children:`// vitest.setup.ts

vis.setup({
	auto: {
		async dark({ tags }) {
			if (tags.includes('skip-dark')) return false
		}
	}
})
`})})]})}function j(e={}){const{wrapper:t}={...o(),...e.components};return t?s.jsx(t,{...e,children:s.jsx(n,{...e})}):n(e)}export{j as default};
