import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{t as r}from"./src-C3PapjLw.js";import{t as i}from"./param-DUcmc-bP.js";var a,o,s,c,l;function u(){return(u=t((()=>{a=e(n(),1),r(),o={title:`Auto Snapshot`,tags:[`snapshot`]},s={render:()=>a.createElement(`div`,{className:`flex flex-col gap-2`},a.createElement(`div`,{"data-testid":`subject`},`subject`),a.createElement(`div`,{className:`text-red-500`},`This will not be captured`))},c={parameters:i({fullPage:!0}),render:()=>a.createElement(`div`,{style:{width:`1500px`,height:`1000px`,display:`flex`,flexDirection:`column`}},a.createElement(`div`,{style:{flex:1,backgroundColor:`greenyellow`}},`The whole page is captured`),a.createElement(`div`,{style:{flex:1,backgroundColor:`cornflowerblue`,textAlign:`right`}},`including the bottom right`))},l=[`CaptureSubjectOnly`,`FullPage`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
            <div data-testid="subject">subject</div>
            <div className="text-red-500">This will not be captured</div>
        </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: defineAutoSnapshotParam({
    fullPage: true
  }),
  render: () => <div style={{
    width: '1500px',
    height: '1000px',
    display: 'flex',
    flexDirection: 'column'
  }}>
            <div style={{
      flex: 1,
      backgroundColor: 'greenyellow'
    }}>The whole page is captured</div>
            <div style={{
      flex: 1,
      backgroundColor: 'cornflowerblue',
      textAlign: 'right'
    }}>including the bottom right</div>
        </div>
}`,...c.parameters?.docs?.source}}}})))()}u();export{s as CaptureSubjectOnly,c as FullPage,l as __namedExportsOrder,o as default};