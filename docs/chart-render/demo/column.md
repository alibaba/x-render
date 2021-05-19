---
order: 3
title: 柱状图
group:
  title: 案例展示
  order: 2
---

## 基本用法

### N 指标 零维度

- 图表渲染上，指标作为 `x 轴`，指标值作为 `y 轴`。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Column } from 'chart-render';

export default () => (
  <Column
    meta={[
      { id: 'pv', name: '访问量' },
      { id: 'uv', name: '访客数' },
    ]}
    data={[{ pv: 50, uv: 20 }]}
  />
);
```

### 单指标 单维度

- 图表渲染上，维度作为 `x 轴`，指标作为 `y 轴`。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Column } from 'chart-render';

export default () => (
  <Column
    meta={[
      { id: 'ds', name: '日期', isDim: true },
      { id: 'uv', name: '访客数' },
    ]}
    data={[
      { ds: '2020-12-31', uv: 20 },
      { ds: '2021-01-01', uv: 21 },
      { ds: '2021-01-02', uv: 15 },
      { ds: '2021-01-03', uv: 40 },
      { ds: '2021-01-04', uv: 31 },
      { ds: '2021-01-05', uv: 32 },
      { ds: '2021-01-06', uv: 30 },
    ]}
  />
);
```

### 单指标 双维度

- 图表渲染上，第一维度作为 `x 轴`，指标作为 `y 轴`，第二维度作为 `系列`。
- 数据上，数据条数是 `「单指标 单维度」` 的两倍。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Column } from 'chart-render';

export default () => (
  <Column
    meta={[
      { id: 'ds', name: '日期', isDim: true },
      { id: 'page', name: '页面名称', isDim: true },
      { id: 'uv', name: '访客数' },
    ]}
    data={[
      { ds: '2020-12-31', page: '登录页', uv: 20 },
      { ds: '2020-12-31', page: '首页', uv: 120 },
      { ds: '2021-01-01', page: '登录页', uv: 21 },
      { ds: '2021-01-01', page: '首页', uv: 121 },
      { ds: '2021-01-02', page: '登录页', uv: 15 },
      { ds: '2021-01-02', page: '首页', uv: 115 },
      { ds: '2021-01-03', page: '登录页', uv: 40 },
      { ds: '2021-01-03', page: '首页', uv: 140 },
      { ds: '2021-01-04', page: '登录页', uv: 31 },
      { ds: '2021-01-04', page: '首页', uv: 131 },
      { ds: '2021-01-05', page: '登录页', uv: 32 },
      { ds: '2021-01-05', page: '首页', uv: 132 },
      { ds: '2021-01-06', page: '登录页', uv: 30 },
      { ds: '2021-01-06', page: '首页', uv: 130 },
    ]}
  />
);
```

### 多指标 单维度

- 图表渲染上，维度作为 `x 轴`，指标分 `系列` 展示。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Column } from 'chart-render';

export default () => (
  <Column
    meta={[
      { id: 'ds', name: '日期', isDim: true },
      { id: 'pv', name: '访问量' },
      { id: 'uv', name: '访客数' },
    ]}
    data={[
      { ds: '2020-12-31', pv: 50, uv: 20 },
      { ds: '2021-01-01', pv: 76, uv: 21 },
      { ds: '2021-01-02', pv: 46, uv: 15 },
      { ds: '2021-01-03', pv: 89, uv: 40 },
      { ds: '2021-01-04', pv: 66, uv: 31 },
      { ds: '2021-01-05', pv: 46, uv: 32 },
      { ds: '2021-01-06', pv: 45, uv: 30 },
    ]}
  />
);
```

## 高级用法

### 图形上显示数字的条形图

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Column } from 'chart-render';

export default () => (
  <Column
    inverted
    label={{
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    }}
    meta={[
      { id: 'ds', name: '日期', isDim: true },
      { id: 'pv', name: '访问量' },
      { id: 'uv', name: '访客数' },
    ]}
    data={[
      { ds: '2020-12-31', pv: 50, uv: 20 },
      { ds: '2021-01-01', pv: 76, uv: 21 },
      { ds: '2021-01-02', pv: 46, uv: 15 },
      { ds: '2021-01-03', pv: 89, uv: 40 },
      { ds: '2021-01-04', pv: 66, uv: 31 },
      { ds: '2021-01-05', pv: 46, uv: 32 },
      { ds: '2021-01-06', pv: 45, uv: 30 },
    ]}
  />
);
```
