import{R as a}from"./iframe-CL3NB2Xi.js";import"./index-DXJh3lMp.js";import{p as r}from"./vitest_proxy-TpkuxO9w.js";import"./preload-helper-PPVm8Dsz.js";import"./dedent-BAkmgC2z.js";const p={title:"page/toMatchImageSnapshot"},e={render:()=>a.createElement("div",{style:{height:"1000px",backgroundColor:"greenyellow"}},"hello world"),async play(){await r.toMatchImageSnapshot({fullPage:!0})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <div style={{
      height: '1000px',
      backgroundColor: 'greenyellow'
    }}>hello world</div>;
  },
  async play() {
    await page.toMatchImageSnapshot({
      fullPage: true
    });
  }
}`,...e.parameters?.docs?.source}}};const c=["FullPage"];export{e as FullPage,c as __namedExportsOrder,p as default};
