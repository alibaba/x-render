# uiSchema 配置

### 概述

- uiSchema 虽然不是必备参数，但是通过它可以增强 FormRender 展示的丰富性，例如：
- 通过 uiSchema 可以覆盖 propSchema 中 type 对应的默认 widget 组件
- 通过 `ui:disabled`、`ui:readonly`、`ui:hidden` 属性来控制表单项的 UI 展示
- 通过 `ui:options` 属性能够实现大量特定的 ui 展示选项

### 使用规范

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

### 共通的表单 UI 配置

- `ui:disabled`: 可控制 input、number、date、checkbox、radio、select、switch 对于组件的 disabled 属性(变灰不可点击)
- `ui:labelWidth` (v0.5.1) 新增。用于控制本元素以及其子元素（如果本元素是对象或列表）的标签宽度，使用方法与 FR 的全局变量`labelWidth`相同

```js
"someList": {
  // 写法1
  "ui:labelWidth": 180,
  // 写法2
  "ui:labelWidth": '4rem',
  // 写法3
  "ui:labelWidth": '20%',
}
```

- `ui:readonly`：可控制 input、number 组件中的 readonly 属性(不可编辑，但不变灰)，列表也支持`readonly`，效果是列表的控件都会隐藏，导致列表不能增、删和拖拽，进入“只读”模式。但注意列表内的内容还是允许修改的，所以特别要注意如果列表套列表的场景，内部的列表也要 "ui:readonly": true

```js
"someList": {
  "ui:readonly": true
}
```

- `ui:hidden`：可控制所有基础组件是否显示，可使用 true/false 或函数表达式，例如：

```json
"age": {
  "ui:hidden": false
}
// 或
"agree": {
  "title": "是否同意",
  "type": "boolean"
},
"someObj": {
  "title": "对象",
  "type": "object",
  "properties": {
    "personType": {
      "title": "类型",
      "type": "number",
      "enum": [1, 2, 3]
    },
    "age": {
      "ui:hidden": "{{formData.agree==false && rootValue.personType!=2}}"
    }
  }
}
```

如果使用如上函数表达式，age 组件将在 agree 组件的值为 false 且 personType 组件不等于 2 时隐藏。其中`formData`指向整个表单值，`rootValue`指向对应组件的父级元素值。函数表达式的详细写法见[如何联动](docs/function)

- `ui:className`：添加组件 root 元素的 className（和 fr-field 这个 className 在同级），用于自定义单独组件的样式
- `ui:width`：单个基础组件的长度，建议使用百分比例如`"ui:width":"50%"`。

### 特定表单元素的 UI 配置（一律使用`ui:options`）

`ui:options` 里存放特定元素的特定配置。例如`textarea`的`rows`

```json
"textareaDemo": {
  "ui:widget": "textarea",
  "ui:options": {
    "rows": 5
  }
}
```

1. **基本上所有`antd`/ `fusion`文档中组件的 props 都可以使用 `ui:options` 的方式来直接使用。**
2. form-render 也内置了几个的常用的`ui:options`，目前全是列表的:

| option     |                    类型                     |   可用组件    |                                      说明                                       |
| ---------- | :-----------------------------------------: | :-----------: | :-----------------------------------------------------------------------------: |
| foldable   |                   boolean                   | 列表（array） |                   `{ foldable: true }`用于长列表的收起和展开                    |
| hideDelete | boolean \| (formData, rootValue) => boolean | 列表（array） | `{ hideDelete: true }`隐藏“删除”按钮。若要隐藏增删改查，使用`ui:readonly`: true |
| buttons    |                    array                    | 列表（array） |                                      下详                                       |

列表默认展示“新增”按钮。`buttons` 用于添加更多列表操作按钮
写法如：

```json
"arrDemo": {
  "ui:options": {
    "buttons": [
      {
        "text": "Excel导入",
        "icon": "copy",
        "callback": "someCallback"
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

1. 其中`clearAll` 和 `copyLast` 是内置函数, 前者用于清空数组，后者用于复制最后一个元素
2. `callback` 也可使用自定义的名称 `someCallback`, 此时 form-render 会到 window.someCallback 上寻找回调函数，此回调函数可接受两个参数 `value` 和 `onChange`。

```js
// value: 整个数组的值，onChange: 传入改变后的数组值，触发state更新
window.someCallback = (value, onChange) => {
  onChange([]);
};
```

如上的 someCallback 会清空整个列表。

### 如何编写 uiSchema 设置

```json
{
  "disabledDemo": {
    "ui:disabled": true
  },
  "dateDemo": {
    "ui:widget": "date" // 效果和 format: "date" 一致
  },
  "objDemo": {
    // 覆盖object里面的元素对应的组件
    "background": {
      "ui:widget": "color"
    }
  },
  "arrDemo": {
    // 数组列表除了默认的新增按钮外，自定义的按钮组（每个按钮点击时会执行对应的callback，使用前请先咨询@侑夕）
    "ui:options": {
      "buttons": [
        {
          "text": "Excel导入",
          "icon": "copy",
          "callback": "someCallback"
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
}
```
