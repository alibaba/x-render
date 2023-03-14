---
order: 1
toc: content
group: 
  title: API
  order: 4
---

# 协议配置项

`schema` 用于描述表单的基本信息、结构和校验。`schema` 在结构上遵循 [JSON Schema 国际规范](https://json-schema.org/understanding-json-schema/)。
表单元素类型总共有三种：`item`，`object`，`list`。

## 一、表单配置项
```js
{
  type: 'object', 
  displayType: 'column', 
  colmn: 1, 
  properties: {}
}
```
### type
type: 'object'（固定配置）

### displayType
表单项 label 布局方式：row | column | inline

### column
表单布局：一行多列

### properties
表单元素集合

### labelWidth
固定表单标签的宽度







## 二、嵌套控件配置项
一个包含其他元素的 block，可用于表单项的分类

```js
detail: { // detail 是字段名
  title: '基础信息',
  type: 'object',
  colmn: 1,
  widget: 'collapse',
  props: {},
  properties: {}
}
```
### type
type: 'object'（固定配置）

### title
标题

### widget
组件名称，内置的组件有：collapse | card | lineTitle | subInline

### properties
表单元素集合

### column
嵌套内部布局， 一行多列

### description
副标题描述

### tooltip
气泡提示

### props
额外属性



## 三、列表控件配置项
可动态增减的表单项

```js
list: { // list 是字段名
  title: '人员列表',
  type: 'array',
  widget: 'card', 
  items: {
    title: '基础信息',
    type: 'object',
    properties: {}
  },
  min: 1,
  max: 5
}
```
### type
type: 'array'（固定配置）

### title
标题

### widget
组件名称，内置的组件有：cardList | simpleList | tableList | drawerList | virtualList

### items
动态项配置，可以是一个嵌套控件
```js
{
  title: '基础信息', // 标题
  type: 'object', // 固定配置
  properties: {} // 表单元素
  // widget: 'collapse', 支持配置嵌套控件
},
```
### max
最大长度

### min
最小长度



## 四、基础控件配置项
`item`：即最基本的输入框，选择框等

基础
```js
url: {
  title: 'url输入框',
  type: 'string',
  widget: 'input'
}
```

### type
数据类型：'string' | 'number' | 'boolean' | 'array' | 'range' | 'html' | 'block'

### title 
标题

### placeholder
输入内容提示

### description
副标题描述

### tooltip
气泡提示，支持 `html` 格式
```js
tooltip: {
  title: ''
}
```
### descWidget
自定义副标题提示组件

### extra
更多说明信息：extra 可以是 html string，也可以是纯文案，会展示在元素下面一行紧贴。

### required
必填

### min
string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度

### max
string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度

### format
`'image' | 'textarea' | 'color' | 'email' | 'url' | 'dateTime' | 'date' | 'time' | 'upload'`

### Rules
```js
rules: [
  { pattern: '^[\u4E00-\u9FA5]+$', message: '请输入中文！' }
]
```

### hidden
隐藏

### disabled
禁用

### readOnly
只读

### readOnlyWidget
指定只读渲染组件

### props
额外属性，如果使用的是 antd 组件 对应的就是 antd 组件的其他属性

### options
```js
props: {
  options: [
    lable: '',
    value: '',
    // disabled: '',
  ]
}
```

### dependencies
[path]： 当依赖的元素更新时，会触发本元素的重新渲染，用于复杂的表单联动

### className
元素 class 名称

