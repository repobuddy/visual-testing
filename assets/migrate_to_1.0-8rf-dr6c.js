import{j as o,M as i}from"./iframe-rW3u-Ggr.js";import{useMDXComponents as t}from"./index-BkP_xPAB.js";import"./preload-helper-PPVm8Dsz.js";function n(s){const e={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...t(),...s.components};return o.jsxs(o.Fragment,{children:[o.jsx(i,{title:"Releases/Migrating to 1.0"}),`
`,o.jsx(e.h1,{id:"migrating-to-10",children:"Migrating to 1.0"}),`
`,o.jsxs(e.p,{children:[o.jsx(e.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"})," 1.0 has made some major improvements over the previous version. Along with the new features, there are some breaking changes."]}),`
`,o.jsxs(e.p,{children:["🗒️ ",o.jsx(e.a,{href:"https://www.npmjs.com/package/storybook-addon-vis",rel:"nofollow",children:"storybook-addon-vis"}),` 1.0 supports Storybook 8.
For Storybook 9, please use 2.x.`]}),`
`,o.jsx(e.p,{children:"⚠️ Snapshot folder structure customization has changed."}),`
`,o.jsxs(e.p,{children:[`In previous version,
you can customize the snapshot folder structure with the `,o.jsx(e.code,{children:"snapshotRootDir"}),", ",o.jsx(e.code,{children:"customizeSnapshotSubpath"}),", and ",o.jsx(e.code,{children:"customizeSnapshotId"})," options to the ",o.jsx(e.code,{children:"storybookVis"})," function."]}),`
`,o.jsxs(e.p,{children:[`In 1.0,
the options are changed to `,o.jsx(e.code,{children:"snapshotRootDir"}),", ",o.jsx(e.code,{children:"snapshotSubpath"}),", and ",o.jsx(e.code,{children:"snapshotKey"}),"."]}),`
`,o.jsxs(e.p,{children:["The biggest change is that the ",o.jsx(e.code,{children:"snapshotKey"}),` now only allows you to specify a string that is used at the end of the snapshot file name.
See `,o.jsx(e.a,{href:"https://github.com/repobuddy/visual-testing?tab=readme-ov-file#customizing-snapshot-path",rel:"nofollow",children:o.jsx(e.code,{children:"vitest-plugin-vis"})})," for more details."]}),`
`,o.jsxs(e.p,{children:["⚠️ ",o.jsx(e.code,{children:"storybook-addon-vis/preview"})," is moved to ",o.jsx(e.code,{children:"storybook-addon-vis/vitest-setup"}),"."]}),`
`,o.jsxs(e.p,{children:[`In previous version,
you import the `,o.jsx(e.code,{children:"visAnnotations"})," from ",o.jsx(e.code,{children:"storybook-addon-vis/preview"})," and add it to your ",o.jsx(e.code,{children:"vitest.setup.ts"}),", and use the ",o.jsx(e.code,{children:"vis"})," object from ",o.jsx(e.code,{children:"storybook-addon-vis/vitest-setup"})," to add the preset:"]}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-ts",children:`import * as visAnnotations from 'storybook-addon-vis/preview'
import { vis } from 'storybook-addon-vis/vitest-setup'

const project = setProjectAnnotations([
	visAnnotations, // add this
	projectAnnotations
])

vis.presets.enable()
`})}),`
`,o.jsx(e.p,{children:`In 1.0,
they are combined:`}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-ts",children:`import { vis, visAnnotations } from 'storybook-addon-vis/vitest-setup'

const project = setProjectAnnotations([
	visAnnotations, // add this
	projectAnnotations
])

vis.setup()
`})})]})}function c(s={}){const{wrapper:e}={...t(),...s.components};return e?o.jsx(e,{...s,children:o.jsx(n,{...s})}):n(s)}export{c as default};
