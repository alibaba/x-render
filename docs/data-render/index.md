---
order: 0
title: 开始使用
mobile: false
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">DataView</span>
</div>
<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/@xrenders/data-render" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/@xrenders/data-render.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/data-render" target="_blank">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/@xrenders/data-render.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/data-render" target="_blank">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/@xrenders/data-render.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

中后台详情页解决方案，通过 schema 协议渲染页面


## 安装
```shell
npm i @xrenders/data-render --save
```

## 使用方式

**函数组件**

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import DataView from '@xrenders/data-render';
import schema from './schema/basic';
import data from './data/basic';

export default () => {
  return (
    <DataView schema={schema} data={data} />
  );
}
```