---
order: 1
title: 使用教程
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">ChartRender</span>
</div>

<p style="display:flex;justify-content:space-between;width:500px">
  <a href="https://www.npmjs.com/package/chart-render?_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/chart-render.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/chart-render">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/chart-render.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/chart-render">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/chart-render.svg?style=flat-square">
  </a>
  <a href="https://github.com/alibaba/x-render" >
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

> 注意：ChartRender 目前还处于开发状态，可能存在破坏性更新，请关注更新日志。

> 易用且轻量的中后台**图表解决方案**，常用于**图表展示页**快速生成

## 简介

1. **真正开箱即用**：以最简单的 API 配置请求，就能生成一个好用搜索图表。
2. **XRender 生态**：搜索筛选能力用 [FormRender](./form-render) 来提供，以最小成本快速生成搜索面板。
3. **无缝习惯使用**：表格能用 [Ant Design Charts](https://charts.ant.design/) 来提供，降低用户使用成本。

## 安装

```sh
npm i chart-render --save
```

## 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * background: 'rgb(245,245,245)'
 */
import React from 'react';
import { Column, Search, withChart } from 'chart-render';
import { Card } from 'antd';

const schema = {
  type: 'object',
  properties: {
    os: {
      type: 'string',
      enum: ['Windows', 'MacOS', 'Android', 'iOS'],
      enumNames: ['Windows', 'MacOS', 'Android', 'iOS'],
      props: { placeholder: '操作系统' },
      required: true,
    },
    location: {
      type: 'string',
      enum: ['杭州', '宁波', '嘉兴', '金华'],
      enumNames: ['杭州', '宁波', '嘉兴', '金华'],
      props: { placeholder: 'IP 属地' },
    },
  },
};

const api = ({ filters }) => {
  console.log('filters >>> ', filters);
  return new Promise((resolve) => setTimeout(() => {
    const meta = [
      { id: 'ds', name: '日期', isDim: true },
      { id: 'pv', name: '访问量' },
      { id: 'uv', name: '访客数' },
    ];
    const data = [...new Array(24)].map((_, index) => ({
      ds: `2022-01-${String(index + 1).padStart(2, 0)}`,
      pv: Math.floor(Math.random() * 100) + 100,
      uv: Math.floor(Math.random() * 100),
    }));
    resolve({ meta, data });
  }, 1000));
};

const App = () => {
  return (
    <Card title="访问趋势" extra={<Search searchOnChange api={api} schema={schema} />}>
      <Column />
    </Card>
  );
};

export default withChart(App);
```

## API

### withChart

ChartRender 在底层使用了 Context 管理内部状态，`withChart` 是 Context Provider 高阶组件形式的语法糖，使用时需要使用 `withChart` 包裹图表组件

```js
import { withChart, useChart } from 'chart-render';

const App = () => {
  const { refresh } = useChart();
};

export default withChart(App);
```

### Search

我们将搜索相关的能力放到 `<Search />` 上面配置，包括对应的搜索筛选表单的渲染

| 属性               | 描述                                                                                                           | 类型                                              | 默认值  |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------- | 
| schema             | **必填**，用于渲染查询表单                                                                                       | [`FormRender.Schema`](/form-render/api/schema)    | -       | 
| api                | **必填**，初始化&点击查询时执行的函数，详见 [Api](#api-1)                                                           | `({ filters }) => ({ meta, data })`               | -      | 
| hidden             | 是否隐藏                                                                                                       | `boolean`                                         | `false` |
| size               | 组件大小                                                                                                       | `'small'`                                         | -      |
| searchButton       | 是否展示查询按钮，支持透传更多 Button 属性                                                                          | `boolean` / [`Button.API`](https://ant.design/components/button-cn/#API) | `true`       | 
| searchOnMount      | 组件初次挂载时，是否默认执行查询动作                                                                                | `boolean`                                         | `true`      | 
| searchOnChange     | 表单值变化时，是否默认执行查询动作，也可以指定哪些表单字段变化时触发                                                      | `boolean` / `string[]`                           | `true`      | 
| filters            | 固定筛选项，变化的时候会重新触发数据请求，请求时会和表单筛选项合并传入 api                                                | `object`                                          | `{}`      | 
| ...rest            | 多余的组件参数会透传给 `FormRender`，支持 `watch`、`widgets` 等，详见 [FormRender.Props](./form-render/api/props)    | `object`                                          | `{}`      | 

#### Api

- `api` 的入参是一个对象，对象内有 `filters`，是筛选项的值，该值包含固定筛选项+表单筛选项。`api` 需要返回一个对象，此对象中必须要有 `meta` 和 `data`。
- 表单查询时 `api` 会被自动调用，同时带入最新的表单值和其他查询参数
 
```jsx | pure
const api = async ({ filters }) => {
  const result = await requestData(filters);

  return {
    meta: result.meta, // meta 对应数据每个字段的描述信息，必须返回
    data: result.data, // data 对应数据，必须返回
  };
};

<Search api={api} />
```

#### data

是普通的对象数组，形如：

```js
[
  { date: '20200101', pv: 100, uv: 50 },
  { date: '20200102', pv: 120, uv: 60 },
  { date: '20200103', pv: 140, uv: 70 },
  { date: '20200104', pv: 160, uv: 80 },
]
```

#### meta

用来描述 data 的各个字段的东西，形如：

```js
/**
 * id: 对应单条数据项的 key 名
 * name: 对应单条数据项的 key 的描述
 * isDim: 是否是维度，`true`-维度，`false`-指标
 * isRate: 是否是百分数，仅限指标使用，启用后，数值 `0.5` 会以 `50%` 来输出渲染
 */
[
  { id: 'date', name: '日期', isDim: true, isRate: false },
  { id: 'pv', name: '访问量', isDim: false, isRate: false },
  { id: 'uv', name: '访客数', isDim: false, isRate: false },
]
```

### useChart

可通过 `useChart` 获取如下 `chart-render` 的 context，在 `withChart` 内部可以任意地方调用。

| 属性       | 描述                                                                                                                 | 类型       |
| ---------- | -------------------------------------------------------------------------------------------------------------------- | ---------- |
| form       | Search 组件是 form-render 生成的，可以取到搜索表单的 form 实例以及挂在上面的方法，例如 `form.resetFields` 清空搜索项 | `FormInstance`   |
| refresh    | 刷新表格数据                                                          | `() => void`       |
| loading    | 是否处于加载状态                                                       | `boolean`          |
| dataSource | 数据源，由 meta 和 data 组成                                           | `{ meta, data }`   |
| setChart   | 用于修改全局状态的工具函数，可以设定除了 `setChart` 和 `form` 外的其他状态值  | `(store) => void`  |

在通过 `useChart` 获取单一状态值的时候，建议使用切片以减少不必要的渲染。

```js
import { useChart, withChart } from 'chart-render';

const App = () => {
  const { loading } = useChart(); // ❎ 可以这么写，但是不推荐，它会导致组件在每次状态更改时更新
  const loading = useChart(state => state.loading); // ✅ 推荐写法，以严格相等（旧 === 新）检测更改
  const loading = useChart(state => state.loading, compareFn); // ✅ 为了更好地控制重新渲染，你可以提供任何自定义相等函数
};

export default withChart(App);
```

#### refresh

主动触发图表刷新的方法。

由于 `refresh` 是在 `Search` 组件加载时同步放入状态中的，所以请确保你在调用 `refresh` 的时候，`Search` 组件已经加载完毕了！！！

> 如下面的示例，需要在 `CustomChart` 中调用 `refresh`。
> 在 `App1` 中，先加载完 `Search` 再加载 `CustomChart`，此时调用 `refresh` 没有问题。
> 在 `App2` 中，先加载完 `CustomChart` 再加载 `Search`，此时调用 `refresh` 会报错！

```js
const CustomChart = () => {
  const refresh = useChart(state => state.refresh);

  useEffect(() => {
    refresh();
  }, []);

  return <XXX />;
};

const App1 = () => {
  return (
    <div>
      <Search />
      <CustomChart /> // ✅ 此时内部的 refresh 可以正常调用
    </div>
  );
};

const App2 = () => {
  return (
    <div>
      <CustomChart /> // ❎ 此时内部的 refresh 是 undefined
      <Search />
    </div>
  );
};
```
