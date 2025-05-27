import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{f as i}from"./index-CB-nUy61.js";import{n as U,S as J,v as O,V as M,R as G,c as H,E as Y,F as K,_ as L}from"./index-hfhMq73W.js";import{r as Q}from"./index-BlmOqGMO.js";import"./vitest_suite_proxy-Cs0Xx2SU.js";import"./index-yBjzXJbu.js";import"./index-fNjTmf9T.js";import"./iframe-CkrkBDBo.js";const W="__vis__",q=Q.memo(function({active:a,snapshotResults:g=[],onRefresh:F}){const T=g.reduce((n,s)=>{const d=`(${s.snapshotRootDir.slice(W.length+1)}) ${s.fileName}`;return n[d]=[...n[d]??[],s],n},{});return e.jsx(U,{active:a,children:g.length>0?e.jsx(J,{vertical:!0,children:Object.entries(T).map(([n,s])=>e.jsx("div",{children:s.some(o=>o.type==="diff")?e.jsxs(e.Fragment,{children:[e.jsx(A,{failed:!0,children:n}),s.map(o=>e.jsx("img",{src:`data:image/png;base64,${o.base64}`,alt:o.fileName},o.filePath))]}):e.jsxs(e.Fragment,{children:[e.jsxs(A,{children:[e.jsx("span",{children:n}),e.jsx(M,{onClick:()=>F(),children:e.jsx(G,{})})]}),e.jsx("img",{src:`data:image/png;base64,${s[0].base64}`,alt:s[0].fileName},s[0].filePath)]})},n))}):e.jsx(H,{children:"There is no snapshots for this story"})})}),A=O.div(({theme:t,failed:a})=>({display:"flex",alignItems:"center",gap:"0.5rem",paddingBlock:"0.5rem",paddingInline:"0.2rem",backgroundColor:a?t.background.negative:t.background.positive,color:t.barTextColor}));q.__docgenInfo={description:"",methods:[],displayName:"VisPanel",props:{active:{required:!0,tsType:{name:"boolean"},description:""},snapshotResults:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
	filePath: string
	fileName: string
	snapshotRootDir: string
	type: 'baseline' | 'diff' | 'result'
	base64: string
}`,signature:{properties:[{key:"filePath",value:{name:"string",required:!0}},{key:"fileName",value:{name:"string",required:!0}},{key:"snapshotRootDir",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:"'baseline' | 'diff' | 'result'",elements:[{name:"literal",value:"'baseline'"},{name:"literal",value:"'diff'"},{name:"literal",value:"'result'"}],required:!0}},{key:"base64",value:{name:"string",required:!0}}]}}],raw:"ImageSnapshotResults[]"},description:"",defaultValue:{value:"[]",computed:!1}},onRefresh:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const r="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",z="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",ie={title:"Components/VisPanel",tags:["internal","!test"],component:q,parameters:{layout:"fullscreen"},decorators:[t=>e.jsx(Y,{theme:K(L.dark),children:e.jsx(t,{})})],argTypes:{active:{control:"boolean",description:"Whether the panel is active"},snapshotResults:{control:"object",description:"Array of image snapshot results"},onRefresh:{description:"Callback function when refresh button is clicked"}}},f=[{filePath:"/path/to/snapshots/button-baseline.png",fileName:"button-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:r},{filePath:"/path/to/snapshots/card-baseline.png",fileName:"card-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:r}],C=[{filePath:"/path/to/snapshots/button-baseline.png",fileName:"button-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:r},{filePath:"/path/to/snapshots/button-diff.png",fileName:"button-diff.png",snapshotRootDir:"/path/to/snapshots",type:"diff",base64:z},{filePath:"/path/to/snapshots/button-result.png",fileName:"button-result.png",snapshotRootDir:"/path/to/snapshots",type:"result",base64:r}],X=[...f,...C,{filePath:"/path/to/snapshots/modal-baseline.png",fileName:"modal-baseline.png",snapshotRootDir:"/path/to/snapshots/components",type:"baseline",base64:r}],p={args:{active:!0,snapshotResults:[],onRefresh:i()}},l={args:{active:!0,snapshotResults:f,onRefresh:i()}},c={args:{active:!0,snapshotResults:C,onRefresh:i()}},h={args:{active:!0,snapshotResults:X,onRefresh:i()}},u={args:{active:!1,snapshotResults:f,onRefresh:i()}},m={args:{active:!0,snapshotResults:Array.from({length:20},(t,a)=>({filePath:`/path/to/snapshots/component-${a}-baseline.png`,fileName:`component-${a}-baseline.png`,snapshotRootDir:`/path/to/snapshots/suite-${Math.floor(a/5)}`,type:"baseline",base64:r})),onRefresh:i()}};var b,R,v;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: [],
    onRefresh: fn()
  }
}`,...(v=(R=p.parameters)==null?void 0:R.docs)==null?void 0:v.source}}};var y,S,x;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: successfulSnapshots,
    onRefresh: fn()
  }
}`,...(x=(S=l.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var P,j,N;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: failedSnapshots,
    onRefresh: fn()
  }
}`,...(N=(j=c.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var k,D,E;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: mixedSnapshots,
    onRefresh: fn()
  }
}`,...(E=(D=h.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var _,I,w;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    active: false,
    snapshotResults: successfulSnapshots,
    onRefresh: fn()
  }
}`,...(w=(I=u.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var B,V,$;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...($=(V=m.parameters)==null?void 0:V.docs)==null?void 0:$.source}}};const pe=["EmptyState","SuccessfulSnapshots","FailedSnapshots","MixedResults","InactivePanel","LargeDataset"];export{p as EmptyState,c as FailedSnapshots,u as InactivePanel,m as LargeDataset,h as MixedResults,l as SuccessfulSnapshots,pe as __namedExportsOrder,ie as default};
