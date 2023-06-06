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

const data = {
  "creator": "清风徐来",
  "relevanceCode": "421421",
  "desc": "浙江省杭州市工专路",
  "create-time": "2019-10-10",
  "effective-date": "2019-10-10 ～ 2020-10-31",
  "safety": {
    "name": "Test demo 001",
    "app": "中后台详情页",
    "mode": "代码包",
    "yum": "244444390482344744484889",
    "fore": "23"
  },
}

const schema = [
  {
    "widget": "FDescriptions",
    "column": 3,
    "items": [
      {
        "label": "创建人",
        "dataKey": "creator"
      },
      {
        "label": "关联单据",
        "dataKey": "relevanceCode"
      },
      {
        "label": "单据备注",
        "dataKey": "desc"
      },
      {
        "label": "创建时间",
        "dataKey": "create-time"
      },
      {
        "label": "生效日期",
        "dataKey": "effective-date"
      }
    ]
  }
]

export default () => {
  return (
    <DataView schema={schema} data={data} />
  );
}
```