import{j as r}from"./iframe-B_cy3Fgk.js";import"./expect_extend-q1ABriWl.js";import"./vitest_proxy-C5fhQBZv.js";import"./vitest_suite_proxy-BAYpTgRR.js";import{h}from"./has_image_snapshot-CHtVoSQ1.js";function ne(e,a,t){return he([e,a,t],(o,n)=>te(o,n))}function he(e,a){return e[0]===void 0||e[0]===null?e[0]:e.filter(t=>!!t).reduce(a,{})}function te(e,a){return typeof e!="object"||e===null?a!==void 0?a:e:Array.isArray(e)?Array.isArray(a)?a:a===void 0?[...e]:[...e,a]:b(e).concat(b(a)).reduce((t,o)=>(t[o]=te(e[o],a&&a[o]),t),{})}function b(e,a=!1){if(typeof e!="object")return[];const t=Object.getOwnPropertyNames(e),o=a?t.filter(re=>re!=="constructor"):t,n=Object.getPrototypeOf(e);return n!==Object.prototype?o.concat(b(n,!0)):o}function j(e){return e}function ce(e){return ae(e).create()}function ae(e){return se([e])}function se(e){return{with(t){return se([...e,t])},create(){return t=>e.reduce((o,n)=>typeof n=="function"?n(o):ne(n,o),t)}}}j.build=ce;j.builder=ae;const oe="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",w=`data:image/png;base64,${oe}`;j.build({});const{expect:s}=__STORYBOOK_MODULE_TEST__,me={title:"expect matchers/toMatchImageSnapshot",tags:["version:1.0"],render:()=>r.jsx("div",{"data-testid":"subject",children:"unit"})},c={async play({canvasElement:e}){await s(e).toMatchImageSnapshot()}},i={async play({canvas:e}){const a=e.getByTestId("subject");await s(a).toMatchImageSnapshot()}},d={async play(){await s(oe).toMatchImageSnapshot()}},p={loaders:[async()=>({hasImageSnapshot:await h()})],render(e,{loaded:{hasImageSnapshot:a}}){return a?r.jsx("img",{"data-testid":"subject",style:{width:128,height:128},src:w}):r.jsx("div",{"data-testid":"subject",children:"unit"})},async play({canvas:e,loaded:{hasImageSnapshot:a}}){const t=e.getByTestId("subject");if(!a){await s(t).toMatchImageSnapshot();return}await s(t).toMatchImageSnapshot({expectToFail:!0}).then(()=>{throw new Error("Should not reach")},o=>{s(o.message).toMatch(/Expected image to match but was differ by \d+ pixels./)})}},l={loaders:[async()=>({hasImageSnapshot:await h()})],render(e,{loaded:{hasImageSnapshot:a}}){const t=a?"unit text":"unit test";return r.jsx("div",{"data-testid":"subject",children:t})},async play({canvas:e,loaded:{hasImageSnapshot:a}}){const t=e.getByTestId("subject");if(!a){await s(t).toMatchImageSnapshot();return}await s(t).toMatchImageSnapshot({expectToFail:!0,failureThresholdType:"percent"}).then(()=>{throw new Error("Should not reach")},o=>{s(o.message).toMatch(/Expected image to match but was differ by \d+.\d+%./)})}},u={loaders:[async()=>({hasImageSnapshot:await h({snapshotKey:"smaller"})})],render(e,{loaded:{hasImageSnapshot:a}}){const t=a?{width:64,height:64}:{width:128,height:128};return r.jsx("img",{"data-testid":"subject",style:t,src:w})},async play({canvas:e,loaded:{hasImageSnapshot:a}}){const t=e.getByTestId("subject");if(!a){await s(t).toMatchImageSnapshot({snapshotKey:"smaller"});return}await s(t).toMatchImageSnapshot({snapshotKey:"smaller",expectToFail:!0}).then(()=>{throw new Error("Should not reach")},o=>{s(o.message).toMatch(/^Snapshot .* mismatched/),s(o.message).toMatch(/The image size changed from \d{3}x\d{3} to \d{2}x\d{2}/)})}},m={loaders:[async()=>({hasImageSnapshot:await h({snapshotKey:"larger"})})],render(e,{loaded:{hasImageSnapshot:a}}){const t=a?{width:128,height:128}:{width:64,height:64};return r.jsx("img",{"data-testid":"subject",style:t,src:w})},async play({canvas:e,loaded:{hasImageSnapshot:a}}){const t=e.getByTestId("subject");if(!a){await s(t).toMatchImageSnapshot({snapshotKey:"larger"});return}await s(t).toMatchImageSnapshot({snapshotKey:"larger",expectToFail:!0}).then(()=>{throw new Error("Should not reach")},o=>{s(o.message).toMatch(/^Snapshot .* mismatched/),s(o.message).toMatch(/The image size changed from \d{2}x\d{2} to \d{3}x\d{3}/)})}},g={loaders:[async()=>({hasImageSnapshot:await h({snapshotKey:"threshold"})})],render(e,{loaded:{hasImageSnapshot:a}}){const t=a?"unit text":"unit test";return r.jsx("div",{"data-testid":"subject",children:t})},async play({canvas:e,loaded:{hasImageSnapshot:a}}){const t=e.getByTestId("subject");a||await s(t).toMatchImageSnapshot({snapshotKey:"threshold"}),await s(t).toMatchImageSnapshot({snapshotKey:"threshold",failureThreshold:70})}},I={loaders:[async()=>({hasImageSnapshot:await h({snapshotKey:"threshold"})})],render(e,{loaded:{hasImageSnapshot:a}}){const t=a?"unit text":"unit test";return r.jsx("div",{"data-testid":"subject",children:t})},async play({canvas:e,loaded:{hasImageSnapshot:a}}){const t=e.getByTestId("subject");if(!a){await s(t).toMatchImageSnapshot({snapshotKey:"threshold"});return}await s(t).toMatchImageSnapshot({snapshotKey:"threshold",expectToFail:!0,failureThreshold:20}).then(()=>{throw new Error("Should not reach")},o=>{s(o.message).toMatch(/Expected image to match within 20 pixels but was differ by \d+ pixels./)})}},y={loaders:[async()=>({hasImageSnapshot:await h({snapshotKey:"threshold"})})],render(e,{loaded:{hasImageSnapshot:a}}){const t=a?"unit text":"unit test";return r.jsx("div",{"data-testid":"subject",children:t})},async play({canvas:e,loaded:{hasImageSnapshot:a}}){const t=e.getByTestId("subject");a||await s(t).toMatchImageSnapshot({snapshotKey:"threshold"}),await s(t).toMatchImageSnapshot({snapshotKey:"threshold",failureThreshold:1,failureThresholdType:"percent"})}},S={loaders:[async()=>({hasImageSnapshot:await h({snapshotKey:"threshold"})})],render(e,{loaded:{hasImageSnapshot:a}}){const t=a?{width:128,height:128}:{width:64,height:64};return r.jsx("img",{"data-testid":"subject",style:t,src:w})},async play({canvas:e,loaded:{hasImageSnapshot:a}}){const t=e.getByTestId("subject");if(!a){await s(t).toMatchImageSnapshot({snapshotKey:"threshold"});return}await s(t).toMatchImageSnapshot({snapshotKey:"threshold",expectToFail:!0,failureThreshold:.1,failureThresholdType:"percent"}).then(()=>{throw new Error("Should not reach")},o=>{s(o.message).toMatch(/Expected image to match within 0.1% but was differ by \d+.\d+%./)})}};var x,f,T;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  async play({
    canvasElement
  }) {
    await expect(canvasElement).toMatchImageSnapshot();
  }
}`,...(T=(f=c.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var M,A,v;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  async play({
    canvas
  }) {
    const element = canvas.getByTestId('subject');
    await expect(element).toMatchImageSnapshot();
  }
}`,...(v=(A=i.parameters)==null?void 0:A.docs)==null?void 0:v.source}}};var E,B,F;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  async play() {
    await expect(UNI_PNG_BASE64).toMatchImageSnapshot();
  }
}`,...(F=(B=d.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var K,D,C;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  loaders: [async () => ({
    hasImageSnapshot: await hasImageSnapshot()
  })],
  render(_, {
    loaded: {
      hasImageSnapshot
    }
  }) {
    return hasImageSnapshot ? <img data-testid="subject" style={{
      width: 128,
      height: 128
    }} src={UNI_PNG_URL} /> : <div data-testid="subject">unit</div>;
  },
  async play({
    canvas,
    loaded: {
      hasImageSnapshot
    }
  }) {
    const subject = canvas.getByTestId('subject');
    if (!hasImageSnapshot) {
      await expect(subject).toMatchImageSnapshot();
      return;
    }

    // This will only execute in test environment
    await expect(subject).toMatchImageSnapshot({
      expectToFail: true
    }).then(() => {
      throw new Error('Should not reach');
    }, error => {
      expect(error.message).toMatch(/Expected image to match but was differ by \\d+ pixels./);
    });
  }
}`,...(C=(D=p.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};var G,P,N;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  loaders: [async () => ({
    hasImageSnapshot: await hasImageSnapshot()
  })],
  render(_, {
    loaded: {
      hasImageSnapshot
    }
  }) {
    const text = hasImageSnapshot ? 'unit text' : 'unit test';
    return <div data-testid="subject">{text}</div>;
  },
  async play({
    canvas,
    loaded: {
      hasImageSnapshot
    }
  }) {
    const subject = canvas.getByTestId('subject');
    if (!hasImageSnapshot) {
      await expect(subject).toMatchImageSnapshot();
      return;
    }

    // This will only execute in test environment
    await expect(subject).toMatchImageSnapshot({
      expectToFail: true,
      failureThresholdType: 'percent'
    }).then(() => {
      throw new Error('Should not reach');
    }, error => {
      expect(error.message).toMatch(/Expected image to match but was differ by \\d+.\\d+%./);
    });
  }
}`,...(N=(P=l.parameters)==null?void 0:P.docs)==null?void 0:N.source}}};var L,O,U;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  loaders: [async () => {
    return {
      hasImageSnapshot: await hasImageSnapshot({
        snapshotKey: 'smaller'
      })
    };
  }],
  render(_, {
    loaded: {
      hasImageSnapshot
    }
  }) {
    const style = hasImageSnapshot ? {
      width: 64,
      height: 64
    } : {
      width: 128,
      height: 128
    };
    return <img data-testid="subject" style={style} src={UNI_PNG_URL} />;
  },
  async play({
    canvas,
    loaded: {
      hasImageSnapshot
    }
  }) {
    const subject = canvas.getByTestId('subject');
    if (!hasImageSnapshot) {
      await expect(subject).toMatchImageSnapshot({
        snapshotKey: 'smaller'
      });
      return;
    }

    // This will only execute in test environment
    await expect(subject).toMatchImageSnapshot({
      snapshotKey: 'smaller',
      expectToFail: true
    }).then(() => {
      throw new Error('Should not reach');
    }, error => {
      expect(error.message).toMatch(/^Snapshot .* mismatched/);
      expect(error.message).toMatch(/The image size changed from \\d{3}x\\d{3} to \\d{2}x\\d{2}/);
    });
  }
}`,...(U=(O=u.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};var Q,R,z;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  loaders: [async () => {
    return {
      hasImageSnapshot: await hasImageSnapshot({
        snapshotKey: 'larger'
      })
    };
  }],
  render(_, {
    loaded: {
      hasImageSnapshot
    }
  }) {
    const style = hasImageSnapshot ? {
      width: 128,
      height: 128
    } : {
      width: 64,
      height: 64
    };
    return <img data-testid="subject" style={style} src={UNI_PNG_URL} />;
  },
  async play({
    canvas,
    loaded: {
      hasImageSnapshot
    }
  }) {
    const subject = canvas.getByTestId('subject');
    if (!hasImageSnapshot) {
      await expect(subject).toMatchImageSnapshot({
        snapshotKey: 'larger'
      });
      return;
    }
    // This will only execute in test environment
    await expect(subject).toMatchImageSnapshot({
      snapshotKey: 'larger',
      expectToFail: true
    }).then(() => {
      throw new Error('Should not reach');
    }, error => {
      expect(error.message).toMatch(/^Snapshot .* mismatched/);
      expect(error.message).toMatch(/The image size changed from \\d{2}x\\d{2} to \\d{3}x\\d{3}/);
    });
  }
}`,...(z=(R=m.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};var Y,k,J;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  loaders: [async () => {
    return {
      hasImageSnapshot: await hasImageSnapshot({
        snapshotKey: 'threshold'
      })
    };
  }],
  render(_, {
    loaded: {
      hasImageSnapshot
    }
  }) {
    const text = hasImageSnapshot ? 'unit text' : 'unit test';
    return <div data-testid="subject">{text}</div>;
  },
  async play({
    canvas,
    loaded: {
      hasImageSnapshot
    }
  }) {
    const subject = canvas.getByTestId('subject');
    if (!hasImageSnapshot) {
      await expect(subject).toMatchImageSnapshot({
        snapshotKey: 'threshold'
      });
    }
    await expect(subject).toMatchImageSnapshot({
      snapshotKey: 'threshold',
      failureThreshold: 70
    });
  }
}`,...(J=(k=g.parameters)==null?void 0:k.docs)==null?void 0:J.source}}};var W,X,V;I.parameters={...I.parameters,docs:{...(W=I.parameters)==null?void 0:W.docs,source:{originalSource:`{
  loaders: [async () => {
    return {
      hasImageSnapshot: await hasImageSnapshot({
        snapshotKey: 'threshold'
      })
    };
  }],
  render(_, {
    loaded: {
      hasImageSnapshot
    }
  }) {
    const text = hasImageSnapshot ? 'unit text' : 'unit test';
    return <div data-testid="subject">{text}</div>;
  },
  async play({
    canvas,
    loaded: {
      hasImageSnapshot
    }
  }) {
    const subject = canvas.getByTestId('subject');
    if (!hasImageSnapshot) {
      await expect(subject).toMatchImageSnapshot({
        snapshotKey: 'threshold'
      });
      return;
    }
    // This will only execute in test environment
    await expect(subject).toMatchImageSnapshot({
      snapshotKey: 'threshold',
      expectToFail: true,
      failureThreshold: 20
    }).then(() => {
      throw new Error('Should not reach');
    }, error => {
      expect(error.message).toMatch(/Expected image to match within 20 pixels but was differ by \\d+ pixels./);
    });
  }
}`,...(V=(X=I.parameters)==null?void 0:X.docs)==null?void 0:V.source}}};var _,q,H;y.parameters={...y.parameters,docs:{...(_=y.parameters)==null?void 0:_.docs,source:{originalSource:`{
  loaders: [async () => {
    return {
      hasImageSnapshot: await hasImageSnapshot({
        snapshotKey: 'threshold'
      })
    };
  }],
  render(_, {
    loaded: {
      hasImageSnapshot
    }
  }) {
    const text = hasImageSnapshot ? 'unit text' : 'unit test';
    return <div data-testid="subject">{text}</div>;
  },
  async play({
    canvas,
    loaded: {
      hasImageSnapshot
    }
  }) {
    const subject = canvas.getByTestId('subject');
    if (!hasImageSnapshot) {
      await expect(subject).toMatchImageSnapshot({
        snapshotKey: 'threshold'
      });
    }
    await expect(subject).toMatchImageSnapshot({
      snapshotKey: 'threshold',
      failureThreshold: 1,
      failureThresholdType: 'percent'
    });
  }
}`,...(H=(q=y.parameters)==null?void 0:q.docs)==null?void 0:H.source}}};var Z,$,ee;S.parameters={...S.parameters,docs:{...(Z=S.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  loaders: [async () => ({
    hasImageSnapshot: await hasImageSnapshot({
      snapshotKey: 'threshold'
    })
  })],
  render(_, {
    loaded: {
      hasImageSnapshot
    }
  }) {
    const style = hasImageSnapshot ? {
      width: 128,
      height: 128
    } : {
      width: 64,
      height: 64
    };
    return <img data-testid="subject" style={style} src={UNI_PNG_URL} />;
  },
  async play({
    canvas,
    loaded: {
      hasImageSnapshot
    }
  }) {
    const subject = canvas.getByTestId('subject');
    if (!hasImageSnapshot) {
      await expect(subject).toMatchImageSnapshot({
        snapshotKey: 'threshold'
      });
      return;
    }
    // This will only execute in test environment
    await expect(subject).toMatchImageSnapshot({
      snapshotKey: 'threshold',
      expectToFail: true,
      failureThreshold: 0.1,
      failureThresholdType: 'percent'
    }).then(() => {
      throw new Error('Should not reach');
    }, error => {
      expect(error.message).toMatch(/Expected image to match within 0.1% but was differ by \\d+.\\d+%./);
    });
  }
}`,...(ee=($=S.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};const ge=["MatchingCanvasElement","MatchingElement","MatchingBase64Image","FailWithDifferentImage","FailInPercent","FailWhenSmaller","FailWhenLarger","PassFailureThreshold","FailFailureThreshold","PassFailureThresholdPercent","FailFailureThresholdPercent"];export{I as FailFailureThreshold,S as FailFailureThresholdPercent,l as FailInPercent,m as FailWhenLarger,u as FailWhenSmaller,p as FailWithDifferentImage,d as MatchingBase64Image,c as MatchingCanvasElement,i as MatchingElement,g as PassFailureThreshold,y as PassFailureThresholdPercent,ge as __namedExportsOrder,me as default};
