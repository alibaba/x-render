---
order: 0
group: 
  title: 其他
  order: 5
---
# API

## TableRender

对 Antd Table 的 [props](https://ant-design.antgroup.com/components/table-cn/#Table) 完全兼容，但 `dataSource`, `loading` 这两个参数是内部状态，不允许配置

| 属性                  | 描述                                                                      | 类型                 | 默认值     |
| --------------------- | ------------------------------------------------------------------------ | ------------------- | --------- |
| search                | 搜索表单，不传就是无查询列表                                                                  | [Search](#search)| - | -   |
| request                | **必填**，初始化&点击查询时执行的函数                                            | [Request](#request-1)    | - | -   |    
| title                 | 表格标题                                                                  | `string \| ReactNode`| - | -   |
| toolbarRender         | 表格主体右上方的控件，例如“添加”按钮                                      | `() => ReactNode` | false     |
| toolbarAction         | 显示在表格主体右上方的 Icon 列表，内置了刷新、调整密度、全屏显示等功能 | `boolean`           | false     |
| pageChangeWithRequest | 切换分页时是否需要请求接口                                                | `boolean`           | true      |
| columns               | 列定义                                                                    | [ProColumnsType](#columns)    | -     |


## Search

我们将搜索相关的能力放到 `<Search />` 上面配置，包括对应的搜索筛选表单的渲染

| 属性               | 描述                                                                                  | 类型                                   | 默认值  |
| ------------------ | ------------------------------------------------------------------------------------- | -------------------------------------- | ------- | 
| schema             | **必填**，用于渲染查询表单，详见[form-render 文档](/form-render/schema/schema) | [SchemaBase](https://github.com/alibaba/x-render/blob/master/packages/form-render/src/index.d.ts#L16)                               | -       | 
| collapsed           | 是否可折叠                             | `boolean`          |  -    |
| defaultCollapsed    | 折叠收起                               | `boolean`          |  true   |
| loading             | 查询按钮加载中                          | `boolean`          |  -    |
| column              | 一行多列                               | `number`           |  4    |
| layoutAuto            | 自适应布局，可设置为 true / false 或对象：{ fieldMinWidth: `number` }， 当设置fieldMinWidth 会根据最小宽度动态自适应                         | `boolean` or `object`         |  `true `   |
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

## Request
入参：`params`、`sorter`，分别是表单筛选项的值、排序参数。
出参： 需要返回一个对象，此对象中必须要有 `data` 和 `total`。
 
```jsx | pure
const request = async (params, sorter) => {
  const result = await getTableData(params, sorter);

  return {
    data: result.list,    // request 对应表格的 dataSource，必须返回
    total: result.total,  // total 对应数据的总数，用于分页，必须返回
  }
}

```
**多个请求**： 用于 TableRender 多个 Tab 的情况
```jsx | pure

const getHotel = async (params) => {
  const result = await getHotelData(params);
  return {
    data: result.list,
    total: result.total,
  }
};

const getPeople = async (params) => {
  const result = await getPeopleData(params);
  return {
    data: result.list,
    total: result.total,
  }
};

const request = [
  { name: '酒店数据', api: getHotel },
  { name: '人员数据', api: getPeople },
];

```
## Columns

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
  | dateRange | 当数据是日期区间类型的返回时，会自动将格式转换为 `YYYY-MM-DD`          |
  | money    | 当数据是金额时，会自动将格式转换为 `¥0,0.00`               |
  | money    | 当数据是金额时，会自动将格式转换为 `¥0,0.00`               |
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

## Ref

可通过 `Ref` 获取如下 `table-render` 的 context

| 属性       | 描述                                                                                                                 | 类型       |
| ---------- | -------------------------------------------------------------------------------------------------------------------- | ---------- |
| refresh    | 刷新表格数据，详见[Refresh](#refresh)                                                                                                         | `(config, search) => Promise<void>` |
| changeTab  | 手动切换 tab 的函数，例如目前两个搜索 tab： “我的活动”，“全部活动” （分别对应 tab 值为 0 和 1），详见[ChangeTab](#changetab)                      | `(tab) => void` |
| form       | Search 组件是 form-render 生成的，可以取到搜索表单的 form 实例以及挂在上面的方法，例如 `form.resetFields` 清空搜索项 | `object`   |
| getState | 这些是全局的状态，根据需要使用                                                                                       | [TableStateType](#tablestate)   |
| setState   | 用于修改全局状态的工具函数，setTable 之于 tableState，等同 setState 之于 state                                       | `(tableState) => void` |

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


const onClick = () => {
  tableRef.current.refresh({ stay: true }); // 刷新数据，但停留在现有的页码
}

```

#### ChangeTab

手动切换当前 tab 的方法

  ```ts
  type ChangeTab = (
    tab: number
  ) => Promise<void>;

  const onClick = () => {
    tableRef.current.changeTab(1);   // 手动切换到对应tab
  };
  ```
