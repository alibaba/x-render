---
order: 3
title: '自定义节点配置面板'
mobile: false
group: 
  title: 高级用法
  order: 2
---

# 自定义节点配置面板
节点配置面板支持以下两种渲染方式：

- **Schema 方式**: 适用于节点配置较为简单的场景。通过 FormRender 配置 schema 来实现快速渲染。
- **Widget 方式**: 针对复杂的配置需求，schema 无法满足时，可以通过配置`settingWidget`自定义组件进行灵活渲染。

## Schema 方式
通过配置节点的 settingSchema 属性，实现节点数据配置项的自定义渲染。Schema方式适合快速实现简单的配置面板。

### 基础示例

```jsx
import { Input } from 'antd';
import React from 'react';
import XFlow from '@xrenders/xflow';
import settings from './schema/custom-settings.ts';

const customWidget = ({ value, onChange }) => {
  return <Input value={value} onChange={e => onChange(e.target.value)} />
}

export default () => {
  const nodes = [
    {
      id: '1',
      type: 'Start',
      data: {
        inputVal: '我是自定义组件'
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

## Widget 方式
通过配置节点的 `settingWidget` 属性，实现节点数据配置项的自定义渲染。Widget 方式提供了更大的灵活性，可以实现复杂的交互和样式需求。

### 使用方法

1. 创建自定义配置组件，组件参数见[自定义组件接收到的props](#自定义组件接收到的props)
```js
const customWidget = ({ value, onChange,...rest }) => {
  return (
    <Input
      value={value?.inputVal}
      onChange={e => onChange({ inputVal: e.target.value })}
    />
  );
};
```
1. 在`widgets`中注册自定义组件
```js
       <XFlow
        initialValues={{ nodes, edges }}
        settings={settings}
        widgets={{ customWidget }}
       />

```
3. 在`settings`属性使用
```js
{
    title: '开始',
    type: 'Start',
    hidden: true,
    targetHandleHidden: true,
    icon: {
      type: 'icon-start',
      bgColor: '#17B26A',
    },
    settingWidget: "customWidget",  // 使用自定义组件customWidget
    settingWidgetProps: {  // 给自定义组件传递参数
      params: "test"
    }
}

```

### 自定义组件接收到的props
默认情况下 Widget 会接收到如下的 props：

#### value
- 类型：`any`
- 描述：当前组件的值，用于 settingWidget 的受控

#### onChange
- 类型：`(value: any) => void`
- 描述：当前 组件的值变化时的回调用于 settingWidget 的受控

#### readOnly
- 类型：`boolean`
- 描述：当前组件是否为只读状态

#### others
接收`settingWidgetProps`传入的所有值

### 基础示例
<code src="./demo/custom-flow/index.tsx"></code>
