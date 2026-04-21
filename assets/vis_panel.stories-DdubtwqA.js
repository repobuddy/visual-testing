import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-BeWxJaLi.js";import{c as r,n as i,p as a,t as o,x as s}from"./theming-BZWG21x-.js";import{n as c}from"./chunk-RD3KTAHR-C3fY6nk_.js";import{Dt as l,at as u,bt as d,k as f,o as p,r as m}from"./components-D1XmTNET.js";import{o as h,t as g}from"./client-api-B_vqBlHr.js";var _,v,y,b=t((()=>{l(),_=e(n(),1),u(),r(),g(),v=(0,_.memo)(function({active:e,getSnapshotResults:t,onRefresh:n}){let[r,i]=(0,_.useState)([]);(0,_.useEffect)(()=>{t().then(i)},[t]);let a=r.reduce((e,t)=>{let n=`(${t.snapshotRootDir.slice(h.length+1)}) ${t.fileName}`;return e[n]=[...e[n]??[],t],e},{});return _.createElement(m,{active:e},r.length>0?_.createElement(c,{vertical:!0},Object.entries(a).map(([e,r])=>_.createElement(`div`,{key:e},r.some(e=>e.type===`diff`)?_.createElement(_.Fragment,null,_.createElement(y,{failed:!0},e),r.map(e=>_.createElement(`img`,{key:e.filePath,src:`data:image/png;base64,${e.base64}`,alt:e.fileName}))):_.createElement(_.Fragment,null,_.createElement(y,null,_.createElement(`span`,null,e),_.createElement(p,{"aria-label":`Reload snapshot`,onClick:()=>{n(),t().then(i)}},_.createElement(d,null))),_.createElement(`img`,{key:r[0].filePath,src:`data:image/png;base64,${r[0].base64}`,alt:r[0].fileName}))))):_.createElement(f,null,`There is no snapshots for this story`))}),y=a.div(({theme:e,failed:t})=>({display:`flex`,alignItems:`center`,gap:`0.5rem`,paddingBlock:`0.5rem`,paddingInline:`0.2rem`,backgroundColor:t?e.background.negative:e.background.positive,color:e.barTextColor})),v.__docgenInfo={description:``,methods:[],displayName:`VisPanel`,props:{active:{required:!0,tsType:{name:`boolean`},description:``},getSnapshotResults:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => Promise<ImageSnapshotResults[]>`,signature:{arguments:[],return:{name:`Promise`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
	filePath: string
	fileName: string
	snapshotRootDir: string
	type: 'baseline' | 'diff' | 'result'
	base64: string
}`,signature:{properties:[{key:`filePath`,value:{name:`string`,required:!0}},{key:`fileName`,value:{name:`string`,required:!0}},{key:`snapshotRootDir`,value:{name:`string`,required:!0}},{key:`type`,value:{name:`union`,raw:`'baseline' | 'diff' | 'result'`,elements:[{name:`literal`,value:`'baseline'`},{name:`literal`,value:`'diff'`},{name:`literal`,value:`'result'`}],required:!0}},{key:`base64`,value:{name:`string`,required:!0}}]}}],raw:`ImageSnapshotResults[]`}],raw:`Promise<ImageSnapshotResults[]>`}}},description:``},onRefresh:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;t((()=>{x=e(n(),1),r(),b(),{fn:S}=__STORYBOOK_MODULE_TEST__,C=`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`,w=`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`,T={title:`Components/VisPanel`,tags:[`internal`,`!test`],component:v,parameters:{layout:`fullscreen`},decorators:[e=>x.createElement(o,{theme:i(s.dark)},x.createElement(e,null))],argTypes:{active:{control:`boolean`,description:`Whether the panel is active`},onRefresh:{description:`Callback function when refresh button is clicked`}}},E=[{filePath:`/path/to/snapshots/button-baseline.png`,fileName:`button-baseline.png`,snapshotRootDir:`/path/to/snapshots`,type:`baseline`,base64:C},{filePath:`/path/to/snapshots/card-baseline.png`,fileName:`card-baseline.png`,snapshotRootDir:`/path/to/snapshots`,type:`baseline`,base64:C}],D=[{filePath:`/path/to/snapshots/button-baseline.png`,fileName:`button-baseline.png`,snapshotRootDir:`/path/to/snapshots`,type:`baseline`,base64:C},{filePath:`/path/to/snapshots/button-diff.png`,fileName:`button-diff.png`,snapshotRootDir:`/path/to/snapshots`,type:`diff`,base64:w},{filePath:`/path/to/snapshots/button-result.png`,fileName:`button-result.png`,snapshotRootDir:`/path/to/snapshots`,type:`result`,base64:C}],O=[...E,...D,{filePath:`/path/to/snapshots/modal-baseline.png`,fileName:`modal-baseline.png`,snapshotRootDir:`/path/to/snapshots/components`,type:`baseline`,base64:C}],k={args:{active:!0,getSnapshotResults:async()=>[],onRefresh:S()}},A={args:{active:!0,getSnapshotResults:async()=>E,onRefresh:S()}},j={args:{active:!0,getSnapshotResults:async()=>D,onRefresh:S()}},M={args:{active:!0,getSnapshotResults:async()=>O,onRefresh:S()}},N={args:{active:!1,getSnapshotResults:async()=>E,onRefresh:S()}},P={args:{active:!0,getSnapshotResults:async()=>Array.from({length:20},(e,t)=>({filePath:`/path/to/snapshots/component-${t}-baseline.png`,fileName:`component-${t}-baseline.png`,snapshotRootDir:`/path/to/snapshots/suite-${Math.floor(t/5)}`,type:`baseline`,base64:C})),onRefresh:S()}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    getSnapshotResults: async () => [],
    onRefresh: fn()
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    getSnapshotResults: async () => successfulSnapshots,
    onRefresh: fn()
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    getSnapshotResults: async () => failedSnapshots,
    onRefresh: fn()
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    getSnapshotResults: async () => mixedSnapshots,
    onRefresh: fn()
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    active: false,
    getSnapshotResults: async () => successfulSnapshots,
    onRefresh: fn()
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    getSnapshotResults: async () => Array.from({
      length: 20
    }, (_, i) => ({
      filePath: \`/path/to/snapshots/component-\${i}-baseline.png\`,
      fileName: \`component-\${i}-baseline.png\`,
      snapshotRootDir: \`/path/to/snapshots/suite-\${Math.floor(i / 5)}\`,
      type: 'baseline' as const,
      base64: mockBase64Image
    })),
    onRefresh: fn()
  }
}`,...P.parameters?.docs?.source}}},F=[`EmptyState`,`SuccessfulSnapshots`,`FailedSnapshots`,`MixedResults`,`InactivePanel`,`LargeDataset`]}))();export{k as EmptyState,j as FailedSnapshots,N as InactivePanel,P as LargeDataset,M as MixedResults,A as SuccessfulSnapshots,F as __namedExportsOrder,T as default};