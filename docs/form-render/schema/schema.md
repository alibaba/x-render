---
order: 1
group:
  order: 2
  title: 协议
toc: content
---

# Schema 协议

## 概述

1. **`schema` 是 \<FormRender/\> 的必填 props，用于描述表单的基本信息、结构和校验。他在结构上使用了 `JSON Schema` 国际规范(<a href="https://json-schema.org/understanding-json-schema/" target="_blank">Understanding JSON Schema</a>)，例如：**

   ```json
   // 对象结构如下:
   {
     "title": "对象",
     "type": "object",
     "properties": {
       "count": {
         "title": "数字",
         "type": "number"
       }
     }
   }
   // 对象列表结构如下：
   {
     "title": "对象数组",
     "type": "array",
     "items": {
       "type": "object",
       "properties": {
         "count": {
           "title": "数字",
           "type": "number"
         }
       }
     }
   }
   ```

2. **单个 schema 的书写分为`基础属性`, `rules` 和 `props`，`基础属性`为各个组件共通的描述，`rules` 描述校验补充信息，`props` 描述组件 props，例如：**

   ```json
   {
     "type": "object",
     "properties": {
       "count": {
         // 基础属性
         "title": "代号",
         "type": "string",
         "min": 6,
         // rules (补充校验信息)
         "rules": [
           {
             "pattern": "^[A-Za-z0-9]+$",
             "message": "只允许填写英文字母和数字"
           }
         ],
         // props (补充antd组件props)
         "props": {
           "allowClear": true
         }
       }
     }
   }
   ```

3. **虽然这里我们只以 json 格式为例，但 javascript object 作为入参完全可以。**

## 基础属性（共通的）

所有表单原素会用到的属性。从 FormRender 内部实现的角度：

1. `type`, `format`, `enum` 和 `widget` 字段决定了使用哪个组件来渲染。具体判断规则见[内置组件](/form-render/advanced/widget#内置组件)
2. `type`, `format`, `min`, `max`, `required` 和 `rules` 字段用于做校验判断
3. `props` 字段用于补充组件支持的更为细致的属性

一个简单的使用各种“基础属性”的样例如下：

```js
export const basic = {
  displayType: 'row',
  labelWidth: 130,
  type: 'object',
  properties: {
    url: {
      title: 'url输入框',
      placeholder: '//www.taobao.com',
      type: 'string',
      format: 'url',
      required: true,
    },
    email: {
      title: 'email输入框',
      type: 'string',
      format: 'email',
    },
    string: {
      title: '正则校验字符串',
      description: 'a-z',
      type: 'string',
      hidden: false,
      disabled: true,
    },
  },
};
```

```jsx
import React from 'react';
import FR from '../demo/FR';
import { basic } from '../json/schema';

export default () => <FR schema={basic} />;
```

#### title

- 类型：`string`
- 详细：表单的标题信息，作为 label 展示，注意 title 为""时占位，title 不写时不占位

#### description

- 类型：`string`
- 详细：表单的描述信息，常将填写注意点放入此参数

#### type

- 类型：one of [`'string'`, `'number'`, `'boolean'`, `'array'`, `'object'`, `'range'`, `'html'`]
- 详细：元素的类型。用于校验数据类型，也用于判断使用哪个组件来渲染，以及校验表单数据

#### format

- 类型：one of [`'image'`, `'textarea'`, `'color'`, `'email'`, `'url'`, `'dateTime'`, `'date'`, `'time'`, `'upload'`]
- 详细：用来描述输入框的格式，辅助 type 一同用于判断使用哪个组件来渲染，以及校验表单数据

  ```json
  // 默认 input
  "input": {
    "title": "简单输入框",
    "type": "string",
  }
  // textarea
  "textarea": {
    "title": "简单文本编辑框",
    "type": "string",
    "format": "textarea"
  }
  // 颜色组件
  "color": {
    "title": "颜色选择",
    "type": "string",
    "format": "color"
  }
  // 日期组件
  "date": {
    "title": "日期选择",
    "type": "string",
    "format": "date" // "dateTime"
  }
  // 时间组件
  "time": {
    "title": "时间选择",
    "type": "string",
    "format": "time"
  }
  // 图片链接组件
  "image": {
    "title": "图片展示",
    "type": "string",
    "format": "image"
  }
  ```

#### default

- 类型：any
- 详细：组件的默认值，注意默认的对象组件使用 default 无效（其值会由子元素值决定），其他类型包括 array 都可以使用 default：

  ```json
  "list": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "x": {
          "type": "string",
        }
      }
    },
    "default": [{ "x": "a" }, { "x": "b" }]
  }
  ```

#### required

- 类型：boolean
- 详细：用于判断是否必填

#### placeholder

- 类型：string
- 详细：Input 等元素的 placeholder。这个属性太常用了，虽然不是每个组件都有，但 80%以上都有，所以决定放在“基础属性”

#### bind

- 类型：string | string[] | false
- 详细：

1. 当服务端接口获取的字段与你希望的表单展示结构不同时，可以通过 bind 字段绑定的方式指明表单的某个字段对应的是外部数据的另一个字段。详细例子见 [“表单与外界的交互”](/form-render/advanced/form-methods) 的例 3
2. 用户并不希望纯展示的字段也出现在表单中，此时，使用 bind: `false` 可避免字段在提交时出现
3. 注意：请不要 bind 一个数组结构下面的字段，目前没有对此进行处理，所以会无效（在未来这个限制会解除）

#### min

- 类型：int
- 详细：最小值。type:string/array 时代表最小长度，type:number 时代表最小值

#### max

- 类型：int
- 详细：最大值。type:string/array 时代表最大长度，type:number 时代表最大值

#### disabled (0.x 版本 `ui:disabled`)

- 类型：boolean
- 详细：组件是否禁用状态

#### readOnly (0.x 版本 `ui:readonly`)

- 类型：boolean
- 详细：组件是否只读状态

#### hidden (0.x 版本 `ui:hidden`)

- 类型：boolean
- 详细：组件是否隐藏状态

#### displayType (0.x 版本 `ui:displayType`)

- 类型：`'row'` | `'column'`
- 详细：Label 与 Field 的展示关系，row 表示并排展示，column 表示两排展示

#### width (0.x 版本 `ui:width`)

- 类型：string
- 详细：单个元素的展示宽度（带 label 一起），例如 '20%'

#### labelWidth (0.x 版本 `ui:labelWidth`)

- 类型：number | string
- 默认值：110
- 详细：label 的宽度，数字值单位为 px，也可使用'20%'/'2rem'等

#### widget (0.x 版本 `ui:widget`)

- 类型：string
- 详细：指定使用哪个组件来渲染，是优先级最高的一个字段。常用语指明使用某个“自定义组件”。注意以下这些内置组件没有自然匹配的 schema，也必须用 widget 字段指明：
  widget:slider 滑动输入条
  widget:rate 五星评分
  widget:cascader 级联选择
  widget:treeSelect 树形选择
  详细的如何使用 `widget` 字段和 `widgets` props 来做定制化表单渲染，请参见[自定义组件](/form-render/advanced/widget)

## 基础属性（非共通的）

以下是特定组件中使用的基础属性，并非所有组件通用。

### 对象

`properties` 用于包裹对象的子属性：

```json
{
  "title": "对象",
  "type": "object",
  "properties": {
    "tickets": {
      "title": "门票数",
      "type": "number"
    }
  }
}
```

### 列表

- `items`：用于描述 Array 中每个 item 的结构。item 一般是对象
- `min`：最少数组项为几项
- `max`：最多数组项为几项

列表的展示有四种模式：

1. 默认使用 widget: `'list0'`，卡片 list 的展示，适宜有复杂结构，但 item 数量不大的场景
2. 如果每个 item 数据 1-2 条，且没有复杂结构（例如对象、列表），建议使用 widget: `'list1'`
3. 如果每个 item 数据 3-5 条，且没有复杂结构（例如对象、列表），建议使用 widget: `'list2'`
4. 如果每个各 item 数据量大，或者结构复杂，建议使用 widget: `'list3'`

```json
{
  "title": "对象数组",
  "type": "array",
  "min": 1,
  "max": 3,
  "widget": "list0",
  "items": {
    "type": "object",
    "properties": {
      "tickets": {
        "title": "门票数",
        "type": "number"
      }
    }
  }
}
```

### 选择类组件

#### enum

- 类型：string | number
- 详细：选项值

#### enumNames

- 类型：string | number
- 详细：选项的文案

注: 旧版 form-render 会默认选中第一项，但是新版除非通过 default 指明，否则不会选中任何一项，且初始值是 undefined

```json
// 单选
{
  "title": "单选",
  "type": "string",
  "enum": ["hz", "wh", "gy"],
  "enumNames": ["杭州", "武汉", "贵阳"],
  "default": "hz"
}
// 多选
{
  "title": "多选",
  "type": "array",
  "items": {
    "type": "string"
  },
  "enum": ["hz", "wh", "gy"],
  "enumNames": ["杭州", "武汉", "贵阳"]
}
```

### Range 组件

长度为 2 的 array，目前支持的组件为时间范围

```json
{
  "title": "日期范围",
  "type": "range",
  "format": "dateTime",
  "placeholder": ["开始", "结束"]
}
```

### 文本组件

只要注明`type: "html"`, FR 支持 html 元素的渲染，最常用的是纯文本, 如下例：

```json
"html": {
  "title": "纯字符串",
  "type": "html",
  "default": "hello world"
}
```

## rules（校验规则）

1. FormRender v1.x 开始，校验的支持异步校验规则，支持的规则也扩展到 antd form 所有的 rules。antd 在底层使用了 `async-validator`，这同时是 FormRender 的依赖，所以所有符合[`async-validator`文档](https://github.com/yiminghe/async-validator#type) 的规则都适用于 FormRender，例如

   ```json
   "zip": {
     "title": "zip code",
     "type": "string",
     "rules": [{ "len": 8, "message": "invalid zip" }]
   }
   ```

2. 作为 FormRender 书写的特别规则，由于以下个字段同时涉及到了展示和校验，所以已经放在“基础属性”中，而不需要在 rules 中特别注明

```text
type
format
min
max
required
```

3. 如果你想定制对应字段的校验展示文案，请同时书写基础属性和 rules：

```json
"zip": {
  "title": "zip code",
  "type": "string",
  "required": true,
  "rules": [{ "len": 8, "message": "invalid zip"  },{ "required": true, "message": "zip is required"  }]
}
```

## props

- 类型：object
- 详细说明：

  1. 当基础字段不够描述组件的展示时，使用 props 字段作为扩展。props 的具体属性可以查询 antd 的组件文档。所有 props 中的属性都会直接透传给组件，所以理论上 FormRender 支持所有 antd 组件库支持的展示，例如

  ```js
  url: {
    title: "网址",
    type: "string",
    props: {
      prefix: 'https://',
      suffix: '.com'
    }
  }
  ```

  2. 一些内置的 widget 组件是由多个（或者复杂结构的）自然组件组成的，此时我们为每个自然组件开了一个 props 入口，例如 list 组件有 props 和 itemProps 两个属性，支持用户对 list 本身以及每个 item 的定制化展示 & 功能需求。所有内置的 props 见下面列表

  3. 当用户手写自定义组件是复合组件（由多个自然组件组合而成）时，推荐做法是 props 中放置一些全局需要使用的 props，会直接透传给组件，而其中单个元素的定制 props 使用 props1，props2，... 这样的命名。凡是包含 props（不区分大小写）的 schema 的 key 值，都会原样传递给自定义组件，例如


      ```js
        percentInput: {
          title: "百分比输入",
          type: "number",
          props: {
            showInput: false
          },
          inputProps: {
            suffix: '%'
          },
          percentProps: {
            step: 10
          }
        }
      ```

3. 传递给自定义组件的 props 为


      ```js
      {
        type: 'number',
        showInput: false,
        inputProps: {
          suffix: '%'
        },
        percentProps: {
          step: 10
        }
      }
      ```

## 内置组件 props

### list 列表

**props**

| props     | 类型  |                 说明                  |
| --------- | :---: | :-----------------------------------: |
| hideTitle | array | 只支持“list1”，隐藏 title，展示更紧凑 |
| buttons   | array |             下详 （注 1）             |

**itemProps**

| props   | 类型  |     说明      |
| ------- | :---: | :-----------: |
| buttons | array | 下详 （注 2） |

**注 1：**

列表默认只展示“新增一条”按钮。`buttons` 用于添加更多列表操作按钮

```json
"arrDemo": {
  ...
  "props": {
    "buttons": [
      {
        "text": "Excel导入",
        "icon": "copy",
        "callback": "someCallback"
      }
    ]
  }
}
```

FormRender 会到 `window.someCallback` 上寻找回调函数，此回调函数可接受参数 `value`和 `schema`。返回值会作为新的列表值

```js
// value: 整个数组的值，onChange: 传入改变后的数组值，触发state更新
// 使用Object入参，为了将来好扩展
window.someCallback = ({ value, schema }) => {
  return [];
};
```

如上的 someCallback 会清空整个列表。

**注 2：**

itemProps.buttons 用于扩展列表里每个 item 的更多操作

```json
"arrDemo": {
  ...
  "itemProps": {
    "buttons": [
      {
        "text": "复制",
        "icon": "copy",
        "callback": "copyMe"
      }
    ]
  }
}
```

用法相同, FormRender 会尝试在点击复制按钮时执行 `window.copyMe`。`window.copyMe`的入参为 value, index, schema ，返回值会作为新的列表值

```js
// 注意 value 是整个列表的 value
window.copyMe = ({ value, index, schema }) => {
  const item = value[index];
  value.splice(index, 0, item);
  return value;
};
```

### object 对象

props

目前还没有，未来会扩展

### upload 上传

props

upload 组件的主体 props，参考 [antd/upload 文档](https://ant.design/components/upload/)

buttonProps

上传按钮 Button 组件的 props，参考 antd/button

### color 颜色选择

props

colorPicker 组件的 props，参考[rc-color-picker 文档](https://www.npmjs.com/package/rc-color-picker)

inputProps

输入框 input 的 props，参考 antd/input

### slider 拖动选择数字

props

1. slider 组件的主体 props，支持所有 slider 组件的 props，参考 [antd/slider 文档](https://ant.design/components/slider/)

2. 还支持`hideInput`, 默认`false`，用于控制是否展示 Input

inputProps

用于控制 input 展示的 props，支持所有 input 组件的 props，参考 [antd/input 文档](https://ant.design/components/input/)
