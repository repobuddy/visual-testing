import{j as r}from"./jsx-runtime-Cf8x2fCZ.js";import{e as i}from"./index-CB-nUy61.js";import{h as c}from"./has_image_snapshot-C3EMX2XM.js";import"./index-yBjzXJbu.js";import"./vitest_suite_proxy-Cbtcj946.js";import"./iframe-Joza8t-l.js";import"./vitest_proxy-JAI5XIsJ.js";const y={title:"utils/hasImageSnapshot",render:()=>r.jsx("div",{"data-testid":"subject",children:"unit"})},a={loaders:[async()=>({hasImageSnapshot:await c()})],render:(t,{loaded:{hasImageSnapshot:s}})=>r.jsx("div",{"data-testid":"subject",children:String(s)}),play:async({canvas:t})=>{const s=t.getByTestId("subject");i(s).toHaveTextContent("false")}};var e,n,o;a.parameters={...a.parameters,docs:{...(e=a.parameters)==null?void 0:e.docs,source:{originalSource:`{
  // When running in storybook, \`page.hasImageSnapshot\` always returns \`false\`.
  // This is because there is no way to get snapshot information when running in storybook.
  loaders: [async () => ({
    hasImageSnapshot: await hasImageSnapshot()
  })],
  render: (_, {
    loaded: {
      hasImageSnapshot
    }
  }) => <div data-testid="subject">{String(hasImageSnapshot)}</div>,
  play: async ({
    canvas
  }) => {
    const subject = canvas.getByTestId('subject');
    expect(subject).toHaveTextContent('false');
  }
}`,...(o=(n=a.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const S=["AlwaysFalseInStorybook"];export{a as AlwaysFalseInStorybook,S as __namedExportsOrder,y as default};
