---
order: 1
title: 使用教程
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:38px;display:inline-block;margin-left:12px">ChartRender</span>
</div>
<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/chart-render?_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/chart-render.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/chart-render">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/chart-render.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/chart-render">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/chart-render.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

> 易用的中后台**图表解决方案**，常用于**图表展示页**快速生成

## 优势

1. **真正开箱即用**：只需要关心你的数据，传入 `meta`、`data` 即可出图。
2. **开发体验舒适**：使用 TypeScript 开发，提供完整的类型定义文件。
3. **无缝习惯使用**：图表用 Ant Design Charts 来提供，自定义的样式支持参数透传。

## 何时使用

1. 需要针对一堆数据快速建立可视化图表，并且需要**折线图/柱状图/表格**频繁切换查看。
2. 前端小白，只关心手里的数据，不想看长篇大论了解那些图表库该怎么使用，只想搭个图表看。

## 如何使用

### 安装

chart-render 目前默认使用 Ant Design Charts，所以请在 Ant Design Charts 项目下使用

```bash
$ npm install chart-render @ant-design/charts --save
```

### 代码演示

```jsx
import React, { useState } from 'react';
import { Line, Column, PivotTable } from 'chart-render';

export default () => {
  const [component, setComponent] = useState('Line');
  const C = { Line, Column, PivotTable }[component];

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <button
          style={{ marginRight: 10 }}
          className="ant-btn ant-btn-primary"
          onClick={() => setComponent('Line')}
        >
          折线图
        </button>
        <button
          style={{ marginRight: 10 }}
          className="ant-btn ant-btn-primary"
          onClick={() => setComponent('Column')}
        >
          柱状图
        </button>
        <button
          style={{ marginRight: 10 }}
          className="ant-btn ant-btn-primary"
          onClick={() => setComponent('PivotTable')}
        >
          交叉表
        </button>
      </div>
      {C && (
        <C
          meta={[
            { id: 'date', name: '日期', isDim: true },
            { id: 'pv', name: '访问量', isDim: false },
            { id: 'uv', name: '访客数', isDim: false },
          ]}
          data={[
            { date: '20200101', pv: 100, uv: 50 },
            { date: '20200102', pv: 120, uv: 60 },
            { date: '20200103', pv: 140, uv: 70 },
            { date: '20200104', pv: 160, uv: 80 },
          ]}
        />
      )}
    </div>
  );
};
```

## API

### 通用参数

所有的图表组件都有以下 4 个入参：

| 参数      | 说明             | 类型                        | 默认值 | 是否必填 |
| --------- | ---------------- | --------------------------- | ------ | -------- |
| style     | 最外层容器的样式 | `React.CSSProperties`       | -      | 否       |
| className | 最外层容器的类名 | `string`                    | -      | 否       |
| data      | 数据             | `IDataItem[]`               | -      | 是       |
| meta      | 元数据描述       | [`IMetaItem[]`](#imetaitem) | -      | 是       |

#### IMetaItem

| 参数   | 说明                                                                 | 类型      | 是否必填 |
| ------ | -------------------------------------------------------------------- | --------- | -------- |
| id     | 对应单条数据项的 key 名                                              | `string`  | 是       |
| name   | 对应单条数据项的 key 的描述                                          | `string`  | 是       |
| isDim  | 是否是维度，`true`-维度，`false`-指标                                | `boolean` | 是       |
| isRate | 是否是百分数，仅限指标使用，启用后，数值 `0.5` 会以 `50%` 来输出渲染 | `boolean` | 否       |

### Line 折线图

| 参数     | 说明                                                                                                                                                         | 类型      | 默认值  | 是否必填 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------- | -------- |
| withArea | 是否以面积图展示<br> - 注意面积图默认堆叠展示，如不需要可以传入 `isStack={false}` 覆盖<br> - 开启面积图后方可使用 `areaStyle` `startOnZero` `isPercent` 属性 | `boolean` | `false` | 否       |

除了 `yField`、`xField`、`seriesField` 不做透传，其他字段均做透传处理，参数表参见：[折线图参数表](https://charts.ant.design/zh-CN/demos/line?type=api) [面积图参数表](https://charts.ant.design/zh-CN/demos/area?type=api)

### Column 柱状图

| 参数     | 说明             | 类型      | 默认值  | 是否必填 |
| -------- | ---------------- | --------- | ------- | -------- |
| inverted | 是否以条形图展示 | `boolean` | `false` | 否       |

除了 `yField`、`xField`、`seriesField` 不做透传，其他字段均做透传处理，参数表参见：[柱状图参数表](https://charts.ant.design/zh-CN/demos/column?type=api)

### PivotTable 交叉表

| 参数                | 说明                                                                      | 类型                                                                    | 默认值             | 是否必填 |
| ------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------ | -------- |
| showSubtotal        | 是否展示总计小计                                                          | `boolean`                                                               | `true`             | 否       |
| subtotalText        | 总计小计的文案                                                            | `[string, string]`                                                      | `['总计', '小计']` | 否       |
| indicatorSide       | 指标的展示位置                                                            | `'left' \| 'top'`                                                       | `'top'`            | 否       |
| size                | 表格尺寸                                                                  | `'small' \| 'middle' \| 'large'`                                        | `'middle'`         | 否       |
| leftDimensionLength | 左侧维度放多少个，超出的维度会放到表格顶部                                | `number`                                                                | -                  | 否       |
| leftExpandable      | 左侧维度允许展开/收起                                                     | `boolean`                                                               | `false`            | 否       |
| topExpandable       | 顶部维度允许展开/收起                                                     | `boolean`                                                               | `false`            | 否       |
| cellRender          | 单元格自定义渲染函数，可见[高级案例](./demo/pivot-table#自定义单元格渲染) | `(value: any, dimRecord: IDataItem, indId: string ) => React.ReactNode` | -                  | 否       |
