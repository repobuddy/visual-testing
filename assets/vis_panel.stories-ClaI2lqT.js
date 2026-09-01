import{a as e,n as t,r as n}from"./rolldown-runtime-DkW27tQK.js";import{t as r}from"./react-BZJXY1be.js";import{C as i,f as a,q as o,r as s,t as c,z as l}from"./components-bpxdfKk6.js";import{n as u}from"./chunk-W22LQPXL-Dvwv7Jvr.js";import{_ as d,a as f,n as p,t as m,u as h}from"./theming-DRemOCyz.js";import{t as g}from"./client-api-C28qwOri.js";var _;function v(){return(v=t((()=>{_=`__vis__`})))()}var y,b,x;function S(){return(S=t((()=>{o(),y=e(r(),1),i(),f(),g(),b=(0,y.memo)(function({active:e,getSnapshotResults:t,onRefresh:n}){let[r,i]=(0,y.useState)([]);(0,y.useEffect)(()=>{t().then(i)},[t]);let o=r.reduce((e,t)=>{let n=`(${t.snapshotRootDir.slice(_.length+1)}) ${t.fileName}`;return e[n]=[...e[n]??[],t],e},{});return y.createElement(c,{active:e},r.length>0?y.createElement(u,{vertical:!0},Object.entries(o).map(([e,r])=>y.createElement(`div`,{key:e},r.some(e=>e.type===`diff`)?y.createElement(y.Fragment,null,y.createElement(x,{failed:!0},e),r.map(e=>y.createElement(`img`,{key:e.filePath,src:`data:image/png;base64,${e.base64}`,alt:e.fileName}))):y.createElement(y.Fragment,null,y.createElement(x,null,y.createElement(`span`,null,e),y.createElement(s,{"aria-label":`Reload snapshot`,onClick:()=>{n(),t().then(i)}},y.createElement(l,null))),y.createElement(`img`,{key:r[0].filePath,src:`data:image/png;base64,${r[0].base64}`,alt:r[0].fileName}))))):y.createElement(a,null,`There is no snapshots for this story`))}),x=h.div(({theme:e,failed:t})=>({display:`flex`,alignItems:`center`,gap:`0.5rem`,paddingBlock:`0.5rem`,paddingInline:`0.2rem`,backgroundColor:t?e.background.negative:e.background.positive,color:e.barTextColor})),b.__docgenInfo={description:``,methods:[],displayName:`VisPanel`,props:{active:{required:!0,tsType:{name:`boolean`},description:``},getSnapshotResults:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => Promise<ImageSnapshotResults[]>`,signature:{arguments:[],return:{name:`Promise`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
	filePath: string
	fileName: string
	snapshotRootDir: string
	type: 'baseline' | 'diff' | 'result'
	base64: string
}`,signature:{properties:[{key:`filePath`,value:{name:`string`,required:!0}},{key:`fileName`,value:{name:`string`,required:!0}},{key:`snapshotRootDir`,value:{name:`string`,required:!0}},{key:`type`,value:{name:`union`,raw:`'baseline' | 'diff' | 'result'`,elements:[{name:`literal`,value:`'baseline'`},{name:`literal`,value:`'diff'`},{name:`literal`,value:`'result'`}],required:!0}},{key:`base64`,value:{name:`string`,required:!0}}]}}],raw:`ImageSnapshotResults[]`}],raw:`Promise<ImageSnapshotResults[]>`}}},description:``},onRefresh:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var C=n({EmptyState:()=>M,FailedSnapshots:()=>P,InactivePanel:()=>I,LargeDataset:()=>L,MixedResults:()=>F,SuccessfulSnapshots:()=>N,__namedExportsOrder:()=>R,default:()=>O}),w,T,E,D,O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=t((()=>{w=e(r(),1),f(),S(),{fn:T}=__STORYBOOK_MODULE_TEST__,E=`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`,D=`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`,O={title:`Components/VisPanel`,tags:[`internal`,`!test`],component:b,parameters:{layout:`fullscreen`},decorators:[e=>w.createElement(m,{theme:p(d.dark)},w.createElement(e,null))],argTypes:{active:{control:`boolean`,description:`Whether the panel is active`},onRefresh:{description:`Callback function when refresh button is clicked`}}},k=[{filePath:`/path/to/snapshots/button-baseline.png`,fileName:`button-baseline.png`,snapshotRootDir:`/path/to/snapshots`,type:`baseline`,base64:E},{filePath:`/path/to/snapshots/card-baseline.png`,fileName:`card-baseline.png`,snapshotRootDir:`/path/to/snapshots`,type:`baseline`,base64:E}],A=[{filePath:`/path/to/snapshots/button-baseline.png`,fileName:`button-baseline.png`,snapshotRootDir:`/path/to/snapshots`,type:`baseline`,base64:E},{filePath:`/path/to/snapshots/button-diff.png`,fileName:`button-diff.png`,snapshotRootDir:`/path/to/snapshots`,type:`diff`,base64:D},{filePath:`/path/to/snapshots/button-result.png`,fileName:`button-result.png`,snapshotRootDir:`/path/to/snapshots`,type:`result`,base64:E}],j=[...k,...A,{filePath:`/path/to/snapshots/modal-baseline.png`,fileName:`modal-baseline.png`,snapshotRootDir:`/path/to/snapshots/components`,type:`baseline`,base64:E}],M={args:{active:!0,getSnapshotResults:async()=>[],onRefresh:T()}},N={args:{active:!0,getSnapshotResults:async()=>k,onRefresh:T()}},P={args:{active:!0,getSnapshotResults:async()=>A,onRefresh:T()}},F={args:{active:!0,getSnapshotResults:async()=>j,onRefresh:T()}},I={args:{active:!1,getSnapshotResults:async()=>k,onRefresh:T()}},L={args:{active:!0,getSnapshotResults:async()=>Array.from({length:20},(e,t)=>({filePath:`/path/to/snapshots/component-${t}-baseline.png`,fileName:`component-${t}-baseline.png`,snapshotRootDir:`/path/to/snapshots/suite-${Math.floor(t/5)}`,type:`baseline`,base64:E})),onRefresh:T()}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    getSnapshotResults: async () => [],
    onRefresh: fn()
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    getSnapshotResults: async () => successfulSnapshots,
    onRefresh: fn()
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    getSnapshotResults: async () => failedSnapshots,
    onRefresh: fn()
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    getSnapshotResults: async () => mixedSnapshots,
    onRefresh: fn()
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    active: false,
    getSnapshotResults: async () => successfulSnapshots,
    onRefresh: fn()
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R=[`EmptyState`,`SuccessfulSnapshots`,`FailedSnapshots`,`MixedResults`,`InactivePanel`,`LargeDataset`]})))()}export{C as n,v as r,z as t};