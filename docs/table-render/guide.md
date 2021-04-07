---
order: 1
title: 使用教程
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:38px;display:inline-block;margin-left:12px">TableRender</span>
</div>

<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/table-render?_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/table-render.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/table-render">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/table-render.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/table-render">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/table-render.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

> 易用且轻量的中后台**列表解决方案**，常用于**搜索列表页**快速生成

## 优势

1. **真正开箱即用**：以最简单的 API 配置请求和表头的字段，就能生成一个好用搜索列表。
2. **XRender 生态**：搜索筛选能力用 FormRender 来提供，以最小成本快速生成上侧搜索面板。
3. **无缝习惯使用**：表格能用 Ant Design Table 来提供，降低用户使用成本。

## 何时使用

1. 用于查看和处理多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作，常有导航到详情页面的作用。
2. 表格列表建议将重要信息和操作展示出来，不重要信息直接收起，可以帮助用户更高效的查看、处理、查找数据。

## 如何使用

### 安装

table-render 目前默认使用 ant design，所以请在 antd 项目下使用，如果要单独使用，不要忘记安装 antd

```sh
npm i table-render antd --save
```

### 代码演示

去[CodeSandbox](https://codesandbox.io/s/vfopu)试试

```js
import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { ProTable, Search, TableContainer, useTable } from 'table-render';

// 可以使用schema编辑器配置 https://form-render.github.io/schema-generator/
const schema = {
  type: 'object',
  properties: {
    string: {
      title: '标题',
      type: 'string',
      pattern: '^[A-Za-z0-9]+$',
      message: {
        pattern: '格式不对哦~',
      },
      'ui:width': '30%',
    },
    created_at: {
      title: '创建时间',
      type: 'string',
      format: 'date',
      'ui:width': '30%',
    },
  },
  'ui:labelWidth': 90,
};

// 配置完全透传antd table
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '状态',
    dataIndex: 'state',
    enum: {
      open: '未解决',
      closed: '已解决',
    },
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    render: row => (
      <a
        href="https://x-render.gitee.io/form-render/"
        target="_blank"
        rel="noopener noreferrer"
      >
        查看
      </a>
    ),
  },
];

const Demo = () => {
  return (
    <div style={{ background: 'rgb(245,245,245)' }}>
      <Search schema={schema} />
      <ProTable headerTitle="最简表格" columns={columns} rowKey="id" />
    </div>
  );
};

const Wrapper = () => {
  const searchApi = params => ({ rows: [], total: 10 });
  return (
    <TableContainer searchApi={searchApi}>
      <Demo />
    </TableContainer>
  );
};

export default Wrapper;
```

## API

### TableContainer 参数

| 属性          | 描述                                                                                                                                         | 类型                  | 默认值 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------ |
| searchApi     | 初始化&点击查询时执行的函数                                                                                                                  | `Function` or `Array` | -      |
| params        | 允许外部传入自定义参数给搜索请求（searchApi）, 会与 searchApi 的默认请求参数合并，且优先级高（就是参数名同样的 params 里的参数覆盖默认参数） | `object`              | -      |
| onSearch      | 在表格查询时执行一些额外的操作                                                                                                               | `Function`            | -      |
| searchOnMount | 组件初次挂载时，是否默认执行查询动作                                                                                                         | boolean               | `true` |

### Search 参数

| 属性            | 描述                                                                                                                                                                                         | 类型                                   | 默认值 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------ |
| schema          | 用于渲染表单的 schema，可以使用[表单设计器](https://x-render.gitee.io/schema-generator/playground)拖拽生成，导出 schema 即可。具体的 api 参考 [form-render 文档](/form-render/config/schema) | `object`                               | -      |
| hidden          | 是否隐藏`<Search />`组件                                                                                                                                                                     | `boolean`                              | false  |
| searchBtnRender | 自定义表单查询按钮                                                                                                                                                                           | `(refresh,clearSearch) => ReactNode[]` | -      |

### ProTable 参数

> 支持所有 antd table 的 props，但是`dataSource`, `loading`, `pagination`这几个参数是内部状态，不需要填写。最基本的使用就需要填写`columns`

| 属性          | 描述                                                                      | 类型                | 默认值      |
| ------------- | ------------------------------------------------------------------------- | ------------------- | ----------- |
| headerTitle   | 表格标题                                                                  | `string`            | `ReactNode` | - |
| toolbarRender | 表格主体右上方的控件，例如“添加”按钮                                      | `() => ReactNode[]` | false       |
| toolbarAction | 显示在表格主体右上方的 Icon 列表，内置了`刷新、调整密度、全屏显示` 等功能 | `boolean`           | false       |
| columns       | 列定义                                                                    | `boolean`           | false       |

##### Columns 列定义

columns 为 antd 已有的 props，所以支持 antd 所有的支持的 [columns](https://ant.design/components/table-cn/#Column) 的配置，但是我们也提供了一些更方便的 api，加快书写:

| 属性      | 描述                                               | 类型                                      | 默认值 |
| --------- | -------------------------------------------------- | ----------------------------------------- | ------ |
| ellipsis  | 是否自动缩略                                       | boolean                                   | -      |
| copyable  | 是否支持复制                                       | boolean                                   | -      |
| valueType | 值的类型，详见下方 `valueType 配置`                | `text` \| `money` \| `date` \| `dateTime` | `text` |
| enum      | 当前列值的枚举，详见[高级用法](./demo.md#基本用法) | object                                    | -      |

##### valueType 值类型

Table-Render 封装了一些常用的值类型来减少重复的 render 操作，配置一个 valueType 即可展示格式化响应的数据，具体使用可参考：[高级用法](./demo#高级用法)。

- 类型：`string`
- 默认值：text

| 属性     | 描述                                                               |
| -------- | ------------------------------------------------------------------ |
| text     | 普通的文本类型                                                     |
| date     | 当数据是日期类型的返回时，会自动将格式转换为 '2020-10-20'          |
| dateTime | 当数据是日期类型的返回时，会自动将格式转换为 '2020-10-20 19:30:00' |
| money    | 当数据是金额时，会自动将格式转换为 '¥999,999,999.99'               |

## Context

可通过`useTable`获取`table-render`的 context，例如: `refresh`、`tableState`、`setTable`等属性

| 属性        | 描述                                                                                            | 类型     |
| ----------- | ----------------------------------------------------------------------------------------------- | -------- |
| refresh     | 刷新表格数据                                                                                    | Function |
| clearSearch | 重置筛选项                                                                                      | Function |
| tableState  | 这些是全局的状态，根据需要使用                                                                  | object   |
| setTable    | 用于修改全局状态的工具函数，setTable 之于 tableState，等同 setState 之于 state                  | Function |
| changeTab   | 手动切换 tab 的函数，例如目前两个搜索 tab： “我的活动”，“全部活动” （分别对应 tab 值为 0 和 1） | Function |

#### useTable 用法

```js
import { useTable } from 'table-render';
const { refresh, tableState, setTable } = useTable();
```

#### tableState

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

#### refresh 用法

| 入参 | 类型    | 说明                                                                            |
| ---- | ------- | ------------------------------------------------------------------------------- |
| stay | boolean | 刷新是否保留在现在的页码上，默认 false，回到第一页                              |
| tab  | number  | 0,1,2.. 如果 searchApi 是数组会出现的搜索选择 tab，用于强制搜索某个 tab，不常用 |

1. 直接用：refresh()
2. 刷新数据，但停留在现有的页码：refresh({ stay: true })

#### changeTab 用法

```js
const { changeTab } = useTable()

...

const onClick = () => {
  changeTab(1)
}
```

以上代码将手动切换到“全部活动”（tab = 1）
