import{j as t}from"./jsx-runtime-Cf8x2fCZ.js";import{e as P}from"./index-CB-nUy61.js";import"./expect_extend-BYDW2193.js";import"./vitest_suite_proxy-D4wpkwtr.js";import{h}from"./has_image_snapshot-DB3Z20AI.js";import"./index-yBjzXJbu.js";import"./iframe-BHVsta41.js";function s(e){return{snapshot:e}}const k={title:"utils/defineAutoSnapshotParam",tags:["snapshot"]},r={parameters:s({failureThreshold:70}),loaders:[async()=>({hasImageSnapshot:await h()})],render:(e,{loaded:{hasImageSnapshot:a}})=>t.jsx("div",{"data-testid":"subject",children:a?"unit text":"unit test"})},o={parameters:s({failureThreshold:.3,failureThresholdType:"percent"}),loaders:[async()=>({hasImageSnapshot:await h()})],render:(e,{loaded:{hasImageSnapshot:a}})=>t.jsx("div",{"data-testid":"subject",children:a?"unit text":"unit test"})},d={tags:["!snapshot"],parameters:s({failureThreshold:1}),loaders:[async()=>({hasImageSnapshot:await h()})],render:(e,{loaded:{hasImageSnapshot:a}})=>t.jsx("div",{"data-testid":"subject",children:a?"unit text":"unit test"}),play:async({canvas:e})=>{const a=e.getByTestId("subject");await P(a).toMatchImageSnapshot({failureThreshold:70})}},n={parameters:s({comparisonMethod:"ssim",diffOptions:{ssim:"bezkrovny"}}),render:()=>t.jsx("div",{"data-testid":"subject",children:"unit test"})},i={parameters:s({failureThreshold:70,subject:'[data-testid="alt"]'}),loaders:[async()=>({hasImageSnapshot:await h()})],render:(e,{loaded:{hasImageSnapshot:a}})=>t.jsx("div",{"data-testid":"alt",children:a?"unit text":"unit test"})};var p,m,c;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var u,l,S;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(S=(l=o.parameters)==null?void 0:l.docs)==null?void 0:S.source}}};var g,I,f;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(f=(I=d.parameters)==null?void 0:I.docs)==null?void 0:f.source}}};var j,y,T;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  parameters: defineAutoSnapshotParam({
    comparisonMethod: 'ssim',
    diffOptions: {
      ssim: 'bezkrovny'
    }
  }),
  render: () => <div data-testid="subject">unit test</div>
}`,...(T=(y=n.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var b,v,x;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(x=(v=i.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};const z=["SetFailureThreshold","SetFailureThresholdByPercentage","DoesNotApplyToSnapshotInPlay","UseSsim","SetSubject"];export{d as DoesNotApplyToSnapshotInPlay,r as SetFailureThreshold,o as SetFailureThresholdByPercentage,i as SetSubject,n as UseSsim,z as __namedExportsOrder,k as default};
