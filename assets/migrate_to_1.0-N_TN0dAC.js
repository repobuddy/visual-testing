import{i as e}from"./preload-helper-xPQekRTU.js";import{d as t,k as n,o as r,s as i}from"./iframe-CeUp86I-.js";import{t as a}from"./mdx-react-shim-CmBBfeFi.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,p:`p`,pre:`pre`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Releases/Migrating to 1.0`}),`
`,(0,c.jsx)(n.h1,{id:`migrating-to-10`,children:`Migrating to 1.0`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.a,{href:`https://www.npmjs.com/package/storybook-addon-vis`,rel:`nofollow`,children:`storybook-addon-vis`}),` 1.0 has made some major improvements over the previous version. Along with the new features, there are some breaking changes.`]}),`
`,(0,c.jsxs)(n.p,{children:[`🗒️ `,(0,c.jsx)(n.a,{href:`https://www.npmjs.com/package/storybook-addon-vis`,rel:`nofollow`,children:`storybook-addon-vis`}),` 1.0 supports Storybook 8.
For Storybook 9, please use 2.x.`]}),`
`,(0,c.jsx)(n.p,{children:`⚠️ Snapshot folder structure customization has changed.`}),`
`,(0,c.jsxs)(n.p,{children:[`In previous version,
you can customize the snapshot folder structure with the `,(0,c.jsx)(n.code,{children:`snapshotRootDir`}),`, `,(0,c.jsx)(n.code,{children:`customizeSnapshotSubpath`}),`, and `,(0,c.jsx)(n.code,{children:`customizeSnapshotId`}),` options to the `,(0,c.jsx)(n.code,{children:`storybookVis`}),` function.`]}),`
`,(0,c.jsxs)(n.p,{children:[`In 1.0,
the options are changed to `,(0,c.jsx)(n.code,{children:`snapshotRootDir`}),`, `,(0,c.jsx)(n.code,{children:`snapshotSubpath`}),`, and `,(0,c.jsx)(n.code,{children:`snapshotKey`}),`.`]}),`
`,(0,c.jsxs)(n.p,{children:[`The biggest change is that the `,(0,c.jsx)(n.code,{children:`snapshotKey`}),` now only allows you to specify a string that is used at the end of the snapshot file name.
See `,(0,c.jsx)(n.a,{href:`https://github.com/repobuddy/visual-testing?tab=readme-ov-file#customizing-snapshot-path`,rel:`nofollow`,children:(0,c.jsx)(n.code,{children:`vitest-plugin-vis`})}),` for more details.`]}),`
`,(0,c.jsxs)(n.p,{children:[`⚠️ `,(0,c.jsx)(n.code,{children:`storybook-addon-vis/preview`}),` is moved to `,(0,c.jsx)(n.code,{children:`storybook-addon-vis/vitest-setup`}),`.`]}),`
`,(0,c.jsxs)(n.p,{children:[`In previous version,
you import the `,(0,c.jsx)(n.code,{children:`visAnnotations`}),` from `,(0,c.jsx)(n.code,{children:`storybook-addon-vis/preview`}),` and add it to your `,(0,c.jsx)(n.code,{children:`vitest.setup.ts`}),`, and use the `,(0,c.jsx)(n.code,{children:`vis`}),` object from `,(0,c.jsx)(n.code,{children:`storybook-addon-vis/vitest-setup`}),` to add the preset:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`import * as visAnnotations from 'storybook-addon-vis/preview'
import { vis } from 'storybook-addon-vis/vitest-setup'

const project = setProjectAnnotations([
	visAnnotations, // add this
	projectAnnotations
])

vis.presets.enable()
`})}),`
`,(0,c.jsx)(n.p,{children:`In 1.0,
they are combined:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`import { vis, visAnnotations } from 'storybook-addon-vis/vitest-setup'

const project = setProjectAnnotations([
	visAnnotations, // add this
	projectAnnotations
])

vis.setup()
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=n(),a(),i()}))();export{s as default};