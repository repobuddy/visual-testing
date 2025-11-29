import{r as S,R as e,q as E,S as P,s as k,I as N,t as D,u as _,T as I,v as T,w}from"./iframe-fTt469q7.js";import"./task_id-DnS9_4Ub-C-aZNWRk.js";import"./preload-helper-PPVm8Dsz.js";const B="__vis__",R=S.memo(function({active:a,snapshotResults:g=[],onRefresh:v}){const y=g.reduce((n,s)=>{const d=`(${s.snapshotRootDir.slice(B.length+1)}) ${s.fileName}`;return n[d]=[...n[d]??[],s],n},{});return e.createElement(E,{active:a},g.length>0?e.createElement(P,{vertical:!0},Object.entries(y).map(([n,s])=>e.createElement("div",{key:n},s.some(o=>o.type==="diff")?e.createElement(e.Fragment,null,e.createElement(A,{failed:!0},n),s.map(o=>e.createElement("img",{key:o.filePath,src:`data:image/png;base64,${o.base64}`,alt:o.fileName}))):e.createElement(e.Fragment,null,e.createElement(A,null,e.createElement("span",null,n),e.createElement(N,{onClick:()=>v()},e.createElement(D,null))),e.createElement("img",{key:s[0].filePath,src:`data:image/png;base64,${s[0].base64}`,alt:s[0].fileName}))))):e.createElement(_,null,"There is no snapshots for this story"))}),A=k.div(({theme:t,failed:a})=>({display:"flex",alignItems:"center",gap:"0.5rem",paddingBlock:"0.5rem",paddingInline:"0.2rem",backgroundColor:a?t.background.negative:t.background.positive,color:t.barTextColor}));R.__docgenInfo={description:"",methods:[],displayName:"VisPanel",props:{active:{required:!0,tsType:{name:"boolean"},description:""},snapshotResults:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
	filePath: string
	fileName: string
	snapshotRootDir: string
	type: 'baseline' | 'diff' | 'result'
	base64: string
}`,signature:{properties:[{key:"filePath",value:{name:"string",required:!0}},{key:"fileName",value:{name:"string",required:!0}},{key:"snapshotRootDir",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:"'baseline' | 'diff' | 'result'",elements:[{name:"literal",value:"'baseline'"},{name:"literal",value:"'diff'"},{name:"literal",value:"'result'"}],required:!0}},{key:"base64",value:{name:"string",required:!0}}]}}],raw:"ImageSnapshotResults[]"},description:"",defaultValue:{value:"[]",computed:!1}},onRefresh:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const{fn:i}=__STORYBOOK_MODULE_TEST__,r="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",O="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",V={title:"Components/VisPanel",tags:["internal","!test"],component:R,parameters:{layout:"fullscreen"},decorators:[t=>e.createElement(I,{theme:T(w.dark)},e.createElement(t,null))],argTypes:{active:{control:"boolean",description:"Whether the panel is active"},snapshotResults:{control:"object",description:"Array of image snapshot results"},onRefresh:{description:"Callback function when refresh button is clicked"}}},f=[{filePath:"/path/to/snapshots/button-baseline.png",fileName:"button-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:r},{filePath:"/path/to/snapshots/card-baseline.png",fileName:"card-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:r}],b=[{filePath:"/path/to/snapshots/button-baseline.png",fileName:"button-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:r},{filePath:"/path/to/snapshots/button-diff.png",fileName:"button-diff.png",snapshotRootDir:"/path/to/snapshots",type:"diff",base64:O},{filePath:"/path/to/snapshots/button-result.png",fileName:"button-result.png",snapshotRootDir:"/path/to/snapshots",type:"result",base64:r}],$=[...f,...b,{filePath:"/path/to/snapshots/modal-baseline.png",fileName:"modal-baseline.png",snapshotRootDir:"/path/to/snapshots/components",type:"baseline",base64:r}],l={args:{active:!0,snapshotResults:[],onRefresh:i()}},p={args:{active:!0,snapshotResults:f,onRefresh:i()}},c={args:{active:!0,snapshotResults:b,onRefresh:i()}},u={args:{active:!0,snapshotResults:$,onRefresh:i()}},m={args:{active:!1,snapshotResults:f,onRefresh:i()}},h={args:{active:!0,snapshotResults:Array.from({length:20},(t,a)=>({filePath:`/path/to/snapshots/component-${a}-baseline.png`,fileName:`component-${a}-baseline.png`,snapshotRootDir:`/path/to/snapshots/suite-${Math.floor(a/5)}`,type:"baseline",base64:r})),onRefresh:i()}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: [],
    onRefresh: fn()
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: successfulSnapshots,
    onRefresh: fn()
  }
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: failedSnapshots,
    onRefresh: fn()
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: mixedSnapshots,
    onRefresh: fn()
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    active: false,
    snapshotResults: successfulSnapshots,
    onRefresh: fn()
  }
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: Array.from({
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
}`,...h.parameters?.docs?.source}}};const C=["EmptyState","SuccessfulSnapshots","FailedSnapshots","MixedResults","InactivePanel","LargeDataset"];export{l as EmptyState,c as FailedSnapshots,m as InactivePanel,h as LargeDataset,u as MixedResults,p as SuccessfulSnapshots,C as __namedExportsOrder,V as default};
