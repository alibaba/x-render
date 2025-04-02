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

:::info
注意：使用 FormRender 的 schema方式配置，只能用`{{ }}` 函数表达式和`dependencies`方式实现简单联动，不能使用`watch`监听的形式实现复杂联动，如果需要使用`watch`监听的形式请使用[`settingWidget`自定义组件](#widget-方式)  
:::
 
### 基础示例
如果schema中设置了`required:true`必填项，则无法关闭和切换节点配置面板。如下方：开始节点中的必填项，试下点击开始节点后直接关闭配置面板的效果。

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

### 复杂联动示例
以下示例了如何在`settingWidget`中使用复杂联动，以及如何在弹窗关闭时增加必填校验。

需要暴露`validateForm`方法，以便关闭弹窗时进行必填校验。
```js
export const AdvancedSettingWidget = forwardRef<
  AdvancedSettingWidgetRef,
  AdvancedSettingWidgetProps
>(({ value, onChange, readOnly }, ref) => {
  // ...组件实现
  useImperativeHandle(ref, () => ({
  validateForm: async () => {
    return await form
      .validateFields()
      .then(() => true)
      .catch(() => false);
  },
}));
});
```

<code src="./demo/custom-flow/advancedLinkageCase"></code>

这个示例适用于以下场景：

- 需要根据不同配置类型显示不同表单项的场景
- 表单项之间存在复杂联动关系的场景
- 需要动态添加表单项的场景
- 需要实现严格表单验证的场景

通过这个示例，你可以了解如何使用 settingWidget 方式实现复杂的表单交互，以及如何处理表单验证、数据联动等高级需求。这种方式比简单的 Schema 方式更灵活，能够满足更复杂的业务需求。
