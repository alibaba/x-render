<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <h4 style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">TableRender</h4>
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

## 官网

<https://x-render.gitee.io/table-render>

## 优势

1. **真正开箱即用**：以最简单的 API 配置请求和表头的字段，就能生成一个好用搜索列表。
2. **XRender 生态**：搜索筛选能力用 FormRender 来提供，以最小成本快速生成上侧搜索面板。
3. **无缝习惯使用**：表格能用 Ant Design Table 来提供，降低用户使用成本。

## 何时使用

1. 用于查看和处理多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作，常有导航到详情页面的作用。
2. 表格列表建议将重要信息和操作展示出来，不重要信息直接收起，可以帮助用户更高效的查看、处理、查找数据。

## 如何使用

### 安装

table-render 依赖 ant design，单独使用不要忘记安装～

```sh
npm i table-render --save
```

### 代码演示

```jsx
import React from 'react';
import { Table, Search, TableProvider } from 'table-render';

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
    string: {
      title: '标题',
      type: 'string',
      'ui:width': '30%',
    },
    created_at: {
      title: '创建时间',
      type: 'string',
      format: 'date',
      'ui:width': '30%',
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
    <TableProvider>
      <Search schema={schema} api={searchApi} />
      <Table headerTitle="最简表格" columns={columns} rowKey="id" />
    </TableProvider>
  );
};

export default Wrapper;
```

## API

### `<TableProvider>` 参数

**TableProvider 本质就是一个 React Context，将对应的 `<Search>` 和 `<Table>` 包裹起来，可以很方便在里面插入一些其他东西，不需要任何入参**

### `<Search>` 参数

**我们将搜索相关的能力放到 `<Search>` 上面配置，包括对应的搜索筛选表单的渲染**

| 属性               | 描述                                                                                                           | 类型                                   | 默认值  | 必填 |
| ------------------ | -------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------- | ---- |
| schema             | 用于渲染表单的 schema，具体的 api 参考 [form-render 文档](https://x-render.gitee.io/form-render/config/schema) | `object`                               | -       | 是   |
| api                | 初始化&点击查询时执行的函数                                                                                    | `Function` or `Array`                  | -       | 是   |
| onSearch           | 在表格查询时执行一些额外的操作                                                                                 | `Function`                             | -       | 否   |
| afterSearch        | 在表格查询结束后执行一些额外的操作                                                                             | `Function`                             | -       | 否   |
| searchOnMount      | 组件初次挂载时，是否默认执行查询动作                                                                           | `boolean`                              | `true`  | 否   |
| hidden             | 是否隐藏`<Search />`组件                                                                                       | `boolean`                              | `false` | 否   |
| searchBtnRender    | 自定义表单查询按钮                                                                                             | `(refresh,clearSearch) => ReactNode[]` | -       | 否   |
| searchBtnStyle     | 自定义表单操作按钮组的样式                                                                                     | `React.CSSProperties`                  | {}      | 否   |
| searchBtnClassName | 自定义表单操作按钮组的 ClassName                                                                               | `string`                               | ''      | 否   |

### `<Table>` 参数

**支持所有 antd table 的 props，但是`dataSource`, `loading`, `pagination`这几个参数是内部状态，不需要填写，最基本的使用就需要填写`columns`**

| 属性                  | 描述                                                                      | 类型                | 默认值      |
| --------------------- | ------------------------------------------------------------------------- | ------------------- | ----------- |
| headerTitle           | 表格标题                                                                  | `string`            | `ReactNode` | - |
| toolbarRender         | 表格主体右上方的控件，例如“添加”按钮                                      | `() => ReactNode[]` | `false`     |
| toolbarAction         | 显示在表格主体右上方的 Icon 列表，内置了`刷新、调整密度、全屏显示` 等功能 | `boolean`           | `false`     |
| pageChangeWithRequest | 切换分页时是否需要请求接口                                                | `boolean`           | `true`      |
| columns               | 列定义                                                                    | `object`            | `false`     |

#### `<Table>` 参数 中 Columns 列定义

**columns 为 antd 已有的 props，所以支持 antd 所有的支持的 [columns](https://ant.design/components/table-cn/#Column) 的配置，同时也提供了一些更方便的 api，加快书写**

| 属性      | 描述                                                                        | 类型                                                  | 默认值 |
| --------- | --------------------------------------------------------------------------- | ----------------------------------------------------- | ------ |
| ellipsis  | 是否自动缩略                                                                | boolean                                               | -      |
| copyable  | 是否支持复制                                                                | boolean                                               | -      |
| valueType | 值的类型，详见下方 `valueType 配置`                                         | `string`（`text` \| `money` \| `date` \| `dateTime`） | `text` |
| enum      | 当前列值的枚举，详见[高级用法](https://x-render.gitee.io/table-render/demo) | `object`                                              | -      |

- **valueType 值类型**：TableRender 封装了一些常用的值类型来减少重复的 render 操作，配置一个 valueType 即可展示格式化响应的数据，具体使用可参考 [案例代码](https://x-render.gitee.io/table-render/demo)：

  | 属性     | 描述                                                               |
  | -------- | ------------------------------------------------------------------ |
  | text     | 普通的文本类型                                                     |
  | date     | 当数据是日期类型的返回时，会自动将格式转换为 '2020-10-20'          |
  | dateTime | 当数据是日期类型的返回时，会自动将格式转换为 '2020-10-20 19:30:00' |
  | money    | 当数据是金额时，会自动将格式转换为 '¥999,999,999.99'               |

### Context 上下文

**可通过 `useTable` 获取 `table-render` 的 context，例如: `refresh`、`tableState`、`setTable` 等属性**

| 属性        | 描述                                                                                            | 类型       |
| ----------- | ----------------------------------------------------------------------------------------------- | ---------- |
| tableState  | 这些是全局的状态，根据需要使用                                                                  | `object`   |
| refresh     | 刷新表格数据                                                                                    | `function` |
| clearSearch | 重置筛选项                                                                                      | `function` |
| setTable    | 用于修改全局状态的工具函数，setTable 之于 tableState，等同 setState 之于 state                  | `function` |
| changeTab   | 手动切换 tab 的函数，例如目前两个搜索 tab： “我的活动”，“全部活动” （分别对应 tab 值为 0 和 1） | `function` |

- **导出 useTable 以及对应的方法**

  ```js
  import { useTable } from 'table-render';
  const { refresh, tableState, setTable } = useTable();
  ```

- **其中 tableState 的数据格式如下：**

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

- **refresh 用法**

  | 入参 | 类型      | 说明                                                                            |
  | ---- | --------- | ------------------------------------------------------------------------------- |
  | stay | `boolean` | 刷新是否保留在现在的页码上，默认 false，回到第一页                              |
  | tab  | `number`  | 0,1,2.. 如果 searchApi 是数组会出现的搜索选择 tab，用于强制搜索某个 tab，不常用 |

  1. 直接用：refresh()
  2. 刷新数据，但停留在现有的页码：refresh({ stay: true })

- **changeTab 用法**

  ```js
  //以下代码将手动切换到“全部活动”（tab = 1）
  const { changeTab } = useTable();
  //...
  const onClick = () => {
    changeTab(1);
  };
  ```
