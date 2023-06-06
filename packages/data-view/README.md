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

const data = {
  "creator": "清风",
  "relevanceCode": "421421",
  "desc": "浙江省杭州市工专路",
  "create-time": "2019-10-10",
  "effective-date": "2019-10-10 ～ 2020-10-31",
  "safety": {
    "name": "Test demo 001",
    "app": "蚂蚁金融科技 TechUI",
    "mode": "代码包",
    "yum": "qingfeng10000-23904823489",
    "fore": "23"
  },
  "operLog": [{
    "type": "创建测试",
    "creator": "清风",
    "time": "2019-10-30 12:23:45",
    "result": "1",
    "desc": "这是备注"
  }, {
    "type": "创建测试",
    "creator": "清风",
    "time": "2019-10-30 12:23:45",
    "result": "1",
    "desc": "这是备注"
  }, {
    "type": "创建测试",
    "creator": "清风",
    "time": "2019-10-30 12:23:45",
    "result": "1",
    "desc": "这是备注"
  }, {
    "type": "创建测试",
    "creator": "清风",
    "time": "2019-10-30 12:23:45",
    "result": "1",
    "desc": "这是备注"
  }, {
    "type": "创建测试",
    "creator": "清风",
    "time": "2019-10-30 12:23:45",
    "result": "1",
    "desc": "这是备注"
  }, {
    "type": "创建测试",
    "creator": "清风",
    "time": "2019-10-30 12:23:45",
    "result": "1",
    "desc": "这是备注"
  }]
}

const schema = [
  {
    "widget": "FPanel",
    "style": {
      "paddingTop": "20px",
      "paddingLeft": "20px",
      "paddingBottom": "20px",
      "paddingRight": "20px",
      "backgroundColor": "#ffffff",
      "marginBottom": "12px"
    },
    "children": [
      {
        "widget": "FTitle",
        "data": "基础信息"
      },
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
          },
          {
            "label": "描述项",
            "showLevel": 1
          }
        ],
        "style": {
          "backgroundColor": "#ffffff",
          "paddingTop": "0px",
          "paddingLeft": "0px",
          "paddingRight": "0px",
          "paddingBottom": "0px"
        },
        "itemShowLevel": 1,
        "getCompProps": "xxxx"
      }
    ]
  },
  {
    "widget": "FTabs",
    "items": [
      {
        "label": "负载均衡(SLB)",
        "children": [
          {
            "widget": "FPanel",
            "style": {
              "paddingTop": "20px",
              "paddingLeft": "20px",
              "paddingBottom": "20px",
              "paddingRight": "20px",
              "backgroundColor": "#ffffff",
              "marginBottom": "12px"
            },
            "children": [
              {
                "widget": "FTitle",
                "data": "安全信息"
              },
              {
                "widget": "FDescriptions",
                "column": 2,
                "items": [
                  {
                    "label": "安全构建名称",
                    "dataKey": "name"
                  },
                  {
                    "label": "所属应用",
                    "dataKey": "app"
                  },
                  {
                    "label": "构建模式",
                    "dataKey": "mode"
                  },
                  {
                    "label": "公网域名",
                    "dataKey": "yum"
                  },
                  {
                    "label": "保留计算实例",
                    "dataKey": "fore"
                  }
                ],
                "dataKey": "safety"
              }
            ]
          },
          {
            "widget": "FPanel",
            "style": {
              "paddingTop": "20px",
              "paddingLeft": "20px",
              "paddingBottom": "20px",
              "paddingRight": "20px",
              "backgroundColor": "#ffffff",
              "marginBottom": "12px"
            },
            "children": [
              {
                "widget": "FTitle",
                "data": "操作日志"
              },
              {
                "widget": "FTable",
                "pagination": {
                  "pageSize": "3"
                },
                "style": {
                  "backgroundColor": "#ffffff"
                },
                "dataKey": "operLog",
                "column": {
                  "type": {
                    "title": "操作类型",
                    "dataKey": "type"
                  },
                  "creator": {
                    "title": "操作人",
                    "dataKey": "creator"
                  },
                  "time": {
                    "title": "操作时间",
                    "dataKey": "time"
                  },
                  "result": {
                    "title": "执行结果",
                    "dataKey": "result"
                  },
                  "desc": {
                    "title": "备注",
                    "dataKey": "desc"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "label": "云服务器（ECS）",
        "children": []
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