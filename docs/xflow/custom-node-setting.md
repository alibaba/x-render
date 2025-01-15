---
order: 3
title: '节点配置面板'
mobile: false
group: 
  title: 高级用法
  order: 1
---

# 节点配置面板
节点配置面板支持以下两种渲染方式自定义：

- **Schema 方式**: 适用于节点配置较为简单的场景。通过 FormRender 配置 schema 来实现快速渲染。
- **Widget 方式**: 针对复杂的配置需求，schema 无法满足时，可以通过自定义组件进行灵活渲染。


## Schema
通过配置节点的 settingSchema 属性，实现节点数据配置项的自定义渲染。

```jsx
import { Input } from 'antd';
import React from 'react';
import XFlow from '@xrenders/xflow';
import settings from './schema/custom-settings.ts';


const customWidget=({value,onChange})=>{
  return <Input  value={value}  onChange={onChange}/>
}
export default () => {
  const nodes = [
    {
      id: '1',
      type: 'Start',
      data: {
        inputVal:'我是自定义组件'
      },
      position: {
        x: 40,
        y: 240,
      }
    },
    {
      id: '2',
      type: 'End',
      data: {},
      position: {
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
        widgets={{ customWidget }}
      />
    </div>
  );
}


``` 

## Widget
通过配置节点的 `settingWidget` 属性，实现节点数据配置项的自定义渲染。

<code src="./demo/custom-flow/index.tsx"></code>
