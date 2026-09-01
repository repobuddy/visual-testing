import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{t as n}from"./react-BZJXY1be.js";import{n as r,t as i}from"./src-B9ZZ7RZv.js";var a,o,s,c,l;function u(){return(u=t((()=>{a=e(n(),1),i(),{expect:o}=__STORYBOOK_MODULE_TEST__,s={title:`utils/hasImageSnapshot`,render:()=>a.createElement(`div`,{"data-testid":`subject`},`unit`)},c={loaders:[async()=>({hasImageSnapshot:await r()})],render:(e,{loaded:{hasImageSnapshot:t}})=>a.createElement(`div`,{"data-testid":`subject`},String(t)),play:async({canvas:e})=>{let t=e.getByTestId(`subject`);o(t).toHaveTextContent(`false`)}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}},l=[`AlwaysFalseInStorybook`]})))()}u();export{c as AlwaysFalseInStorybook,l as __namedExportsOrder,s as default};