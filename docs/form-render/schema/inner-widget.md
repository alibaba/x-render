---
order: 3
group:
  order: 3
  title: API
toc: content
---

# 内置组件

有时，用户希望强制指定一个表单原件用某个内置或自定义的组件来展示，可使用 widget 字段来说明，这个指定的优先级是最高的，被指定的表单项一定会使用此 widget 来渲染，例如下面的 schema 如果不以 widget 指明，会默认用 input 输入框来渲染，但现在会用 select 下拉单选组件来渲染，即使没有下拉选项：

```js
string: {
  title: '下拉选框',
  type: 'string',
  widget: 'select',
},
```

目前 FormRender 已经支持的内置组件的展示，见 [playground](/playground) - 基础控件

组件与 widget name 的规则如下：

```sh
# 输入类
输入框 input
多行输入框 textarea
数字输入框 number
链接输入框 url
图片输入框 imageInput

# 日期类
日期组件 date
时间组件 time
日期范围 dateRange
时间范围 timeRange

# 选择类
是否选择 checkbox
下拉单选 select
点击单选 radio
下拉多选框 multiSelect
点击多选框 checkboxes
树形选择 treeSelect

# 其他
颜色选择 color
上传组件 upload
文本（只读展示）html
滑动输入条 slider
五星评分 rate

# 结构类
对象 map
列表 cardList/simpleList/tableList/drawerList
```

注：其中列表的 `widget` 有四个可匹配组件（cardList/simpleList/tableList/drawerList）

1. 默认使用 widget: `'cardList'`，卡片 list 的展示，适宜有复杂结构，但 item 数量不大的场景
2. 如果每个 item 数据 1-2 条，且没有复杂结构（例如对象、列表），建议使用 widget: `'simpleList'`
3. 如果每个 item 数据 3-5 条，且没有复杂结构（例如对象、列表），建议使用 widget: `'tableList'`
4. 如果每个各 item 数据量大，或者结构复杂，建议使用 widget: `'drawerList'`

四种展示见[展示的最佳实践](/form-render/advanced/display#列表的展示)

在 schema 中通过 widget 关键字声明，可以强制声明使用某个组件来渲染

```js
string: {
  title: '下拉选框',
  type: 'string',
  widget: 'select',
},
```

很多（但不是所有的）内置组件与 schema 有默认匹配规则：

```js
export const mapping = {
  default: 'input',
  string: 'input',
  array: 'list',
  boolean: 'checkbox',
  integer: 'number',
  number: 'number',
  object: 'map',
  html: 'html',
  'string:upload': 'upload',
  'string:url': 'url',
  'string:dateTime': 'date',
  'string:date': 'date',
  'string:time': 'time',
  'string:textarea': 'textarea',
  'string:color': 'color',
  'string:image': 'imageInput',
  'range:time': 'timeRange',
  'range:date': 'dateRange',
  'range:dateTime': 'dateRange',
  '*?enum': 'radio',
  '*?enum_long': 'select',
  'array?enum': 'checkboxes',
  'array?enum_long': 'multiSelect',
  '*?readOnly': 'html',
};
```

其中左侧为匹配规则（格式为 `type:format?enum/readOnly`），右侧为匹配到的组件。例如

```js
string: {
  title: '单选框',
  type: 'string',
  enum: ['a', 'b'],
  enumNames: ['选项1', '选项2'],
}
```
