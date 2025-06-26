import{r as C,j as e,i as J,R as F,x as M,w as Y,k as G,Y as H,T as K,I as L,l as Q}from"./iframe-B_cy3Fgk.js";import"./vitest_suite_proxy-BAYpTgRR.js";const W="__vis__",$=C.memo(function({active:t,snapshotResults:g=[],onRefresh:V}){const q=g.reduce((n,s)=>{const d=`(${s.snapshotRootDir.slice(W.length+1)}) ${s.fileName}`;return n[d]=[...n[d]??[],s],n},{});return e.jsx(J,{active:t,children:g.length>0?e.jsx(F,{vertical:!0,children:Object.entries(q).map(([n,s])=>e.jsx("div",{children:s.some(o=>o.type==="diff")?e.jsxs(e.Fragment,{children:[e.jsx(A,{failed:!0,children:n}),s.map(o=>e.jsx("img",{src:`data:image/png;base64,${o.base64}`,alt:o.fileName},o.filePath))]}):e.jsxs(e.Fragment,{children:[e.jsxs(A,{children:[e.jsx("span",{children:n}),e.jsx(Y,{onClick:()=>V(),children:e.jsx(G,{})})]}),e.jsx("img",{src:`data:image/png;base64,${s[0].base64}`,alt:s[0].fileName},s[0].filePath)]})},n))}):e.jsx(H,{children:"There is no snapshots for this story"})})}),A=M.div(({theme:a,failed:t})=>({display:"flex",alignItems:"center",gap:"0.5rem",paddingBlock:"0.5rem",paddingInline:"0.2rem",backgroundColor:t?a.background.negative:a.background.positive,color:a.barTextColor}));$.__docgenInfo={description:"",methods:[],displayName:"VisPanel",props:{active:{required:!0,tsType:{name:"boolean"},description:""},snapshotResults:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
	filePath: string
	fileName: string
	snapshotRootDir: string
	type: 'baseline' | 'diff' | 'result'
	base64: string
}`,signature:{properties:[{key:"filePath",value:{name:"string",required:!0}},{key:"fileName",value:{name:"string",required:!0}},{key:"snapshotRootDir",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:"'baseline' | 'diff' | 'result'",elements:[{name:"literal",value:"'baseline'"},{name:"literal",value:"'diff'"},{name:"literal",value:"'result'"}],required:!0}},{key:"base64",value:{name:"string",required:!0}}]}}],raw:"ImageSnapshotResults[]"},description:"",defaultValue:{value:"[]",computed:!1}},onRefresh:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const{fn:i}=__STORYBOOK_MODULE_TEST__,r="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",z="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",se={title:"Components/VisPanel",tags:["internal","!test"],component:$,parameters:{layout:"fullscreen"},decorators:[a=>e.jsx(K,{theme:L(Q.dark),children:e.jsx(a,{})})],argTypes:{active:{control:"boolean",description:"Whether the panel is active"},snapshotResults:{control:"object",description:"Array of image snapshot results"},onRefresh:{description:"Callback function when refresh button is clicked"}}},f=[{filePath:"/path/to/snapshots/button-baseline.png",fileName:"button-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:r},{filePath:"/path/to/snapshots/card-baseline.png",fileName:"card-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:r}],U=[{filePath:"/path/to/snapshots/button-baseline.png",fileName:"button-baseline.png",snapshotRootDir:"/path/to/snapshots",type:"baseline",base64:r},{filePath:"/path/to/snapshots/button-diff.png",fileName:"button-diff.png",snapshotRootDir:"/path/to/snapshots",type:"diff",base64:z},{filePath:"/path/to/snapshots/button-result.png",fileName:"button-result.png",snapshotRootDir:"/path/to/snapshots",type:"result",base64:r}],X=[...f,...U,{filePath:"/path/to/snapshots/modal-baseline.png",fileName:"modal-baseline.png",snapshotRootDir:"/path/to/snapshots/components",type:"baseline",base64:r}],p={args:{active:!0,snapshotResults:[],onRefresh:i()}},l={args:{active:!0,snapshotResults:f,onRefresh:i()}},c={args:{active:!0,snapshotResults:U,onRefresh:i()}},h={args:{active:!0,snapshotResults:X,onRefresh:i()}},u={args:{active:!1,snapshotResults:f,onRefresh:i()}},m={args:{active:!0,snapshotResults:Array.from({length:20},(a,t)=>({filePath:`/path/to/snapshots/component-${t}-baseline.png`,fileName:`component-${t}-baseline.png`,snapshotRootDir:`/path/to/snapshots/suite-${Math.floor(t/5)}`,type:"baseline",base64:r})),onRefresh:i()}};var R,b,v;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: [],
    onRefresh: fn()
  }
}`,...(v=(b=p.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var y,S,x;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: successfulSnapshots,
    onRefresh: fn()
  }
}`,...(x=(S=l.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var P,j,k;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: failedSnapshots,
    onRefresh: fn()
  }
}`,...(k=(j=c.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var N,D,_;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    active: true,
    snapshotResults: mixedSnapshots,
    onRefresh: fn()
  }
}`,...(_=(D=h.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};var E,I,w;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    active: false,
    snapshotResults: successfulSnapshots,
    onRefresh: fn()
  }
}`,...(w=(I=u.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var T,B,O;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(O=(B=m.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};const ae=["EmptyState","SuccessfulSnapshots","FailedSnapshots","MixedResults","InactivePanel","LargeDataset"];export{p as EmptyState,c as FailedSnapshots,u as InactivePanel,m as LargeDataset,h as MixedResults,l as SuccessfulSnapshots,ae as __namedExportsOrder,se as default};
