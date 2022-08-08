---
order: 1
title: 使用教程
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">TableRender</span>
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
  <a href="https://github.com/alibaba/x-render" >
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

> 易用且轻量的中后台**列表解决方案**，常用于**搜索列表页**快速生成

## 简介

1. **真正开箱即用**：以最简单的 API 配置请求和表头的字段，就能生成一个好用搜索列表。
2. **XRender 生态**：搜索筛选能力用 FormRender 来提供，以最小成本快速生成上侧搜索面板。
3. **无缝习惯使用**：表格能用 Ant Design Table 来提供，降低用户使用成本。

## 安装

table-render 依赖 ant design，单独使用不要忘记安装～

```sh
npm i table-render --save
```

## 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * background: 'rgb(245,245,245)'
 */
import React from 'react';
import { Table, Search, withTable } from 'table-render';

const dataSource = [];
for (let i = 0; i < 6; i++) {
  dataSource.push({
    id: i.toString(),
    title: `标题${i + 1}`,
    created_at: new Date().getTime(),
  });
}

// 详细可见 form-render 的使用
const schema = {
  type: 'object',
  properties: {
    title: {
      title: '标题',
      type: 'string',
      width: '30%',
      labelWidth: 45,
    },
    created_at: {
      title: '创建时间',
      type: 'string',
      format: 'date',
      width: '30%',
    },
  },
};

// 配置完全透传 antd table
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    render: (row, record) => <a onClick={() => alert(row.title)}>编辑</a>,
  },
];

const Wrapper = () => {
  const searchApi = () => {
    return {
      rows: dataSource,
      total: dataSource.length,
    };
  };
  return (
    <>
      <Search schema={schema} api={searchApi} />
      <Table headerTitle="最简表格" columns={columns} rowKey="id" />
    </>
  );
};

export default withTable(Wrapper);
```

## API

### WithTable

TableRender 在底层使用了 Context 管理内部状态，`withTable` 是 Context Provider 高阶组件形式的语法糖，用户需要使用 `withTable` 包裹表格组件

```js
import { withTable，useTable } from 'table-render';

const Page = () => {
  const { refresh } = useTable();
}

export default withTable(Page)
```

### Search

我们将搜索相关的能力放到 `<Search />` 上面配置，包括对应的搜索筛选表单的渲染

| 属性               | 描述                                                                                  | 类型                                   | 默认值  |
| ------------------ | ------------------------------------------------------------------------------------- | -------------------------------------- | ------- | 
| schema             | **必填**，用于渲染查询表单，详见[form-render 文档](/form-render/schema/schema) | [SchemaBase](https://github.com/alibaba/x-render/blob/master/packages/form-render/src/index.d.ts#L16)                               | -       | 
| api                | **必填**，初始化&点击查询时执行的函数，详见[Api](#api-1)                                                          | [ApiType](https://github.com/alibaba/x-render/blob/master/packages/table-render/src/interface.ts#L94)                 | -       | 
| onSearch           | 在表格查询时执行一些额外的操作                                                        | `(params) => void`                             | -       |
| afterSearch        | 在表格查询结束后执行一些额外的操作                                                    | `(params) => void`                             | -       |
| searchOnMount      | 组件初次挂载时，是否默认执行查询动作                                                  | `boolean`                              | true  | 
| hidden             | 是否隐藏 `<Search />` 组件                                                              | `boolean`                              | false |
| searchBtnRender    | 自定义表单查询按钮                                                                    | `(refresh,clearSearch) => ReactNode[]` | -       | 
| searchBtnStyle     | 自定义表单操作按钮组的样式                                                            | `CSSProperties`                  | -      | 
| searchBtnClassName | 自定义表单操作按钮组的 ClassName                                                      | `string`                               | -      | 
| searchWithError    | 表单校验失败时，是否继续执行查询操作                                                  | `boolean`                              | true    |
| searchText         | 自定义查询按钮的文本                                                                  | `string`                               | 查询  | 
| resetText          | 自定义重置按钮的文本                                                                  | `string`                               | 重置  | 
| debug              | 开启 debug 模式，时时显示内部状态，**开发的时候强烈建议打开**                         | `boolean`                              | false |

#### Api

 `api` 有两个入参：`params`、`sorter`，分别是表单筛选项的值、排序参数。`api` 需要返回一个对象，此对象中必须要有 `rows` 和 `total`。
表单查询时 `api` 会被自动调用，同时带入最新的表单值和其他查询参数
 
```jsx | pure
const searchApi = async (params, sorter) => {
  const result = await getTableData(params, sorter);

  return {
    rows: result.list,    // rows 对应表格的 tableSource，必须返回
    total: result.total,  // total 对应数据的总数，用于分页，必须返回
  }
}

<Search api={searchAPi} />
```

可以通过数组形式传入多个 `api` 函数，Table-Render 会自动生成对应的 tab

```jsx | pure

const searchHotel = async (params) => {
  const result = await getHotelData(params);
  return {
    rows: result.list,
    total: result.total,
  }
}

const searchPeople = async (params) => {
  const result = await getPeopleData(params);
  return {
    rows: result.list,
    rows: result.totla,
  }
}

// 需要额外的 name 属性，作为 tab 的名称
<Search 
  api={[
    { name: '酒店数据', api: searchHotel },
    { name: '人员数据', api: searchPeople },
  ]}
/>

```

### Table

支持所有 antd table 的 [props](https://ant-design.antgroup.com/components/table-cn/#Table)，但是`dataSource`, `loading`, `pagination`这几个参数是内部状态，不需要填写

| 属性                  | 描述                                                                      | 类型                | 默认值      |
| --------------------- | ------------------------------------------------------------------------- | ------------------- | ----------- |
| headerTitle           | 表格标题                                                                  | `string \| ReactNode`| - | -   |
| toolbarRender         | 表格主体右上方的控件，例如“添加”按钮                                      | `() => ReactNode[]` | false     |
| toolbarAction         | 显示在表格主体右上方的 Icon 列表，内置了刷新、调整密度、全屏显示等功能 | `boolean`           | false     |
| pageChangeWithRequest | 切换分页时是否需要请求接口                                                | `boolean`           | true      |
| columns               | 列定义                                                                    | [ProColumnsType](#columns)    | -     |
| debug                 | 开启 debug 模式，时时显示内部状态，**开发的时候强烈建议打开**             | `boolean`           | false     |

### Columns

columns 为 antd 已有的 props，支持 antd 所有的 [columns](https://ant.design/components/table-cn/#Column) 配置，同时也提供了一些更方便的 api，加快书写

| 属性      | 描述                                                | 类型                                                  | 默认值 |
| --------- | --------------------------------------------------- | ----------------------------------------------------- | ------ |
| ellipsis  | 是否自动缩略                                        | `boolean`                                               | -      |
| copyable  | 是否支持复制                                        | `boolean`                                               | -      |
| valueType | 值的类型，详见 [ValueType](#valuetype)                 | `'text' \| 'money' \| 'date' \| 'dateTime'` | text |
| enum      | 当前列值的枚举，详见[Enum](#enum) | `object`                                              | -      |

#### ValueType

TableRender 封装了一些常用的值类型来减少重复的 render 操作，配置一个 valueType 即可展示格式化响应的数据

  | 属性     | 描述                                                               |
  | -------- | ------------------------------------------------------------------ |
  | text     | 普通的文本类型                                                     |
  | date     | 当数据是日期类型的返回时，会自动将格式转换为 `YYYY-MM-DD`          |
  | dateTime | 当数据是日期类型的返回时，会自动将格式转换为 `YYYY-MM-DD HH:mm:ss` |
  | money    | 当数据是金额时，会自动将格式转换为 `¥0,0.00`               |

  ```js
  const columns = [
    {
      title: '酒店GMV',
      dataIndex: 'money',
      valueType: 'money', // 自动将格式转换为 '¥0,0.00'  
    },
    {
      title: '成立时间',
      dataIndex: 'created_at',
      valueType: 'date', // 自动将格式转换为 'YYYY-MM-DD' 
    },
    // ...
  ]
  ```

#### Enum

当前列值的枚举，方便处理表格值的映射

```js
const columns = [
  {
    title: '酒店状态'
    dataIndex: 'state',
    enum: {
      open: '营业中',   // 自动将 open 转换为 营业中
      closed: '已打烊', // 自动将 closed 转换为 已打烊
    },
  },
  // ...
]
```

### UseTable

可通过 `useTable` 获取如下 `table-render` 的 context

| 属性       | 描述                                                                                                                 | 类型       |
| ---------- | -------------------------------------------------------------------------------------------------------------------- | ---------- |
| tableState | 这些是全局的状态，根据需要使用                                                                                       | [TableStateType](#tablestate)   |
| refresh    | 刷新表格数据，详见[Refresh](#refresh)                                                                                                         | `(config, search) => Promise<void>` |
| setTable   | 用于修改全局状态的工具函数，setTable 之于 tableState，等同 setState 之于 state                                       | `(tableState) => void` |
| changeTab  | 手动切换 tab 的函数，例如目前两个搜索 tab： “我的活动”，“全部活动” （分别对应 tab 值为 0 和 1），详见[ChangeTab](#changetab)                      | `(tab) => void` |
| form       | Search 组件是 form-render 生成的，可以取到搜索表单的 form 实例以及挂在上面的方法，例如 `form.resetFields` 清空搜索项 | `object`   |

导出 useTable 以及对应的方法

  ```js
  import { useTable } from 'table-render';
  const { refresh, tableState, setTable } = useTable();
  ```

#### TableState
表单的全局状态 `tableState` 包含的如下的数据

  ```js
  {
    loading: false, // 表单是否在加载中
    search: {},     // 选项数据
    searchApi,      // 搜索用的api
    tab: 0,         // 如果 searchApi 为多个，会自动生成相应个数的 tab，这里代表的是当前的 tab 的 key
    dataSource: [], // 表格的数据
    extraData: { }, // 自定义的扩展信息
    pagination: {
      current: 1,   // 当前页码
      pageSize: 10, // 当前页数
      total: 100,   // 总数
    },
  }
  ```

#### Refresh

主动触发表单刷新的方法

```ts
type Refresh = (
  config?: { 
    stay: boolean, // 刷新之后是否停留在目前的页码上，默认 false，回到第一页
    tab: number    // searchApi 有多个时，用于强制搜索某个 tab 对应的 searchApi
  },
  search?: any     // 额外传递给 searchApi 的参数
) => Promise<void>;


const { refresh } = useTable();

const onClick = () => {
  refresh({ stay: true }); // 刷新数据，但停留在现有的页码
}

```

#### ChangeTab

手动切换当前 tab 的方法

  ```ts
  type ChangeTab = (
    tab: number
  ) => Promise<void>;


  const { changeTab } = useTable();

  const onClick = () => {
    changeTab(1);   // 手动切换到对应tab
  };
  ```
