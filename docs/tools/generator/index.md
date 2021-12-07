---
order: 1
title: 使用文档
group:
  title: Schema 编辑器
toc: content
---

## 如何使用

### 安装

```bash
npm i fr-generator
```

### 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import Generator from 'fr-generator';

const defaultValue = {
  type: 'object',
  properties: {
    inputName: {
      title: '简单输入框',
      type: 'string',
    },
  },
};

const Demo = () => {
  return (
    <div style={{ height: '80vh' }}>
      <Generator defaultValue={defaultValue} />
    </div>
  );
};

export default Demo;
```

## API

### Props

| 参数               | 说明                            | 类型       | 默认值                                                                                                                     |
| ------------------ | ------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| getId              | 设置如何生成新的 id             | `Function` | name => `${name}_${nanoid(6)}`                                                                                             |
| hideId             | 隐藏组件 ID                     | `boolean`  | `false`                                                                                                                    |
| fixedName          | 固定 settings 的 name 为组件 ID | `boolean`  | `false`                                                                                                                    |
| canDelete          | 组件删除控制                    | `boolean`  | `Function`                                                                                                                 | `false` |
| defaultValue       | 默认表单 schema                 | `object`   | `DEFAULT_SCHEMA`                                                                                                           |
| transformer        | schema 双向转换                 | `object`   | `{ from, to, fromSetting, toSetting }`                                                                                     |
| extraButtons       | 操作栏按钮                      | `array`    | `extraButton[]`                                                                                                            |
| controlButtons     | 选中项操作按钮                  | `array`    | `controlButton[]`                                                                                                          |
| settings           | 左右侧栏配置                    | `array`    | [`defaultSettings`](https://github.com/alibaba/form-render/blob/master/tools/schema-generator/src/Settings/index.js)       |
| commonSettings     | 通用配置                        | `object`   | [`defaultCommonSettings`](https://github.com/alibaba/form-render/blob/master/tools/schema-generator/src/Settings/index.js) |
| globalSettings     | 全局配置                        | `object`   | [`defaultGlobalSettings`](https://github.com/alibaba/form-render/blob/master/tools/schema-generator/src/Settings/index.js) |
| widgets            | 自定义组件                      | `object`   | `{}`                                                                                                                       |
| mapping            | 组件和 schema 的映射规则        | `object`   | `{}`                                                                                                                       |
| fieldRender        | 自定义组件渲染函数              | `Function` | `(schema, widgetProps, children, originNode) => originNode`                                                                |
| fieldWrapperRender | 自定义容器组件渲染函数          | `Function` | `(schema, isSelected, children, originNode) => originNode`                                                                 |

#### extraButton

| 属性    | 说明             | 类型              |
| ------- | ---------------- | ----------------- |
| text    | 按钮文案         | `string`          |
| onClick | 按钮点击回调函数 | `(event) => void` |

数组前四项为布尔值，决定默认按钮是否展示。
支持 antd 按钮组件的所有其他属性 https://ant.design/components/button-cn/#API

#### controlButton

| 属性    | 说明             | 类型                      |
| ------- | ---------------- | ------------------------- |
| text    | 按钮文案         | `string`                  |
| onClick | 按钮点击回调函数 | `(event, schema) => void` |

数组前两项为布尔值或函数，决定默认按钮是否展示，函数入参为选中项 schema。

### Events

| 事件名         | 说明                 | 回调参数        |
| -------------- | -------------------- | --------------- |
| onChange       | 表单 data 变化回调   | 表单的 data     |
| onSchemaChange | 表单 schema 变化回调 | 导出的 schema   |
| onCanvasSelect | 画布组件选择回调     | 选中项的 schema |

### Methods

| 事件名         | 说明                       | 入参     |
| -------------- | -------------------------- | -------- |
| getValue       | 获取导出的 schema 值       | -        |
| setValue       | 从外部强制修改 schema      | `schema` |
| copyValue      | 将现有 schema 拷贝到剪贴板 | -        |
| getErrorFields | 获取配置项校验错误         | -        |

## 案例演示

### 浮窗接入

用于 schema 的可视化修改

<code src='./demo/modal.jsx' />

### 侧栏配置

使用 settings/commonSettings 自由配置左右侧栏内容，并使用 widgets 注入和使用自定义组件

“计数器”是自定义组件。

<code src='./demo/settings.jsx' />

### 自定义布局

<code src='./demo/layout.jsx' />

### Schema 互转

使用 `transformer` 这个 props，进行 schema 的互转

<code src='./demo/transformer.jsx' />

## 常见问题

**1、如何控制编辑器高度**

给组件外层要包裹的 div 设置高度即可，否则为默认值 min-height: 30vh
