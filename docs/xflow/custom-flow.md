---
order: 2
title: '自定义组件'
mobile: false
group: 
  title: 最佳展示
  order: 2
---
# 自定义组件

## 自定义配置组件

使用`settingWidget`自定义业务配置组件

 <code src="./demo/custom-flow/index.tsx"></code> 


## 在schema中自定义组件

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
        nodeSelector={{
          showSearch: true,
        }}
        widgets={{ customWidget }}
      />
    </div>
  );
}


``` 

## 自定义业务配置信息展示组件
使用`nodeWidget`自定义节点的业务配置信息展示组件，在节点内部展示业务配置信息 

<code src="./demo/nodeWidget"></code>
