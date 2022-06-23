---
order: 2
title: 案例展示 - 折线图
group:
  title: 【归档】0.1.X 版本文档
  order: 999
---

## 基本用法

### 单指标 单维度

- 图表渲染上，维度作为 `x 轴`，指标作为 `y 轴`。

<img src="https://gw.alipayobjects.com/zos/antfincdn/BuatJtOJ7/ff0e3f12-bc8a-49c9-bc60-175a8dbbdc82.png" style="border: 1px solid #ebedf1" />

```js
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Line } from 'chart-render';

export default () => (
  <Line
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

<img src="https://gw.alipayobjects.com/zos/antfincdn/LhXumsY5L/e5193c0f-900b-409c-ad4e-5fbf537b66bd.png" style="border: 1px solid #ebedf1" />

```js
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Line } from 'chart-render';

export default () => (
  <Line
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

### 双指标 双维度

- 图表渲染上，会以双 y 轴折线图展示。
- 第一维度作为 `x 轴`，第二维度作为 `系列`，第一指标作为 `左 y 轴`，第二指标作为 `右 y 轴`。

<img src="https://gw.alipayobjects.com/zos/antfincdn/A7OshJhkm/e54b3e35-0005-4956-8423-02791179b574.png" style="border: 1px solid #ebedf1" />

```js
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Line } from 'chart-render';

export default () => (
  <Line
    meta={[
      { id: 'ds', name: '日期', isDim: true },
      { id: 'page', name: '页面名称', isDim: true },
      { id: 'uv', name: '访客数' },
      { id: 'pv', name: '访问量' },
    ]}
    data={[
      { ds: '2020-12-31', page: '登录页', uv: 20, pv: 120 },
      { ds: '2020-12-31', page: '首页', uv: 120, pv: 1120 },
      { ds: '2021-01-01', page: '登录页', uv: 21, pv: 121 },
      { ds: '2021-01-01', page: '首页', uv: 121, pv: 1121 },
      { ds: '2021-01-02', page: '登录页', uv: 15, pv: 115 },
      { ds: '2021-01-02', page: '首页', uv: 115, pv: 1115 },
      { ds: '2021-01-03', page: '登录页', uv: 40, pv: 140 },
      { ds: '2021-01-03', page: '首页', uv: 140, pv: 1140 },
      { ds: '2021-01-04', page: '登录页', uv: 31, pv: 131 },
      { ds: '2021-01-04', page: '首页', uv: 131, pv: 1131 },
      { ds: '2021-01-05', page: '登录页', uv: 32, pv: 132 },
      { ds: '2021-01-05', page: '首页', uv: 132, pv: 1132 },
      { ds: '2021-01-06', page: '登录页', uv: 30, pv: 130 },
      { ds: '2021-01-06', page: '首页', uv: 130, pv: 1130 },
    ]}
  />
);
```

### 多指标 单维度

- 图表渲染上，维度作为 `x 轴`，指标分 `系列` 展示。

<img src="https://gw.alipayobjects.com/zos/antfincdn/NAOxh8EbB/7d536bd3-4b63-45c9-a96c-d918a61d9b56.png" style="border: 1px solid #ebedf1" />

```js
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Line } from 'chart-render';

export default () => (
  <Line
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

### 百分比堆叠面积图

<img src="https://gw.alipayobjects.com/zos/antfincdn/XIcTikHf5/6b57f951-5f44-4cab-9b7c-8f70aa4f3207.png" style="border: 1px solid #ebedf1" />

```js
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Line } from 'chart-render';

export default () => (
  <Line
    withArea // 开启面积图
    isStack // 堆叠展示
    isPercent // 百分比面积图
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
