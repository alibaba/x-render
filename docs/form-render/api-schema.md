---
order: 1
toc: content
mobile: false
group: 
  title: API
  order: 4
---

# 协议配置项

`schema` 用于描述表单的基本信息、结构和校验。`schema` 在结构上遵循 <a href="https://json-schema.org/understanding-json-schema/" target="_blank">JSON Schema 国际规范</a>。
表单元素类型总共有三种：`item`，`object`，`list`。

## 一、表单配置项

schema 最顶层的一些配置，主要为表单全局的样式。

```js
{
  type: 'object', 
  displayType: 'column', 
  colmn: 1, 
  properties: {}
}
```
### type
- 描述：固定配置为 `type: 'object'`

### displayType
- 描述：表单项 label 布局方式
- 类型：`'row' | 'column' | 'inline'`


### column
- 描述：表单布局，一行应该有几列
- 类型：`number`
- 默认：`3`

### labelWidth
- 描述：表单项标签的宽度
- 类型：`number`

### properties
- 描述：表单元素的集合

## 二、基础控件配置项
`item`：即最基本的输入框，选择框等。

如下这样一段 block 在 form-render schema 中就叫做一个 `item`，其中 `url` 就是这个 `item` 在表单中对应的字段。

```js
url: {
  title: 'url输入框',
  type: 'string',
  widget: 'input'
}
```

### type
- 描述：表单字段的类型
- 类型：`'string' | 'number' | 'boolean' | 'array' | 'range' | 'html' | 'block'`

### title 
- 描述：表单字段的标签
- 类型：`string`

### widget
- 描述：指定渲染的控件，可以是 form-render 的 [内置组件](/form-render/display-row)，也可以是 [自定义组件](/form-render/advanced-widget)
- 类型：`string`

### placeholder
- 描述：输入内容提示
- 类型：`string | [string, string]`

### description
- 描述：副标题描述
- 类型：`string`

### tooltip
- 描述：气泡提示，支持 `html` 格式，可传入一个对象支持更多配置。详见 <a href="https://ant.design/components/tooltip-cn#api" target="_blank">Antd Tooltip Props</a>。
- 类型：`string | TooltipProps`

```js
tooltip: {
  title: 'xxx<br/>xxx',
  color: 'red',
}
```
### descWidget
- 描述：自定义副标题提示组件
- 类型：`string`

### extra
- 描述：更多的说明信息，支持 `html` 格式，会紧贴在元素下面一行展示
- 类型：`string`

### required
- 描述：是否必填
- 类型：`boolean`
- 默认：`false`

### min
- 描述：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度
- 类型：`number`

### max
- 描述：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度
- 类型：`number`

### format
- 描述：在已设置的 `type` 下，如何处理这个 `type`
- 类型：`'image' | 'textarea' | 'color' | 'email' | 'url' | 'dateTime' | 'date' | 'time' | 'upload'`

:::warning
在 1.x 中，form-render 会根据 `type` 和 `format` 自动选择适合的 `widget`。在 2.x 中，我们更推荐显式的指定 `widget`，而不是自动选择。
:::

### rules
- 描述：校验规则，参考 <a href="https://ant-design.antgroup.com/components/form-cn#rule" target="_blank">Antd Form RuleConfig</a>
- 类型：`Rule[]`
```js
rules: [
  { pattern: '^[\u4E00-\u9FA5]+$', message: '请输入中文！' }
]
```

### hidden
- 描述：是否隐藏
- 类型：`boolean`
- 默认：`false`

### disabled
- 描述：是否禁用
- 类型：`boolean`
- 默认：`false`

### readOnly
- 描述：是否禁用
- 类型：`boolean`
- 默认：`false`

### readOnlyWidget
- 描述：指定只读渲染组件
- 类型：`string`

### dependencies
- 描述：当依赖的元素更新时，会触发本元素的重新渲染，用于复杂的表单联动，[详见](/form-render/advanced-linkage#dependencies-依赖字段)。
- 类型：`string[]`

### className
- 描述：自定义控件 class 名称
- 类型：`string`

### reserveLabel
- 描述：当 title 未设置时，通过配置 reserveLabel: true，可以保留 labelWidth 占位，使得输入控件和其他控件上下对齐
- 类型：`boolean`

### props
配置额外属性，如果使用的是 antd 组件 对应的就是 antd 组件的其他属性。例如：

```js
props: {
  options: [
    lable: '',
    value: '',
    // disabled: '',
  ]
}
```

## 三、嵌套控件配置项
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
- 描述：固定配置为 `type: 'object'`

### title
- 描述：标题
- 类型：`string`

### widget
- 描述：希望使用的嵌套组件
- 类型：`'collapse' | 'card' | 'lineTitle' | 'subInline'`
- 默认：`'card'`

### properties
- 描述：表单元素集合

### column
- 描述：表单布局，一行应该有几列
- 类型：`number`
- 默认：`3`

### description
- 描述：副标题描述
- 类型：`string`

### tooltip
- 描述：气泡提示，支持 `html` 格式，可传入一个对象支持更多配置。详见 <a href="https://ant.design/components/tooltip-cn#api" target="_blank">Antd Tooltip Props</a>。
- 类型：`string | TooltipProps`

```js
tooltip: {
  title: 'xxx<br/>xxx',
  color: 'red',
}
```

### props
- 描述：额外属性，透传到对应的嵌套组件中

## 四、列表控件配置项
可动态增减的表单项

```js
list: { // list 是字段名
  title: '人员列表',
  type: 'array',
  widget: 'card', 
  min: 1,
  max: 5,
  items: {
    title: '基础信息',
    type: 'object',
    properties: {}
  },
}
```
### type
- 描述：固定配置为 `type: 'array'`

### title
- 描述：标题
- 类型：`string`

### widget
- 描述：希望使用的列表组件
- 类型：`'cardList' | 'simpleList' | 'tableList' | 'drawerList' | 'virtualList'`
- 默认：`'cardList'`

### max
- 描述：列表的最大长度
- 类型：`number`

### min
- 描述：列表的最小长度
- 类型：`number`

### props
配置列表控件，可配置如下属性

#### props.addBtnProps
- 描述：添加按钮属性，参考 <a href="https://ant.design/components/button-cn#api" target="_blank">Antd Button Props</a>()
- 类型：`ButtonProps`

#### props.delConfirmProps
- 描述：删除确认弹窗属性，参考 <a href="https://ant.design/components/popconfirm-cn#api" target="_blank">Antd PopConfirm Props</a>
- 类型：`PopConfirmProps`

#### props.actionColumnProps
- 描述：`tableList | drawerList | virtualList` 中操作列的属性，参考 <a href="https://ant.design/components/table-cn#column" target="_blank">Antd Table ColumnType</a>。 其中 `title` 使用 `colHeaderText` 代替。
- 类型：`ColumnType`

#### props.hideAdd
- 描述：是否隐藏添加按钮
- 类型：`boolean`

#### props.hideCopy
- 描述：是否隐藏复制按钮
- 类型：`boolean`

#### props.hideMove
- 描述：是否隐藏移动按钮
- 类型：`boolean`

#### props.hideDelete
- 描述：是否隐藏删除按钮
- 类型：`boolean`

#### props.onAdd
- 描述：点击添加按钮回调函数
- 类型：`(operation, { schema, data }) => void`

#### props.onRemove
- 描述：点击删除按钮回调函数
- 类型：`(operation, { schema, data, index }) => void`

#### props.onMove
- 描述：点击移动按钮回调函数
- 类型：`(operation, { schema, data, to }) => void`

#### props.onCopy
- 描述：点击复制按钮回调函数
- 类型：`(operation, { schema, data }) => void`

### items
动态项配置，可以是一个嵌套控件

```js
{
  title: '基础信息', // 标题
  type: 'object',    // 固定配置
  properties: {}     // 表单元素
  // widget: 'collapse', 支持配置嵌套控件
},
```

