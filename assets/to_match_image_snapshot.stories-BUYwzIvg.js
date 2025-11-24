import{e as a}from"./iframe-4keGAOXU.js";import"./expect_extend-FtcPQ5gz.js";import{p as r}from"./vitest_proxy-DfSGK9A5.js";import"./vitest_suite_proxy-9KiR1lGe.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"page/toMatchImageSnapshot"},e={render:()=>a.createElement("div",{style:{height:"1000px",backgroundColor:"greenyellow"}},"hello world"),async play(){await r.toMatchImageSnapshot({fullPage:!0})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
