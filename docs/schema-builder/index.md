---
order: 0
title: 开始使用
mobile: false
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">SchemaBuilder</span>
</div>
<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/@xrenders/schema-builder" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/@xrenders/schema-builder.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/schema-builder" target="_blank">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/@xrenders/schema-builder.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/schema-builder" target="_blank">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/@xrenders/schema-builder.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

## 简介
JsonSchema 生成器，快速生成 formRender 2.0 表单协议，1.0 版本表单设计器 <a href="https://1.xrender.fun/generator" target="_blank">请访问此链接</a>

注意：
- 目前只有 alpha 版本，已实现内置组件可视化编排，快速生成 JsonSchema，预计 6月底会发布正式包。
- 暂时不支持自定义组件接入，这块功能正在研发中
- 关于设计器定制化的需求，可以在讨论组中 <a href="https://github.com/alibaba/x-render/discussions/1110" target="_blank">留言</a>

## 安装
```shell
npm i @xrenders/schema-builder --save
```

项目需要配置
```json
externals: {
  "react": "React",
  "react-dom": "ReactDOM",
}
```
- 注意：externals 之后需要在 html 里面引入 React、ReactDOM cdn 资源

## 使用方式

<a href="/schema-builder-online" target="_blank">全屏体验</a>

```jsx
/**
* transform: true
* defaultShowCode: true
* background: 'rgb(204,204,204, .33)'
* padding: 20px
*/
import React from 'react';
import SchemaBuilder from '@xrenders/schema-builder';

const Demo = () => {
  return (
    <div style={{ height: '80vh' }}>
      <SchemaBuilder importBtn={true} exportBtn={true} pubBtn={false} />
    </div>
  );
};

export default Demo;
```