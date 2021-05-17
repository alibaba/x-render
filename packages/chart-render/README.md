<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <h4 style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">ChartRender</span>
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

## 官网

<https://x-render.gitee.io/chart-render>

## 优势

1. **真正开箱即用**：只需要关心你的数据，传入 `meta`、`data` 即可出图。
2. **开发体验舒适**：使用 TypeScript 开发，提供完整的类型定义文件。
3. **无缝习惯使用**：图表用 Ant Design Charts 来提供，自定义的样式支持参数透传。

## 何时使用

1. 需要针对一堆数据快速建立可视化图表，并且需要 **折线图/柱状图/交叉表** 频繁切换查看。
2. 前端小白，只关心手里的数据，不想看长篇大论了解那些图表库该怎么使用，只想搭个图表看。
3. 提供折线图、柱状图、交叉表三类组件进行图表绘制：
   - 折线图：常用来观察资料在一段维度之内的变化，如果 X 轴为时间，这种折线图又称为趋势图。
   - 柱状图：描述的是分类数据，常用来回答的是每一个分类中「有多少？」这个问题。
   - 交叉表：是一种矩阵形式的表格，拥有最强大的数据分析能力，可以展示无限指标和无限维度间的关系。

## 如何使用

### 安装

chart-render 依赖 ant design，单独使用不要忘记安装～

```bash
$ npm install chart-render --save
```

### 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { Line, Column, PivotTable } from 'chart-render';

export default () => {
  const [component, setComponent] = useState('Line');
  const ChartRender = { Line, Column, PivotTable }[component];

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

      <ChartRender
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
    </div>
  );
};
```

## API

### 通用参数

所有的图表组件都有以下 4 个入参（**`data` 和 `meta` 是必传的参数**，请务必注意）：

| 参数      | 说明               | 类型                  | 是否必填 |
| --------- | ------------------ | --------------------- | -------- |
| style     | 最外层容器的样式   | `React.CSSProperties` | 否       |
| className | 最外层容器的类名   | `string`              | 否       |
| data      | 数据配置项 `注1`   | `IDataItem[]`         | 是       |
| meta      | 元数据配置项 `注2` | `IMetaItem[]`         | 是       |

##### 注 1：通用参数 - data 数据配置项

是普通的对象数组，形如：

```js
[
  { date: '20200101', pv: 100, uv: 50 },
  { date: '20200102', pv: 120, uv: 60 },
  { date: '20200103', pv: 140, uv: 70 },
  { date: '20200104', pv: 160, uv: 80 },
];
```

##### 注 2：通用参数 - meta 元数据配置项

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
];
```

### Line 折线图的额外参数

| 参数     | 说明                                                                                                                                                         | 类型      | 默认值  | 是否必填 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------- | -------- |
| withArea | 是否以面积图展示<br> - 注意面积图默认堆叠展示，如不需要可以传入 `isStack={false}` 覆盖<br> - 开启面积图后方可使用 `areaStyle` `startOnZero` `isPercent` 属性 | `boolean` | `false` | 否       |

如果你需要修改点、线等样式，可以参考参数表：[折线图参数表](https://charts.ant.design/zh-CN/demos/line?type=api) [面积图参数表](https://charts.ant.design/zh-CN/demos/area?type=api)，除了 `yField`、`xField`、`seriesField` 三个字段不做透传，其他字段均做透传处理。

### Column 柱状图的额外参数

| 参数     | 说明             | 类型      | 默认值  | 是否必填 |
| -------- | ---------------- | --------- | ------- | -------- |
| inverted | 是否以条形图展示 | `boolean` | `false` | 否       |

如果你需要修改颜色、柱等样式，可以参考参数表：[柱状图参数表](https://charts.ant.design/zh-CN/demos/column?type=api)，除了 `yField`、`xField`、`seriesField` 三个字段不做透传，其他字段均做透传处理。

### PivotTable 交叉表的额外参数

| 参数                | 说明                                                                                                                                                                                                   | 类型                                                                    | 默认值             | 是否必填 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------------ | -------- |
| showSubtotal        | 是否展示总计小计                                                                                                                                                                                       | `boolean`                                                               | `true`             | 否       |
| subtotalText        | 总计小计的文案                                                                                                                                                                                         | `[string, string]`                                                      | `['总计', '小计']` | 否       |
| indicatorSide       | 指标的展示位置                                                                                                                                                                                         | `'left' \| 'top'`                                                       | `'top'`            | 否       |
| size                | 表格尺寸                                                                                                                                                                                               | `'small' \| 'middle' \| 'large'`                                        | `'middle'`         | 否       |
| leftDimensionLength | 左侧维度放多少个，超出的维度会放到表格顶部                                                                                                                                                             | `number`                                                                | -                  | 否       |
| leftExpandable      | 左侧维度允许展开/收起                                                                                                                                                                                  | `boolean`                                                               | `false`            | 否       |
| topExpandable       | 顶部维度允许展开/收起                                                                                                                                                                                  | `boolean`                                                               | `false`            | 否       |
| cellRender          | 单元格自定义渲染函数，可见[交叉表案例 - 高级案例 - 自定义单元格渲染](https://x-render.gitee.io/chart-render/demo/pivot-table#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8D%95%E5%85%83%E6%A0%BC%E6%B8%B2%E6%9F%93) | `(value: any, dimRecord: IDataItem, indId: string ) => React.ReactNode` | -                  | 否       |
