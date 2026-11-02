import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,r as n}from"./iframe-CrToRbNf.js";import{n as r,t as i}from"./Button-3rOpRdJW.js";var a,o,s,c,l,u,d,f;function p(){return(p=e((()=>{t(),r(),{fn:a}=__STORYBOOK_MODULE_TEST__,o=n.meta({title:`Example/Button`,component:i,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{backgroundColor:{control:`color`}},args:{onClick:a()}}),s=o.story({tags:[`!snapshot`],args:{primary:!0,label:`Button`}}),c=o.story({tags:[`snapshot`],args:{label:`Button`}}),l=o.story({args:{size:`large`,label:`Button`}}),u=o.story({args:{size:`small`,label:`Button`}}),d=o.story({tags:[`snapshot`],parameters:{snapshot:{subject:`button`,timeout:2e3}},args:{label:`P`}}),f=[`Primary`,`Secondary`,`Large`,`Small`,`SnapshotSubject`],s.input.parameters={...s.input.parameters,docs:{...s.input.parameters?.docs,source:{originalSource:`meta.story({
  tags: ['!snapshot'],
  args: {
    primary: true,
    label: 'Button'
  }
})`,...s.input.parameters?.docs?.source}}},c.input.parameters={...c.input.parameters,docs:{...c.input.parameters?.docs,source:{originalSource:`meta.story({
  tags: ['snapshot'],
  args: {
    label: 'Button'
  }
})`,...c.input.parameters?.docs?.source}}},l.input.parameters={...l.input.parameters,docs:{...l.input.parameters?.docs,source:{originalSource:`meta.story({
  args: {
    size: 'large',
    label: 'Button'
  }
})`,...l.input.parameters?.docs?.source}}},u.input.parameters={...u.input.parameters,docs:{...u.input.parameters?.docs,source:{originalSource:`meta.story({
  args: {
    size: 'small',
    label: 'Button'
  }
})`,...u.input.parameters?.docs?.source}}},d.input.parameters={...d.input.parameters,docs:{...d.input.parameters?.docs,source:{originalSource:`meta.story({
  tags: ['snapshot'],
  parameters: {
    snapshot: {
      subject: 'button',
      timeout: 2000
    }
  },
  args: {
    label: 'P'
  }
})`,...d.input.parameters?.docs?.source},description:{story:`\`button\` also matches hidden buttons Storybook adds to the document,
so the snapshot must capture the visible one.
@see https://github.com/repobuddy/visual-testing/issues/848`,...d.input.parameters?.docs?.description}}}})))()}p();export{l as Large,s as Primary,c as Secondary,u as Small,d as SnapshotSubject,f as __namedExportsOrder};