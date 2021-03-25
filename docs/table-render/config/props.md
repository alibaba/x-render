---
order: 1
title: Props
nav:
  order: 2
  title: 配置项
toc: menu
---

# Props

## `<TableContainer>` 常用 Props

TableContainer 是 table-render 的容器

### searchApi

- 类型：`function` or `array`
- 默认值：无
- 必填：Yes
- 详细：

代表点击搜索执行的函数

1. 入参：搜索项和页码信息（current 现在第几页, pageSize 一页多少条），在例子中打开 console 看更有实感。
2. **注意：** searchApi 的返回值可以是一个对象（用于简单 mock），但一般情况下是一个 Promise，并 resolve 一个对象，**对象的格式必须如下**：

```js
{
  rows: [ ... ], // 返回的列表数据，必须有！
  total: 123, // 总条数，必须有！
  pageSize: 12, // 默认10，所以一般不需要
  // 如果有扩展信息需要每次搜索时更新，存在extraData字段，选填:
  extraData: { a: 1 }
}
```

一个 mock 的 api 如下：

```js
<TableContainer searchApi={params => ({ rows: [{a: 1}, {a: 2}], total: 20 })} >
```

3. 会出现需要多个搜索 api 的情况，例如很多场景会有 “我的数据”、“全部数据” 两个 tab，这种场景只需要 searchApi 是一个数组就能实现：

```js
searchApi={[
  { name: '我的数据', api: xxxx },
  { name: '全部数据', api: yyyy },
]}
```

其中`xxxx`和`yyyy`的写法同 function 类型的 searchApi，具体使用方法请参考[如何使用 searchApi](/demo#使用-searchapi)

### searchOnMount

- 类型：`boolean`
- 默认值：true
- 必填：No

组件初次挂载时，是否默认执行查询动作

### params

- 类型：`object`
- 默认值：无
- 必填：No
- 详细：

允许外部传入自定义参数给搜索请求（searchApi）, 会与 searchApi 的默认请求参数合并，且优先级高（就是参数名同样的 params 里的参数覆盖默认参数）

## `<Search>` 常用 Props

Search 是表单的渲染组件

### schema

- 类型：`object`
- 默认值：无
- 必填：Yes

可以使用[表单设计器](https://x-render.gitee.io/schema-generator/playground)拖拽生成，导出 schema 即可。具体的 api 参考 [form-render 文档](https://x-render.gitee.io/form-render/config/schema)

### hidden

- 类型：`boolean`
- 默认值：false
- 必填：No

是否隐藏搜索项。如果你想渲染一个表格，但是不需要渲染搜索项，那么可以这样写：

```js
<TableContainer searchApi={searchApi}>
  <Search hidden />
  <ProTable columns={columns} />
</TableContainer>
```

P.S. 也许你会问，直接不渲染 `<Search />` 行么？抱歉目前不行。

### searchBtnRender

- 类型：`Function`
- 参数：refresh、clearSearch
- 必填：No
- [参考文档](../guide/demo#使用-searchbtnrender)

实现表单按钮定制化，可以这样写：

```js
<Search
  schema={schema}
  searchBtnRender={(refresh, clearSearch) => [
    <Button type="primary" onClick={() => refresh()}>
      查询
    </Button>,
    <Button onClick={() => clearSearch()}>重置</Button>,
  ]}
/>
```

## `<ProTable>` 常用 Props

ProTable 是 table-render 的表格渲染组件

### 所有 antd table 组件的 props

支持所有 antd table 的 props，但是`dataSource`, `loading`, `pagination`这几个参数是内部状态，不需要填写。最基本的使用就需要填写 `columns`

### headerTitle

- 类型：`string`
- 默认值：无

  表格标题

### toolbarRender

- 类型：`function`
- 默认值：无
- 必填：Yes

1. 表格主体上方的控件，例如“添加”按钮
2. **注意函数返回值是数组！** 其他写法自由

```js
<ProTable
  toolbarRender={() => [
    <Button key="1">查看日志</Button>,
    <Button key="2">导出数据</Button>,
    <Button key="3">创建</Button>,
  ]}
/>
```

### toolbarAction

- 类型：`boolean`
- 默认值：false
- 必填：No

1. 显示在表格主体右上方的 Icon 列表，内置了`刷新、调整密度、全屏显示` 等功能

```js
<ProTable toolbarAction />
```

### columns

columns 为 antd 已有的 props，所以支持 antd 所有的支持的 [columns](https://ant.design/components/table-cn/#Column) 的配置，但是我们也提供了一些更方便的 api，加快书写:

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ellipsis | 是否自动缩略 | boolean | - |
| copyable | 是否支持复制 | boolean | - |
| valueType | 值的类型，详见 [valueType 配置](./columns.md) | `text` \| `money` \| `date` \| `dateTime` | `text` |
| enum | 当前列值的枚举，详见 [enum 配置](./columns.md) | object | - |

## `<CardList />` 常用 Props

对于 Card 场景我们提供了 CardList 组件进行快速渲染

| 属性              | 描述                         | 类型 | 默认值   |
| ----------------- | ---------------------------- | ---- | -------- |
| onCardClick       | 卡片的点击事件               | -    | Function |
| cardRender        | 渲染 card 组件的 schema 协议 | -    | object   |
| paginationOptions | 分页器                       | -    | object   |

### cardRender

| 属性    | 描述                                        | 类型 | 默认值             |
| ------- | ------------------------------------------- | ---- | ------------------ |
| type    | card 类型: `default`、 `image`              | -    | default            | string |
| cover   | 卡片封面                                    | -    | string             | Object |
| header  | 卡片头部渲染逻辑                            | -    | object             |
| content | 卡片内容                                    | -    | object             |
| footer  | 卡片底部，对应 antd card 的 actionList 属性 | -    | `Array<ReactNode>` |

## useTable

如果我需要刷新页面，该哪里去取刷新的 api？

```js
import { useTable } from 'table-render';

// 在任何组件内，哪怕不是一个文件也没事，因为 useTable 实质上是 React 的 Context
const Customized = () => {
  const { refresh } = useTable();
  return <button onClick={refresh}>自定义刷新按钮</button>;
};
```

可用的内部 api 有

```js
const { tableState, setTable, doSearch, refresh } = useTable();
```

### tableState

```js
{
  loading: false, // 表单是否在加载中
  search: {}, // 选项数据
  searchApi // 搜索用的api
  tab: 0, // 如果searchApi是数组，需要在最顶层感知tab，来知道到底点击搜索调用的是啥api
  dataSource: [], // 表格的数据
  extraData: { ... }, // 自定义的扩展星系
  pagination: {
    current: 1,
    pageSize: 10,
    total: 100,
  },
}
```

这些是全局的状态，根据需要使用

### setTable

用于修改全局状态的工具函数，setTable 之于 tableState，等同 setState 之于 state

```js
setTable({
  loading: true,
  tab: 1,
});
```

### doSearch

搜索的函数，请使用 refresh

### refresh

type: function

刷新函数。

| 入参 | 类型    | 说明                                                                            |
| ---- | ------- | ------------------------------------------------------------------------------- |
| stay | boolean | 刷新是否保留在现在的页码上，默认 false，回到第一页                              |
| tab  | number  | 0,1,2.. 如果 searchApi 是数组会出现的搜索选择 tab，用于强制搜索某个 tab，不常用 |

1. 直接用：refresh()
2. 刷新数据，但停留在现有的页码：refresh({ stay: true })

### changeTab

type: function

手动切换 tab 的函数，例如目前两个搜索 tab： “我的活动”，“全部活动” （分别对应 tab 值为 0 和 1）

```js
const { changeTab } = useTable()

...

const onClick = () => {
  changeTab(1)
}
```

以上代码将手动切换到“全部活动”（tab = 1）
