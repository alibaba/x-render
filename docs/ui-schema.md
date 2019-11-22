# uiSchema 配置

### 概述

- uiSchema 虽然不是必备参数，但是通过它可以增强 FormRender 展示的丰富性
- 通过 uiSchema 可以覆盖 propSchema 中 type 对应的默认 widget 组件
- 通过 `ui:disabled`、`ui:readonly`、`ui:hidden` 属性来控制表单项的 UI 展示
- 通过 `ui:options` 属性能够实现大量特定的 ui 展示选项

### 书写规范

- uiSchema 里所有的字段都以 `ui:` 开始，如 `ui:widget`。
- 为了满足各用户的使用偏好，uiSchema 可以单独书写，也可以完全归并到 propsSchema，例如：

```json
{
  "propsSchema": {
    "type": "object",
    "properties": {
      "string": {
        "title": "字符串",
        "type": "string"
      }
    }
  },
  "uiSchema": {
    "string": {
      "ui:width": "50%"
    }
  }
}
```

可以合并为

```json
{
  "propsSchema": {
    "type": "object",
    "properties": {
      "string": {
        "title": "字符串",
        "type": "string",
        "ui:width": "50%"
      }
    }
  }
}
```

事实上 form-render 内部处理 schema 时第一件事就是将 propsSchema 和 uiSchema 合并，所以上述两种 schema 的渲染效果是一致的。前者适用于遵循 json schema 的团队无缝接入，后者在书写上更为高效。

### 覆盖 propSchema 中表单项对应的默认 UI Widget

| 类型   |            type            | 默认 widget | 其他支持 widget(备注) |
| ------ | :------------------------: | :---------: | :-------------------: |
| 布尔值 |          boolean           |  checkbox   |     switch、radio     |
| 字符串 |           string           |    input    | color、date、textarea |
| 数字   |           number           |   number    |        slider         |
| 单选项 | string/number(带属性 enum) |   select    |         radio         |
| 多选   |     array(带属性 enum)     | checkboxes  |      multiSelect      |

### 控制表单项的 UI 展示（共通配置）

- `ui:disabled`: 可控制 input、number、date、checkbox、radio、select、switch 对于组件的 disabled 属性(变灰不可点击)
- `ui:readonly`：可控制 input、number 组件中的 readonly 属性(不可编辑，但不变灰)
- `ui:hidden`：可控制所有基础组件是否显示，可使用 true/false 或表达式，例如：

```json
"age": {
  "ui:hidden": false
}
// 或
"agree": {
  "title": "是否同意",
  "type": "boolean"
},
"personType": {
  "title": "类型",
  "type": "number",
  "enum": [1, 2, 3]
}
...
"age": {
  "ui:hidden": "agree==false && personType!=2"
}
```

如果使用如上表达式， age 元素将在 agree 元素的值为 false 且 personType 元素不等于 2 时隐藏。
注：目前`ui:hidden`支持`==`，`!=`，`>`和`<`四种运算符和`&&`（且），`||`（或）两种关系符，使用的判断字段（表达式左侧）必须是组件的同级字段。

虽然不推荐，但针对关联组件不在同级的情况，可以使用约定的 `formData` 关键字寻值：

```json
// 例如 formData 的结构为：
"formData": {
  "x": {
    "y": "abc"
  },
  ...
}
// 注意表达式约定以 "formData." 开头
"xxxx": {
  "ui:hidden": "formData.x.y!='abc'"
}
```

- `ui:className`：添加组件 root 元素的 className（和 fr-field 这个 className 在同级），用于自定义单独组件的样式
- `ui:width`：单个基础组件的长度，建议使用百分比例如`"ui:width":"50%"`。

### Options

- `ui:options` 里存放特定元素的特定配置。例如`textarea`的`rows`

```json
"textareaDemo": {
  "ui:widget": "textarea",
  "ui:options": {
    "rows": 5
  }
}
```

基本上所有`antd`文档中组件的 props 都可以使用 `ui:options` 的方式来直接使用。除此之外我们还提供了一些特别 options：

| option     |  类型   |   可用组件    |                    说明                    |
| ---------- | :-----: | :-----------: | :----------------------------------------: |
| foldable   | boolean | 列表（array） | `{ foldable: true }`用于长列表的收起和展开 |
| hideDelete | boolean | 列表（array） |    `{ hideDelete: true }`隐藏“删除”按钮    |

### 如何编写 uiSchema 设置

```json
{
  "disabledDemo": {
    "ui:disabled": true
  },
  "dateDemo": {
    "ui:widget": "date"
  },
  "objDemo": {
    // 覆盖object里面的元素对应的组件
    "background": {
      "ui:widget": "color"
    }
  },
  "arrDemo": {
    // 数组列表除了默认的新增按钮外，自定义的按钮组（每个按钮点击时会执行对应的callback，使用前请先咨询@侑夕）
    "ui:extraButtons": [
      {
        "text": "Excel导入",
        "icon": "copy",
        "callback": "onCallback1"
      },
      {
        "text": "删除全部",
        "icon": "delete",
        "callback": "clearAll"
      },
      {
        "text": "复制上个",
        "icon": "copy",
        "callback": "copyLast"
      }
    ]
  }
}
```
