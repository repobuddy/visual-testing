import{R as a}from"./iframe-u6-CEdIB.js";import"./index-BaUZKKEa.js";import{p as r}from"./vitest_proxy-Bun20mPO.js";import"./preload-helper-PPVm8Dsz.js";import"./auto_snapshot_matcher-C0y6mAeS-C5TWWM2Q.js";const p={title:"page/toMatchImageSnapshot"},e={render:()=>a.createElement("div",{style:{height:"1000px",backgroundColor:"greenyellow"}},"hello world"),async play(){await r.toMatchImageSnapshot({fullPage:!0})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
