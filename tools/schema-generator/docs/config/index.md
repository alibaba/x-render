---
title: 配置
nav:
  order: 1
  title: 配置
toc: menu
---

## Props

### defaultValue

- type: `object`

默认一进入编辑器展示的表单对应的 schema。格式参考 schema 生成器的输出 schema

### transformer

- type: `object`

默认值为

```js
{
  from: schema => schema,
  to: schema => schema
}
```

`from` 写从你需要的 schema 到 form-render 的 schema 的转换函数  
`to` 写反向的转换函数

### extraButtons

- type: `array`

例如：

```js
[
  {
    text: '保存',
    onClick: () => {
      alert(1);
    },
  },
  {
    text: '跳转',
    onClick: () => {
      window.open('https://www.taobao.com');
    },
  },
];
```

1. 自定义按钮接受所有 antd 的 props，同时还支持 text 参数用于简单设置按钮文案
2. 在编辑区顶部添加更多的自定义按钮。可能你也希望能去掉一些默认展示的按钮，例如我不想要“导入”这个按钮，这也可以通过这个 props 实现，“导入”是默认展示里的第三个按钮，那么如下配置：

```js
extraButtons: [true, true, false, true, { text: '测试' }];
```

简单的说，将不需要的按钮配为`false`，需要的按钮配为`true`。注意只有这两个值会被读取。

### settings | commonSettings | globalSettings

- type: `array` | `object` | `object`

1. `settings` 用于修改左右侧栏的配置。默认的 `defaultSettings` 配置可以从`fr-generator`中导出

```js
import Generator, {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
} from 'fr-generator';
```

基本的配置说明如下：

```js
[
  {
    title: '基础组件', // 最外层的分组名称
    widgets: [
      { // 每个组件的配置，在左侧栏是一个按钮
        name: 'input', // 按钮生成的schema的key值
        text: "输入框", // 在左侧栏按钮展示文案
        widget: "input", // 如果是基本组件，这个字段注明它对应的widgets
        schema: {title: "输入框", type: "string"}, // 组件对应的schema片段
        setting: { ... } // 组件的配置信息，也使用form-render的schema来描述
      },
      {
        ...
      }
    ]
  },
  {
    title: '高级组件',
    widgets: [ ... ]
  }
]
```

2. `commonSettings` 用于设定通用配置，默认配置见 `defaultCommonSettings`
   有些基本配置，例如 title，key，组件宽度，组件 label 宽度等，你希望每个 setting 都包含，在`commonSettings` 里配。一个 demo 配置例如：

```js
{
  title: { title: "标题", type: "string" },
  description: { title: "说明", type: "string" }
}
```

3. `globalSettings` 用于设定全局的配置, 默认配置见 `defaultGlobalSettings`。一个 demo 配置如下：

```js
{
  type: "object",
  properties: {
    labelWidth: {
      max: 300,
      title: "标签宽度",
      type: "number",
      "ui:widget": "slider"
    }
  }
}
```

### widgets

- type: 'object'

使用方法可参见[form-render 官方文档](https://x-render.gitee.io/form-render/config/props#widgets) 的 widgets 入参，用法相同。也可见完整[demo](/demo#左右侧栏配置--自定义组件)

简单的说：

1. 写一个自定义组件

```js
const A = () => <div>hello</div>;
```

2. 注入到 fr-generator

```js
<FR widgets={{ A }} />
```

3. schema 中使用, settings 的配置不赘述看个样例能懂

```json
{
  "title": "自定义组件",
  "type": "string",
  "ui:widget": "A"
}
```

### onChange

- type: `function`

表单 data 变化回调，入参为表单的 data

### onSchameChange

- type: `function`

表单 schema 变化回调，入参为导出的 schema

## 方法

### getValue

- type: `function`

可以从 ref 中取到 getValue 方法，获取导出的 schema 值，详见“开始使用”中的现实样例

### setValue

- type: `function`

(schema) => void。从外部强制修改表单设计器的现有 schema

### copyValue

- type: `function`

调用可将现有 schema 拷贝到剪贴板

## 注意

使用此组件时，外层要包裹的 div **一定要给一个高度**，否则会默认 min-height: 30vh
