import{j as r}from"./iframe-B7ifLxA0.js";import{h as i}from"./has_image_snapshot-DzRWBkr1.js";import"./vitest_suite_proxy-CUgNX56v.js";import"./vitest_proxy-B6anmY2U.js";const{expect:c}=__STORYBOOK_MODULE_TEST__,l={title:"utils/hasImageSnapshot",render:()=>r.jsx("div",{"data-testid":"subject",children:"unit"})},s={loaders:[async()=>({hasImageSnapshot:await i()})],render:(e,{loaded:{hasImageSnapshot:a}})=>r.jsx("div",{"data-testid":"subject",children:String(a)}),play:async({canvas:e})=>{const a=e.getByTestId("subject");c(a).toHaveTextContent("false")}};var t,n,o;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(o=(n=s.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const g=["AlwaysFalseInStorybook"];export{s as AlwaysFalseInStorybook,g as __namedExportsOrder,l as default};
