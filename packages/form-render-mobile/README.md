<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <h4 style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">FormRender Mobile</h4>
</div>
<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/form-render-mobile?_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/form-render-mobile.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/form-render-mobile">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/fform-render-mobile.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/form-render-mobile">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/form-render-mobile.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>


<p align="center">
  <a href="https://xrender.fun/form-render-mobile">Get started</a> | 
  <a href="https://xrender.fun/form-render-mobile/api">API</a> |
  <a href="https://xrender.fun/playground">Playground</a>
</p>

## ✨ 简介

FormRender Mobile 是为移动端设置的开箱即用的表单解决方案，通过 JsonSchema 协议动态渲染表单。基于 [FormRender2.0](https://xrender.fun/form-render) 和 [Ant Design Mobile](https://mobile.ant.design/zh/components/form/) 实现。API 与 FormRender2.0 基本一致，如果你熟悉 FromRender2.0 那么你就已经会使用 FormRender Mobile 了。

## ⚙️ 安装

FormRender Mobile 依赖 Ant Design Mobile，单独使用不要忘记同时安装 `antd-mobile`

```shell
npm i form-render-mobile --save
```

## 🚀 快速上手

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    input: {
      title: '输入框',
      type: 'string',
      widget: 'input'
    },
    radio: {
      title: '单选',
      type: 'string',
      widget: 'radio',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    }
  }
};


export default () => {
  const form = useForm();

  const onFinish = (formData) => {
    console.log('formData:', formData);
  };

  return (
    <FormRender 
      form={form} 
      schema={schema} 
      onFinish={onFinish}
    />
  );
}
```
