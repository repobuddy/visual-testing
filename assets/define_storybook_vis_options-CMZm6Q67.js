import{j as t,M as i}from"./iframe-fTt469q7.js";import{useMDXComponents as e}from"./index-CZprrVMJ.js";import"./preload-helper-PPVm8Dsz.js";function o(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...e(),...s.components};return t.jsxs(t.Fragment,{children:[t.jsx(i,{title:"node/defineStorybookVisOptions"}),`
`,t.jsx(n.h1,{id:"definestorybookvisoptions",children:"defineStorybookVisOptions"}),`
`,t.jsx(n.p,{children:"A helper function to configure options for Storybook Visual Testing addon."}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-ts",children:`// .storybook/main.ts
import { defineMain } from '@storybook/your-framework'
import { defineStorybookVisOptions } from 'storybook-addon-vis/node'

export default defineMain({
	addons: [
		{
			name: 'storybook-addon-vis',
			options: defineStorybookVisOptions({
				visProjects: [
					{
						snapshotRootDir: '__vis__/linux'
					},
					{
						snapshotRootDir: '__vis__/local'
					}
				]
			})
		}
	]
})
`})}),`
`,t.jsx(n.h2,{id:"function-signature",children:"Function Signature"}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-ts",children:`function defineStorybookVisOptions(options: StorybookVisOptions): StorybookVisOptions
`})}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-ts",children:`defineStorybookVisOptions({
	visProjects: [
		{
			snapshotRootDir: '__vis__/linux',
		},
		{
			snapshotRootDir: '__vis__/local',
		},
	],
})
`})}),`
`,t.jsx(n.h2,{id:"configuration-options",children:"Configuration Options"}),`
`,t.jsx(n.h3,{id:"visprojects",children:"visProjects"}),`
`,t.jsx(n.p,{children:"Configure one or more visual testing projects. Each project can have its own snapshot storage settings, allowing you to organize snapshots across different parts of your application."}),`
`,t.jsx(n.h3,{id:"snapshotrootdir",children:"snapshotRootDir"}),`
`,t.jsx(n.p,{children:"Specify where snapshots should be stored. You can provide:"}),`
`,t.jsxs(n.ul,{children:[`
`,t.jsxs(n.li,{children:[t.jsx(n.strong,{children:"A static path string"}),": Use the same directory for all snapshots"]}),`
`,t.jsxs(n.li,{children:[t.jsx(n.strong,{children:"A function"}),": Dynamically determine the directory based on environment",`
`,t.jsxs(n.ul,{children:[`
`,t.jsxs(n.li,{children:["The function receives ",t.jsx(n.code,{children:"{ ci: boolean; platform: string }"})," as context"]}),`
`,t.jsxs(n.li,{children:[t.jsx(n.code,{children:"ci"}),": Whether the code is running in a CI environment"]}),`
`,t.jsxs(n.li,{children:[t.jsx(n.code,{children:"platform"}),": The platform string (e.g., 'linux', 'darwin', 'win32')"]}),`
`]}),`
`]}),`
`,t.jsxs(n.li,{children:[t.jsx(n.strong,{children:"undefined"}),": Use the default snapshot root directory"]}),`
`]}),`
`,t.jsx(n.h3,{id:"snapshotsubpath",children:"snapshotSubpath"}),`
`,t.jsx(n.p,{children:"Transform the default snapshot subdirectory path to match your project structure. This is useful when you want to customize how story file paths are organized in your snapshot directory."}),`
`,t.jsxs(n.ul,{children:[`
`,t.jsxs(n.li,{children:["Receives ",t.jsx(n.code,{children:"{ subpath: string }"})," as options"]}),`
`,t.jsx(n.li,{children:"Returns a transformed subpath string"}),`
`]}),`
`,t.jsx(n.h2,{id:"usage-examples",children:"Usage Examples"}),`
`,t.jsx(n.h3,{id:"store-snapshots-in-a-custom-directory",children:"Store Snapshots in a Custom Directory"}),`
`,t.jsx(n.p,{children:"To store all snapshots in a specific directory, specify a static path:"}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-ts",children:`import { defineStorybookVisOptions } from '@repobuddy/storybook-addon-vis/server/vis_options'

const options = defineStorybookVisOptions({
	visProjects: [
		{
			snapshotRootDir: '__vis__/snapshots',
		},
	],
})
`})}),`
`,t.jsx(n.h3,{id:"use-different-directories-for-ci-and-local-development",children:"Use Different Directories for CI and Local Development"}),`
`,t.jsx(n.p,{children:"If you want snapshots stored in different locations depending on whether you're running in CI or locally, use a function that checks the environment:"}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-ts",children:`import { defineStorybookVisOptions } from '@repobuddy/storybook-addon-vis/server/vis_options'

const options = defineStorybookVisOptions({
	visProjects: [
		{
			snapshotRootDir: ({ ci, platform }) => {
				if (ci) {
					return \`__vis__/ci/\${platform}\`
				}
				return '__vis__/local'
			},
		},
	],
})
`})}),`
`,t.jsx(n.h3,{id:"customize-snapshot-subdirectory-structure",children:"Customize Snapshot Subdirectory Structure"}),`
`,t.jsxs(n.p,{children:["To transform the default snapshot subpath (for example, to remove a ",t.jsx(n.code,{children:"src/"})," prefix from your file paths), provide a ",t.jsx(n.code,{children:"snapshotSubpath"})," function:"]}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-ts",children:`import { defineStorybookVisOptions } from '@repobuddy/storybook-addon-vis/server/vis_options'

const options = defineStorybookVisOptions({
	visProjects: [
		{
			snapshotRootDir: '__vis__',
			snapshotSubpath: ({ subpath }) => {
				// Remove 'src/' prefix if present
				return subpath.replace(/^src\\//, '')
			},
		},
	],
})
`})}),`
`,t.jsx(n.h3,{id:"organize-snapshots-across-multiple-projects",children:"Organize Snapshots Across Multiple Projects"}),`
`,t.jsx(n.p,{children:"When you have multiple visual testing projects (for example, separate projects for components and pages), configure each with its own snapshot directory and path structure:"}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-ts",children:`import { defineStorybookVisOptions } from '@repobuddy/storybook-addon-vis/server/vis_options'

const options = defineStorybookVisOptions({
	visProjects: [
		{
			snapshotRootDir: '__vis__/components',
			snapshotSubpath: ({ subpath }) => \`components/\${subpath}\`,
		},
		{
			snapshotRootDir: '__vis__/pages',
			snapshotSubpath: ({ subpath }) => \`pages/\${subpath}\`,
		},
	],
})
`})}),`
`,t.jsx(n.h3,{id:"use-default-configuration",children:"Use Default Configuration"}),`
`,t.jsx(n.p,{children:"To use the default snapshot root directory and subpath, provide an empty project configuration:"}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-ts",children:`import { defineStorybookVisOptions } from '@repobuddy/storybook-addon-vis/server/vis_options'

const options = defineStorybookVisOptions({
	visProjects: [{}],
})
`})}),`
`,t.jsx(n.h2,{id:"understanding-snapshot-path-structure",children:"Understanding Snapshot Path Structure"}),`
`,t.jsx(n.p,{children:"To understand where your snapshots will be stored, the final snapshot path is constructed as:"}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{children:`<snapshotRootDir>/<baseline|diff|results>/<snapshotSubpath>/<task-id>-<variant>.png
`})}),`
`,t.jsx(n.p,{children:"Where:"}),`
`,t.jsxs(n.ul,{children:[`
`,t.jsxs(n.li,{children:[t.jsx(n.code,{children:"snapshotRootDir"})," is determined by the ",t.jsx(n.code,{children:"snapshotRootDir"})," option"]}),`
`,t.jsxs(n.li,{children:[t.jsx(n.code,{children:"snapshotSubpath"})," is the result of the ",t.jsx(n.code,{children:"snapshotSubpath"})," function (or default)"]}),`
`,t.jsxs(n.li,{children:[t.jsx(n.code,{children:"task-id"})," is derived from the story name"]}),`
`,t.jsxs(n.li,{children:[t.jsx(n.code,{children:"variant"})," identifies the specific snapshot variant"]}),`
`]}),`
`,t.jsx(n.h2,{id:"related",children:"Related"}),`
`,t.jsxs(n.ul,{children:[`
`,t.jsxs(n.li,{children:[t.jsx(n.a,{href:"/docs/storybook-addon-vis-server-create-storybook-vis-server--docs",children:"createStorybookVisServer"})," - Server implementation that uses these options"]}),`
`,t.jsxs(n.li,{children:[t.jsx(n.a,{href:"/docs/storybook-addon-vis-overview--docs",children:"Storybook Visual Testing Overview"})," - General overview of the addon"]}),`
`]})]})}function c(s={}){const{wrapper:n}={...e(),...s.components};return n?t.jsx(n,{...s,children:t.jsx(o,{...s})}):o(s)}export{c as default};
