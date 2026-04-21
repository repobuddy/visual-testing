import{n as e}from"./chunk-BneVvdWh.js";import{c as t,s as n}from"./blocks-pk6s6g-r.js";import{a as r}from"./chunk-RD3KTAHR-C3fY6nk_.js";import{r as i}from"./react-D3_z09Pp.js";import{t as a}from"./mdx-react-shim-DMzzWKkY.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,p:`p`,pre:`pre`,...i(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{title:`Releases/Migrating to 1.0`}),`
`,(0,c.jsx)(t.h1,{id:`migrating-to-10`,children:`Migrating to 1.0`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.a,{href:`https://www.npmjs.com/package/storybook-addon-vis`,rel:`nofollow`,children:`storybook-addon-vis`}),` 1.0 has made some major improvements over the previous version. Along with the new features, there are some breaking changes.`]}),`
`,(0,c.jsxs)(t.p,{children:[`🗒️ `,(0,c.jsx)(t.a,{href:`https://www.npmjs.com/package/storybook-addon-vis`,rel:`nofollow`,children:`storybook-addon-vis`}),` 1.0 supports Storybook 8.
For Storybook 9, please use 2.x.`]}),`
`,(0,c.jsx)(t.p,{children:`⚠️ Snapshot folder structure customization has changed.`}),`
`,(0,c.jsxs)(t.p,{children:[`In previous version,
you can customize the snapshot folder structure with the `,(0,c.jsx)(t.code,{children:`snapshotRootDir`}),`, `,(0,c.jsx)(t.code,{children:`customizeSnapshotSubpath`}),`, and `,(0,c.jsx)(t.code,{children:`customizeSnapshotId`}),` options to the `,(0,c.jsx)(t.code,{children:`storybookVis`}),` function.`]}),`
`,(0,c.jsxs)(t.p,{children:[`In 1.0,
the options are changed to `,(0,c.jsx)(t.code,{children:`snapshotRootDir`}),`, `,(0,c.jsx)(t.code,{children:`snapshotSubpath`}),`, and `,(0,c.jsx)(t.code,{children:`snapshotKey`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[`The biggest change is that the `,(0,c.jsx)(t.code,{children:`snapshotKey`}),` now only allows you to specify a string that is used at the end of the snapshot file name.
See `,(0,c.jsx)(t.a,{href:`https://github.com/repobuddy/visual-testing?tab=readme-ov-file#customizing-snapshot-path`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`vitest-plugin-vis`})}),` for more details.`]}),`
`,(0,c.jsxs)(t.p,{children:[`⚠️ `,(0,c.jsx)(t.code,{children:`storybook-addon-vis/preview`}),` is moved to `,(0,c.jsx)(t.code,{children:`storybook-addon-vis/vitest-setup`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[`In previous version,
you import the `,(0,c.jsx)(t.code,{children:`visAnnotations`}),` from `,(0,c.jsx)(t.code,{children:`storybook-addon-vis/preview`}),` and add it to your `,(0,c.jsx)(t.code,{children:`vitest.setup.ts`}),`, and use the `,(0,c.jsx)(t.code,{children:`vis`}),` object from `,(0,c.jsx)(t.code,{children:`storybook-addon-vis/vitest-setup`}),` to add the preset:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`import * as visAnnotations from 'storybook-addon-vis/preview'
import { vis } from 'storybook-addon-vis/vitest-setup'

const project = setProjectAnnotations([
	visAnnotations, // add this
	projectAnnotations
])

vis.presets.enable()
`})}),`
`,(0,c.jsx)(t.p,{children:`In 1.0,
they are combined:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`import { vis, visAnnotations } from 'storybook-addon-vis/vitest-setup'

const project = setProjectAnnotations([
	visAnnotations, // add this
	projectAnnotations
])

vis.setup()
`})})]})}function s(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=r(),a(),t()}))();export{s as default};