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
  <a href="https://www.npmjs.com/package/@xrenders/data-view" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/@xrenders/data-view.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/data-view" target="_blank">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/@xrenders/data-view.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/data-view" target="_blank">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/@xrenders/data-view.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

中后台详情页解决方案，通过 schema 协议渲染页面


## 安装
```shell
npm i @xrenders/data-view --save
```

## 使用方式

**函数组件**

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import DataView from '@xrenders/data-view';

export default () => {
 
  const data = {
    rateInfo: {
      ratePlan: 'Breakfast fro one',
      telePhone: '693.00',
      priceTag: '700.00'
    }
  };

  const schema = [{
    widget: 'FDescriptions',
    title: '描述列表',
    dataKey: 'rateInfo',
    column: 3,
    items: [
      {
        label: '姓名',
        dataKey: 'userName',
        labelToolTip: {
          overlayInnerStyle: { width: '280px' },
          title: '1231231231231231大了就啊都是十分理解啊老地方见的失联飞机23123',
        },
      },
      {
        label: '手机号',
        dataKey: 'telePhone',
        children: {
          widget: 'FText',
          iconSetting: {
            type: 'icon-phone',
          },
        },
      },
      {
        label: '地址',
        dataKey: 'live',
        showLevel: 1
      }
    ]
  }];
  
  return (
    <DataView schema={schema} data={data} />
  );
}
```