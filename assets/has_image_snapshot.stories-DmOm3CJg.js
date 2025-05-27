import{j as r}from"./jsx-runtime-Cf8x2fCZ.js";import{e as i}from"./index-CB-nUy61.js";import{h as c}from"./has_image_snapshot-DB3Z20AI.js";import"./index-yBjzXJbu.js";import"./vitest_suite_proxy-D4wpkwtr.js";import"./iframe-BHVsta41.js";const u={title:"utils/hasImageSnapshot",render:()=>r.jsx("div",{"data-testid":"subject",children:"unit"})},a={loaders:[async()=>({hasImageSnapshot:await c()})],render:(e,{loaded:{hasImageSnapshot:s}})=>r.jsx("div",{"data-testid":"subject",children:String(s)}),play:async({canvas:e})=>{const s=e.getByTestId("subject");i(s).toHaveTextContent("false")}};var t,n,o;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(o=(n=a.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const y=["AlwaysFalseInStorybook"];export{a as AlwaysFalseInStorybook,y as __namedExportsOrder,u as default};
