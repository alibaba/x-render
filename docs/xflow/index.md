---
order: 0
title: 开始使用
mobile: false
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">xflow</span>
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
import schema from './schema/basic';
import data from './data/basic';



const nodeMenus = [
  {
    title: 'Input',
    type: 'Input',
    icon: {
      type: 'icon-start',
      bgColor: '#17B26A',
    }
  },
  {
    title: 'Output',
    type: 'Output',
    icon: {
      type: 'icon-end',
      bgColor: '#F79009',
    }
  },
  { 
    title: 'LLM',
    type: 'LLM',
    description: '调用大语言模型回答问题或者对自然语言进行处理',
    icon: {
      type: 'icon-model',
      bgColor: '#6172F3',
    }
  },
  { 
    title: 'Prompt',
    type: 'Prompt',
    description: '通过精心设计提示词，提升大语言模型回答效果',
    icon: {
      type: 'icon-prompt',
      bgColor: '#17B26A',
    }
  },
  { 
    title: '知识库', 
    type: 'knowledge',
    description: '允许你从知识库中查询与用户问题相关的文本内容',
    icon: {
      type: 'icon-knowledge',
      bgColor: '#6172F3'
    }
  },
  { 
    title: 'Switch', 
    type: 'Switch',
    description: '允许你根据 if/else 条件将 workflow 拆分成两个分支',
    icon: {
      type: 'icon-switch',
      bgColor: '#06AED4',
    }
  },
  { 
    title: 'HSF', 
    type: 'hsf',
    description: '允许通过 HSF 协议发送服务器请求',
    icon: {
      type: 'icon-hsf',
      bgColor: '#875BF7'
    }
  },
  { 
    title: 'Http', 
    type: 'http',
    description: '允许通过 HTTP 协议发送服务器请求',
    icon: {
      type: 'icon-http',
      bgColor: '#875BF7'
    }
  },
  {
    title: '代码执行',
    type: 'Code',
    description: '执行一段 Groovy 或 Python 或 NodeJS 代码实现自定义逻辑',
    icon: {
      type: 'icon-code',
      bgColor: '#2E90FA'
    }
  },
  {
    title: '工具',
    type: 'tool',
    description: '允许使用工具能力',
    icon: {
      type: 'icon-gongju',
      bgColor: '#2E90FA'
    }
  }
];

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

  return (
    <div style={{ height: '600px' }}>
      <XFlow 
        nodes={nodes}
        edges={[]}
        nodeMenus={nodeMenus}
        layout='TB'
      />
    </div>
  );
}
```