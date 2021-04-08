---
order: 1
title: Schema 编辑器
group:
  title: Schema 编辑器
toc: menu
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
  schema: {
    type: 'object',
    properties: {
      inputName: {
        title: '简单输入框',
        type: 'string',
      },
    },
  },
  displayType: 'row',
  showDescIcon: true,
  labelWidth: 120,
};

const Demo = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Generator defaultValue={defaultValue} />
    </div>
  );
};

export default Demo;
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认表单 schema | `object` | `null` |
| transformer | schema 双向转换 | `object` | FormRender 适配转换 |
| extraButtons | 操作栏按钮 | `array` | `[]` |
| settings | 左右侧栏配置 | `array` | `[]` |
| commonSettings | 通用配置 | `object` | `{}` |
| globalSettings | 全局配置 | `object` | `{}` |
| widgets | 自定义组件 | `object` | `{}` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onChange | 表单 data 变化回调 | 表单的 data |
| onSchameChange | 表单 schema 变化回调 | 导出的 schema |

### Methods

| 事件名 | 说明 | 入参 |
| --- | --- | --- |
| getValue | 获取导出的 schema 值 | - |
| setValue | 从外部强制修改 schema | `schema` |
| copyValue | 将现有 schema 拷贝到剪贴板 | - |

## 案例演示

### 浮窗接入

用于 schema 的可视化修改

<code src='./demo/modal.jsx' />

### Schema 互转

使用 `transformer` 这个 props，进行 schema 的互转

<code src='./demo/transformer.jsx' />

### 侧栏配置

使用 settings/commonSettings 自由配置左右侧栏内容，并使用 widgets 注入和使用自定义组件

“服务端下拉选框”是自定义组件。

<code src='./demo/settings.jsx' />

## 注意

使用此组件时，外层要包裹的 div **一定要给一个高度**，否则会默认 min-height: 30vh
