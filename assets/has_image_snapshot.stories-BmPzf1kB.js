import{R as s}from"./iframe-fTt469q7.js";import{h as n}from"./has_image_snapshot-lbkFhDnB.js";import"./preload-helper-PPVm8Dsz.js";import"./task_id-DnS9_4Ub-C-aZNWRk.js";import"./vitest_proxy-BLs0Du1Q.js";const{expect:o}=__STORYBOOK_MODULE_TEST__,h={title:"utils/hasImageSnapshot",render:()=>s.createElement("div",{"data-testid":"subject"},"unit")},a={loaders:[async()=>({hasImageSnapshot:await n()})],render:(t,{loaded:{hasImageSnapshot:e}})=>s.createElement("div",{"data-testid":"subject"},String(e)),play:async({canvas:t})=>{const e=t.getByTestId("subject");o(e).toHaveTextContent("false")}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const m=["AlwaysFalseInStorybook"];export{a as AlwaysFalseInStorybook,m as __namedExportsOrder,h as default};
