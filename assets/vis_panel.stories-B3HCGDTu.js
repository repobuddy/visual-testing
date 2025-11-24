import{r as g,e,v as S,E as k,x as P,S as N,i as w,T as D,I as _,k as I}from"./iframe-4keGAOXU.js";import"./vitest_suite_proxy-9KiR1lGe.js";import"./preload-helper-PPVm8Dsz.js";const x="__vis__";var T=g.forwardRef(({color:t="currentColor",size:s=14,...l},d)=>g.createElement("svg",{width:s,height:s,viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:d,...l},g.createElement("path",{d:"M7.092.5H7a6.5 6.5 0 106.41 7.583.5.5 0 10-.986-.166A5.495 5.495 0 017 12.5a5.5 5.5 0 010-11h.006a5.5 5.5 0 014.894 3H10a.5.5 0 000 1h3a.5.5 0 00.5-.5V2a.5.5 0 00-1 0v1.535A6.495 6.495 0 007.092.5z",fill:t})));const v=g.memo(function({active:s,snapshotResults:l=[],onRefresh:d}){const E=l.reduce((n,a)=>{const b=`(${a.snapshotRootDir.slice(x.length+1)}) ${a.fileName}`;return n[b]=[...n[b]??[],a],n},{});return e.createElement(S,{active:s},l.length>0?e.createElement(k,{vertical:!0},Object.entries(E).map(([n,a])=>e.createElement("div",{key:n},a.some(r=>r.type==="diff")?e.createElement(e.Fragment,null,e.createElement(R,{failed:!0},n),a.map(r=>e.createElement("img",{key:r.filePath,src:`data:image/png;base64,${r.base64}`,alt:r.fileName}))):e.createElement(e.Fragment,null,e.createElement(R,null,e.createElement("span",null,n),e.createElement(N,{onClick:()=>d()},e.createElement(T,null))),e.createElement("img",{key:a[0].filePath,src:`data:image/png;base64,${a[0].base64}`,alt:a[0].fileName}))))):e.createElement(w,null,"There is no snapshots for this story"))}),R=P.div(({theme:t,failed:s})=>({display:"flex",alignItems:"center",gap:"0.5rem",paddingBlock:"0.5rem",paddingInline:"0.2rem",backgroundColor:s?t.background.negative:t.background.positive,color:t.barTextColor}));v.__docgenInfo={description:"",methods:[],displayName:"VisPanel",props:{active:{required:!0,tsType:{name:"boolean"},description:""},snapshotResults:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
	filePath: string
	fileName: string
	snapshotRootDir: string
	type: 'baseline' | 'diff' | 'result'
	base64: string
}`,signature:{properties:[{key:"filePath",value:{name:"string",required:!0}},{key:"fileName",value:{name:"string",required:!0}},{key:"snapshotRootDir",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:"'baseline' | 'diff' | 'result'",elements:[{name:"literal",value:"'baseline'"},{name:"literal",value:"'diff'"},{name:"literal",value:"'result'"}],required:!0}},{key:"base64",value:{name:"string",required:!0}}]}}],raw:"ImageSnapshotResults[]"},description:"",defaultValue:{value:"[]",computed:!1}},onRefresh:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const{fn:i}=__STORYBOOK_MODULE_TEST__,o="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",B="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",U={title:"Components/VisPanel",tags:["internal","!test"],component:v,parameters:{layout:"fullscreen"},decorators:[t=>e.createElement(D,{theme:_(I.dark)},e.createElement(t,null))],argTypes:{active:{control:"boolean",description:"Whether the panel is active"},snapshotResults:{control:"object",description:"Array of image snapshot results"},onRefresh:{description:"Callback function when refresh button is clicked"}}},A=[{filePath:"/path/to/snapshots/button-baseline.png",fileName:"button-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:o},{filePath:"/path/to/snapshots/card-baseline.png",fileName:"card-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:o}],y=[{filePath:"/path/to/snapshots/button-baseline.png",fileName:"button-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:o},{filePath:"/path/to/snapshots/button-diff.png",fileName:"button-diff.png",snapshotRootDir:"/path/to/snapshots",type:"diff",base64:B},{filePath:"/path/to/snapshots/button-result.png",fileName:"button-result.png",snapshotRootDir:"/path/to/snapshots",type:"result",base64:o}],O=[...A,...y,{filePath:"/path/to/snapshots/modal-baseline.png",fileName:"modal-baseline.png",snapshotRootDir:"/path/to/snapshots/components",type:"baseline",base64:o}],p={args:{active:!0,snapshotResults:[],onRefresh:i()}},c={args:{active:!0,snapshotResults:A,onRefresh:i()}},u={args:{active:!0,snapshotResults:y,onRefresh:i()}},h={args:{active:!0,snapshotResults:O,onRefresh:i()}},m={args:{active:!1,snapshotResults:A,onRefresh:i()}},f={args:{active:!0,snapshotResults:Array.from({length:20},(t,s)=>({filePath:`/path/to/snapshots/component-${s}-baseline.png`,fileName:`component-${s}-baseline.png`,snapshotRootDir:`/path/to/snapshots/suite-${Math.floor(s/5)}`,type:"baseline",base64:o})),onRefresh:i()}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: [],
    onRefresh: fn()
  }
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: successfulSnapshots,
    onRefresh: fn()
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: failedSnapshots,
    onRefresh: fn()
  }
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: mixedSnapshots,
    onRefresh: fn()
  }
}`,...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    active: false,
    snapshotResults: successfulSnapshots,
    onRefresh: fn()
  }
}`,...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};const q=["EmptyState","SuccessfulSnapshots","FailedSnapshots","MixedResults","InactivePanel","LargeDataset"];export{p as EmptyState,u as FailedSnapshots,m as InactivePanel,f as LargeDataset,h as MixedResults,c as SuccessfulSnapshots,q as __namedExportsOrder,U as default};
