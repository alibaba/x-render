---
order: 2
group:
  order: 4
  title: API
toc: content
---

# Schema

`schema` 用于描述表单的基本信息、结构和校验。`schema` 在结构上遵循 [JSON Schema 国际规范](https://json-schema.org/understanding-json-schema/)。
表单元素类型总共有三种：`item`，`object`，`list`。

## 一、顶层协议
```js
{
  type: 'object', // 必须写：顶层固定配置
  displayType: 'column', // 表单项 label 布局方式：row | column | inline
  colmn: 1, // 表单布局：一行多列
  properties: { 
    // 表单元素
  }
}
```
## 二、item 协议
`item`：即最基本的输入框，选择框等

基础
```js
url: {
  title: 'url输入框',
  type: 'string',
  widget: 'input'
}
```

全部
```js
url: { // 字段名
  title: 'url输入框', // 控件名称

  // 校验配置
  min: null, // 
  max: null, // 
  required: null, // 是否必填
  // 描述里组件的值的数据类型。用于校验数据类型，也用于判断使用哪个组件来渲染，以及校验表单数据
  type: 'string', // 'string' | 'number' | 'boolean' | 'array' | 'range' | 'html' | 'block'
  // 用来描述输入框的格式，辅助 type 一同用于判断使用哪个组件来渲染，以及校验表单数据
  format: null //`'image' | 'textarea' | 'color' | 'email' | 'url' | 'dateTime' | 'date' | 'time' | 'upload'`

  // 控制状态
  hidden: false, // 是否隐藏
  disabled: false, // 是否禁用
  readOnly: false // 是否只读
  readOnlyWidget: '', // 指定只读渲染组件

  // 提示
  description: '', // 基础描述
  tooltip: { title: '' } // 气泡描述
  descWidget: '', // 自定义描述显示
  placeholder: '',
  extra: null, // 用于在元素下展示更多说明信息，extra 可以是 html string，也可以是纯文案，会展示在元素下面一行紧贴。

  // 只在选择类组件中使用
  enum: [], // 用于描述枚举值的值和文案，与 enumNames 配合使用。
  enumNames: [] // 用于描述枚举值的值和文案，与 enum 配合使用。

  props: {} // antd props 属性
  
  // 其他配置
  dependencies: [], // [path]： 当依赖的元素更新时，会触发本元素的重新渲染，用于复杂的表单联动。
  className: '', // 元素 class 名称
}
```

## 三、object 协议
`object`：一个包含其他元素的 block，可用于表单项的分类
```js
detail: { // 字段名
  title: '基础信息', // 标题
  type: 'object', // 固定配置
  colmn: 1, // 表单布局，一行多列
  widget: 'collapse', // 对应组件：collapse | card | 
  props: {}, // 组件属性
  properties: { 
    // 表单元素
  }
}
```

## list 协议
`list`：可动态增减的表单项
```js
list: { // 字段名
  title: '人员列表', // 标题
  type: 'array', // 固定配置
  widget: 'card', // 组件：cardList | simpleList | tableList | drawerList | virtualList
  items: { // 固定配置
    title: '基础信息', // 标题
    type: 'object', // 固定配置
    colmn: 1, // 表单布局，一行多列
    widget: 'collapse', // 对应组件
    props: {}, // 组件属性
    properties: { 
      // 表单元素
    }
  },

  min: 1, // 列表最小长度
  max: 5, // 列表最大长度
}

```