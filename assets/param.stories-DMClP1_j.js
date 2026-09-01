import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{t as n}from"./react-BZJXY1be.js";import{n as r,t as i}from"./src-DBysPESd.js";function a(e){return{snapshot:e}}var o,s,c,l,u,d,f,p,m;function h(){return(h=t((()=>{o=e(n(),1),i(),{expect:s}=__STORYBOOK_MODULE_TEST__,c={title:`utils/defineAutoSnapshotParam`,tags:[`snapshot`]},l={parameters:a({failureThreshold:70}),loaders:[async()=>({hasImageSnapshot:await r()})],render:(e,{loaded:{hasImageSnapshot:t}})=>o.createElement(`div`,{"data-testid":`subject`},t?`unit text`:`unit test`)},u={parameters:a({failureThreshold:.3,failureThresholdType:`percent`}),loaders:[async()=>({hasImageSnapshot:await r()})],render:(e,{loaded:{hasImageSnapshot:t}})=>o.createElement(`div`,{"data-testid":`subject`},t?`unit text`:`unit test`)},d={tags:[`!snapshot`],parameters:a({failureThreshold:1}),loaders:[async()=>({hasImageSnapshot:await r()})],render:(e,{loaded:{hasImageSnapshot:t}})=>o.createElement(`div`,{"data-testid":`subject`},t?`unit text`:`unit test`),play:async({canvas:e})=>{let t=e.getByTestId(`subject`);await s(t).toMatchImageSnapshot({failureThreshold:70})}},f={parameters:a({comparisonMethod:`ssim`,diffOptions:{ssim:`bezkrovny`}}),render:()=>o.createElement(`div`,{"data-testid":`subject`},`unit test`)},p={parameters:a({failureThreshold:70,subject:`[data-testid="alt"]`}),loaders:[async()=>({hasImageSnapshot:await r()})],render:(e,{loaded:{hasImageSnapshot:t}})=>o.createElement(`div`,{"data-testid":`alt`},t?`unit text`:`unit test`)},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: defineAutoSnapshotParam({
    failureThreshold: 70
  }),
  loaders: [async () => ({
    hasImageSnapshot: await hasImageSnapshot()
  })],
  render: (_, {
    loaded: {
      hasImageSnapshot
    }
  }) => <div data-testid="subject">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: defineAutoSnapshotParam({
    failureThreshold: 0.3,
    failureThresholdType: 'percent'
  }),
  loaders: [async () => ({
    hasImageSnapshot: await hasImageSnapshot()
  })],
  render: (_, {
    loaded: {
      hasImageSnapshot
    }
  }) => <div data-testid="subject">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  tags: ['!snapshot'],
  parameters: defineAutoSnapshotParam({
    failureThreshold: 1
  }),
  loaders: [async () => ({
    hasImageSnapshot: await hasImageSnapshot()
  })],
  render: (_, {
    loaded: {
      hasImageSnapshot
    }
  }) => <div data-testid="subject">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>,
  play: async ({
    canvas
  }) => {
    const subject = canvas.getByTestId('subject');
    await expect(subject).toMatchImageSnapshot({
      failureThreshold: 70
    });
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: defineAutoSnapshotParam({
    comparisonMethod: 'ssim',
    diffOptions: {
      ssim: 'bezkrovny'
    }
  }),
  render: () => <div data-testid="subject">unit test</div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: defineAutoSnapshotParam({
    failureThreshold: 70,
    subject: '[data-testid="alt"]'
  }),
  loaders: [async () => ({
    hasImageSnapshot: await hasImageSnapshot()
  })],
  render: (_, {
    loaded: {
      hasImageSnapshot
    }
  }) => <div data-testid="alt">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
}`,...p.parameters?.docs?.source}}},m=[`SetFailureThreshold`,`SetFailureThresholdByPercentage`,`DoesNotApplyToSnapshotInPlay`,`UseSsim`,`SetSubject`]})))()}h();export{d as DoesNotApplyToSnapshotInPlay,l as SetFailureThreshold,u as SetFailureThresholdByPercentage,p as SetSubject,f as UseSsim,m as __namedExportsOrder,c as default};