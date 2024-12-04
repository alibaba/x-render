---
order: 0
title: 开始使用
mobile: false
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">XFlow</span>
</div>
<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/@xrenders/xflow" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/@xrenders/xflow.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/xflow" target="_blank">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/@xrenders/xflow.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/xflow" target="_blank">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/@xrenders/xflow.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

画布流程编排解决方案

## 安装
```shell
npm i @xrenders/xflow --save
```

## 使用方式

**函数组件**

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import XFlow from '@xrenders/xflow';
import settings from './schema/settings';

export default () => {
  const nodes = [
    {
      id: '1', // 节点 ID
      type: 'Start', // 节点类型
      data: {}, // 节点配置数据
      position: { // 节点画布坐标位置
        x: 40,
        y: 240,
      }
    },
    {
      id: '2',
      type: 'End', // 节点类型
      data: {}, // 节点配置数据
      position: { // 节点画布坐标位置
        x: 500,
        y: 240,
      }
    }
  ];

  const edges = [
    { source: '1', target: '2', id: '234123' }
  ]

  return (
    <div style={{ height: '600px' }}>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings}
      />
    </div>
  );
}
```
