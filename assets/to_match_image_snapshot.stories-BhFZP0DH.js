import{R as a}from"./iframe-DUflMRLr.js";import"./expect_extend-C5HsusUW.js";import{p as r}from"./vitest_proxy-CVKu5iLG.js";import"./task_id-DnS9_4Ub-B23vr0IK.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"page/toMatchImageSnapshot"},e={render:()=>a.createElement("div",{style:{height:"1000px",backgroundColor:"greenyellow"}},"hello world"),async play(){await r.toMatchImageSnapshot({fullPage:!0})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
