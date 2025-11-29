import{R as t}from"./iframe-fTt469q7.js";import"./setup-BWgIDtv--DD7uLTEt.js";import"./task_id-DnS9_4Ub-C-aZNWRk.js";import"./vitest_proxy-BLs0Du1Q.js";import{h}from"./has_image_snapshot-lbkFhDnB.js";import"./preload-helper-PPVm8Dsz.js";import"./context-Beh5KHTz.js";import"./utils.DvEY5TfP-COIdXPbh.js";function s(a){return{snapshot:a}}const{expect:p}=__STORYBOOK_MODULE_TEST__,T={title:"utils/defineAutoSnapshotParam",tags:["snapshot"]},r={parameters:s({failureThreshold:70}),loaders:[async()=>({hasImageSnapshot:await h()})],render:(a,{loaded:{hasImageSnapshot:e}})=>t.createElement("div",{"data-testid":"subject"},e?"unit text":"unit test")},o={parameters:s({failureThreshold:.3,failureThresholdType:"percent"}),loaders:[async()=>({hasImageSnapshot:await h()})],render:(a,{loaded:{hasImageSnapshot:e}})=>t.createElement("div",{"data-testid":"subject"},e?"unit text":"unit test")},n={tags:["!snapshot"],parameters:s({failureThreshold:1}),loaders:[async()=>({hasImageSnapshot:await h()})],render:(a,{loaded:{hasImageSnapshot:e}})=>t.createElement("div",{"data-testid":"subject"},e?"unit text":"unit test"),play:async({canvas:a})=>{const e=a.getByTestId("subject");await p(e).toMatchImageSnapshot({failureThreshold:70})}},d={parameters:s({comparisonMethod:"ssim",diffOptions:{ssim:"bezkrovny"}}),render:()=>t.createElement("div",{"data-testid":"subject"},"unit test")},i={parameters:s({failureThreshold:70,subject:'[data-testid="alt"]'}),loaders:[async()=>({hasImageSnapshot:await h()})],render:(a,{loaded:{hasImageSnapshot:e}})=>t.createElement("div",{"data-testid":"alt"},e?"unit text":"unit test")};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: defineAutoSnapshotParam({
    comparisonMethod: 'ssim',
    diffOptions: {
      ssim: 'bezkrovny'
    }
  }),
  render: () => <div data-testid="subject">unit test</div>
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const y=["SetFailureThreshold","SetFailureThresholdByPercentage","DoesNotApplyToSnapshotInPlay","UseSsim","SetSubject"];export{n as DoesNotApplyToSnapshotInPlay,r as SetFailureThreshold,o as SetFailureThresholdByPercentage,i as SetSubject,d as UseSsim,y as __namedExportsOrder,T as default};
