---
order: 3
group:
  order: 3
  title: API
toc: content
---

# 内置组件

From-render 内部使用了如下内置组件，根据规则匹配对应组件，例如

```js
const schema = {
  // ...
  // 此 item 会匹配 imageInput 图片输入框
  img: {
    type: 'string',
    format: 'image',
  },
};
```

有时，用户希望强制指定一个表单原件用某个内置或自定义的组件来展示，可使用 widget 字段来说明，例如下面的 item 会用 select 下拉单选组件来渲染，即使没有下拉选项：

```js
const schema = {
  // ...
  string: {
    title: '下拉选框',
    type: 'string',
    widget: 'select', // 会强制使用 select 组件
  }
},
```

下面是目前 FormRender 已经支持的内置组件，其中规则的格式为`${type}:${format}?${enum}/${readOnly}`

具体展示详见 [playground](/playground) - 基础控件，列表的展示见[展示的最佳实践](/form-render/advanced/display#列表的展示)

### input

- 组件：输入框
- 规则：`string`

### textarea

- 组件：多行输入框
- 规则：`string:textarea`

### number

- 组件：数字输入框
- 规则：`integer | number`

### url

- 组件：链接输入框
- 规则：`string:url`

### imageInput

- 组件：图片输入框
- 规则：`string:image`

### date

- 组件：日期组件
- 规则：`string:dateTime | string:date`

### time

- 组件：时间组件
- 规则：`string:time`

### dateRange

- 组件：日期范围
- 规则：`range:date | range:dateTime`

### timeRange

- 组件：时间范围
- 规则：`range:time`

### checkbox

- 组件：是否选择
- 规则：`checkbox`

### checkboxes

- 组件：点击多选
- 规则：`array?enum`

### select

- 组件：下拉单选
- 规则：`*?enum_long`

### multiSelect

- 组件：下拉多选
- 规则：`array?enum_long`

### radio

- 组件：点击单选
- 规则：`*?enum`

### treeSelect

- 组件：树形选择
- 规则：-

### color

- 组件：颜色选择
- 规则：`string:color`

### upload

- 组件：上传组件
- 规则：`string:upload`

### html

- 组件：文本（只读展示）
- 规则：`html`

### slider

- 组件：滑动输入条
- 规则：-

### rate

- 组件：五星评分
- 规则：-

### cardList

- 组件：卡片形式的列表
- 规则：-

### simpleList

- 组件：列表组件
- 规则：-

### tableList

- 组件：表格形式的列表组件
- 规则：-

### drawerList

- 组件：使用抽屉的表格形式的列表组件
- 规则：-

### tabList

- 组件：tab 形式的列表组件
- 规则：-
