import{j as o}from"./jsx-runtime-Cf8x2fCZ.js";import"./expect_extend-DHxCRvyT.js";import{p as n}from"./vitest_proxy-JAI5XIsJ.js";import"./vitest_suite_proxy-Cbtcj946.js";import"./index-yBjzXJbu.js";import"./index-CB-nUy61.js";import"./iframe-Joza8t-l.js";const d={title:"page/toMatchImageSnapshot"},e={render:()=>o.jsx("div",{style:{height:"1000px",backgroundColor:"greenyellow"},children:"hello world"}),async play(){await n.toMatchImageSnapshot({fullPage:!0})}};var r,t,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(a=(t=e.parameters)==null?void 0:t.docs)==null?void 0:a.source}}};const h=["FullPage"];export{e as FullPage,h as __namedExportsOrder,d as default};
