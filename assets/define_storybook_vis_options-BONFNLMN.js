import{n as e}from"./chunk-BneVvdWh.js";import{c as t,s as n}from"./blocks-pk6s6g-r.js";import{a as r}from"./chunk-RD3KTAHR-C3fY6nk_.js";import{r as i}from"./react-D3_z09Pp.js";import{t as a}from"./mdx-react-shim-DMzzWKkY.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...i(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{title:`node/defineStorybookVisOptions`}),`
`,(0,c.jsx)(t.h1,{id:`definestorybookvisoptions`,children:`defineStorybookVisOptions`}),`
`,(0,c.jsx)(t.p,{children:`A helper function to configure options for Storybook Visual Testing addon.`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// .storybook/main.ts
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
`,(0,c.jsx)(t.h2,{id:`function-signature`,children:`Function Signature`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`function defineStorybookVisOptions(options: StorybookVisOptions): StorybookVisOptions
`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`defineStorybookVisOptions({
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
`,(0,c.jsx)(t.h2,{id:`configuration-options`,children:`Configuration Options`}),`
`,(0,c.jsx)(t.h3,{id:`visprojects`,children:`visProjects`}),`
`,(0,c.jsx)(t.p,{children:`Configure one or more visual testing projects. Each project can have its own snapshot storage settings, allowing you to organize snapshots across different parts of your application.`}),`
`,(0,c.jsx)(t.h3,{id:`snapshotrootdir`,children:`snapshotRootDir`}),`
`,(0,c.jsx)(t.p,{children:`Specify where snapshots should be stored. You can provide:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`A static path string`}),`: Use the same directory for all snapshots`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`A function`}),`: Dynamically determine the directory based on environment`,`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`The function receives `,(0,c.jsx)(t.code,{children:`{ ci: boolean; platform: string }`}),` as context`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`ci`}),`: Whether the code is running in a CI environment`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`platform`}),`: The platform string (e.g., 'linux', 'darwin', 'win32')`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`undefined`}),`: Use the default snapshot root directory`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`snapshotsubpath`,children:`snapshotSubpath`}),`
`,(0,c.jsx)(t.p,{children:`Transform the default snapshot subdirectory path to match your project structure. This is useful when you want to customize how story file paths are organized in your snapshot directory.`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Receives `,(0,c.jsx)(t.code,{children:`{ subpath: string }`}),` as options`]}),`
`,(0,c.jsx)(t.li,{children:`Returns a transformed subpath string`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`usage-examples`,children:`Usage Examples`}),`
`,(0,c.jsx)(t.h3,{id:`store-snapshots-in-a-custom-directory`,children:`Store Snapshots in a Custom Directory`}),`
`,(0,c.jsx)(t.p,{children:`To store all snapshots in a specific directory, specify a static path:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`import { defineStorybookVisOptions } from '@repobuddy/storybook-addon-vis/server/vis_options'

const options = defineStorybookVisOptions({
	visProjects: [
		{
			snapshotRootDir: '__vis__/snapshots',
		},
	],
})
`})}),`
`,(0,c.jsx)(t.h3,{id:`use-different-directories-for-ci-and-local-development`,children:`Use Different Directories for CI and Local Development`}),`
`,(0,c.jsx)(t.p,{children:`If you want snapshots stored in different locations depending on whether you're running in CI or locally, use a function that checks the environment:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`import { defineStorybookVisOptions } from '@repobuddy/storybook-addon-vis/server/vis_options'

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
`,(0,c.jsx)(t.h3,{id:`customize-snapshot-subdirectory-structure`,children:`Customize Snapshot Subdirectory Structure`}),`
`,(0,c.jsxs)(t.p,{children:[`To transform the default snapshot subpath (for example, to remove a `,(0,c.jsx)(t.code,{children:`src/`}),` prefix from your file paths), provide a `,(0,c.jsx)(t.code,{children:`snapshotSubpath`}),` function:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`import { defineStorybookVisOptions } from '@repobuddy/storybook-addon-vis/server/vis_options'

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
`,(0,c.jsx)(t.h3,{id:`organize-snapshots-across-multiple-projects`,children:`Organize Snapshots Across Multiple Projects`}),`
`,(0,c.jsx)(t.p,{children:`When you have multiple visual testing projects (for example, separate projects for components and pages), configure each with its own snapshot directory and path structure:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`import { defineStorybookVisOptions } from '@repobuddy/storybook-addon-vis/server/vis_options'

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
`,(0,c.jsx)(t.h3,{id:`use-default-configuration`,children:`Use Default Configuration`}),`
`,(0,c.jsx)(t.p,{children:`To use the default snapshot root directory and subpath, provide an empty project configuration:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`import { defineStorybookVisOptions } from '@repobuddy/storybook-addon-vis/server/vis_options'

const options = defineStorybookVisOptions({
	visProjects: [{}],
})
`})}),`
`,(0,c.jsx)(t.h2,{id:`understanding-snapshot-path-structure`,children:`Understanding Snapshot Path Structure`}),`
`,(0,c.jsx)(t.p,{children:`To understand where your snapshots will be stored, the final snapshot path is constructed as:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`<snapshotRootDir>/<baseline|diff|results>/<snapshotSubpath>/<task-id>-<variant>.png
`})}),`
`,(0,c.jsx)(t.p,{children:`Where:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`snapshotRootDir`}),` is determined by the `,(0,c.jsx)(t.code,{children:`snapshotRootDir`}),` option`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`snapshotSubpath`}),` is the result of the `,(0,c.jsx)(t.code,{children:`snapshotSubpath`}),` function (or default)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`task-id`}),` is derived from the story name`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`variant`}),` identifies the specific snapshot variant`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`related`,children:`Related`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`/docs/storybook-addon-vis-server-create-storybook-vis-server--docs`,children:`createStorybookVisServer`}),` - Server implementation that uses these options`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`/docs/storybook-addon-vis-overview--docs`,children:`Storybook Visual Testing Overview`}),` - General overview of the addon`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=r(),a(),t()}))();export{s as default};