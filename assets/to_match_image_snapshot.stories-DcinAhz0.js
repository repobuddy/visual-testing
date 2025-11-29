import{R as a}from"./iframe-fTt469q7.js";import"./setup-BWgIDtv--DD7uLTEt.js";import"./task_id-DnS9_4Ub-C-aZNWRk.js";import{p as r}from"./vitest_proxy-BLs0Du1Q.js";import"./preload-helper-PPVm8Dsz.js";import"./context-Beh5KHTz.js";import"./utils.DvEY5TfP-COIdXPbh.js";const c={title:"page/toMatchImageSnapshot"},e={render:()=>a.createElement("div",{style:{height:"1000px",backgroundColor:"greenyellow"}},"hello world"),async play(){await r.toMatchImageSnapshot({fullPage:!0})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const i=["FullPage"];export{e as FullPage,i as __namedExportsOrder,c as default};
