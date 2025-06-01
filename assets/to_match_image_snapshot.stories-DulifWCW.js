import{j as o}from"./iframe-B7ifLxA0.js";import"./expect_extend-CF6vaJJX.js";import{p as n}from"./vitest_proxy-B6anmY2U.js";import"./vitest_suite_proxy-CUgNX56v.js";const g={title:"page/toMatchImageSnapshot"},e={render:()=>o.jsx("div",{style:{height:"1000px",backgroundColor:"greenyellow"},children:"hello world"}),async play(){await n.toMatchImageSnapshot({fullPage:!0})}};var a,r,t;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(t=(r=e.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};const i=["FullPage"];export{e as FullPage,i as __namedExportsOrder,g as default};
