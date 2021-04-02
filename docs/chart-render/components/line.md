---
group:
  title: 组件
  order: 2
order: 1
title: Line 折线图
toc: content
---

# Line 折线图

## 单指标 单维度

- 图表渲染上，维度作为 `x 轴`，指标作为 `y 轴`。

```jsx
import React from 'react';
import { Line } from 'chart-render';

export default () => (
  <Line
    meta={[
      { id: "ds", name: "日期", isDim: true },
      { id: "uv", name: "访客数" },
    ]}
    data={[
      { ds: "2020-12-31", uv: 20 },
      { ds: "2021-01-01", uv: 21 },
      { ds: "2021-01-02", uv: 15 },
      { ds: "2021-01-03", uv: 40 },
      { ds: "2021-01-04", uv: 31 },
      { ds: "2021-01-05", uv: 32 },
      { ds: "2021-01-06", uv: 30 },
    ]}
  />
);
```

## 单指标 双维度

- 图表渲染上，第一维度作为 `x 轴`，指标作为 `y 轴`，第二维度作为 `系列`。
- 数据上，数据条数是 `「单指标 单维度」` 的两倍。

```jsx
import React from 'react';
import { Line } from 'chart-render';

export default () => (
  <Line
    meta={[
      { id: "ds", name: "日期", isDim: true },
      { id: "page", name: "页面名称", isDim: true },
      { id: "uv", name: "访客数" },
    ]}
    data={[
      { ds: "2020-12-31", page: "登录页", uv: 20 },
      { ds: "2020-12-31", page: "首页", uv: 120 },
      { ds: "2021-01-01", page: "登录页", uv: 21 },
      { ds: "2021-01-01", page: "首页", uv: 121 },
      { ds: "2021-01-02", page: "登录页", uv: 15 },
      { ds: "2021-01-02", page: "首页", uv: 115 },
      { ds: "2021-01-03", page: "登录页", uv: 40 },
      { ds: "2021-01-03", page: "首页", uv: 140 },
      { ds: "2021-01-04", page: "登录页", uv: 31 },
      { ds: "2021-01-04", page: "首页", uv: 131 },
      { ds: "2021-01-05", page: "登录页", uv: 32 },
      { ds: "2021-01-05", page: "首页", uv: 132 },
      { ds: "2021-01-06", page: "登录页", uv: 30 },
      { ds: "2021-01-06", page: "首页", uv: 130 },
    ]}
  />
);
```

## 多指标 单维度

- 图表渲染上，维度作为 `x 轴`，指标分 `系列` 展示。

```jsx
import React from 'react';
import { Line } from 'chart-render';

export default () => (
  <Line
    meta={[
      { id: "ds", name: "日期", "isDim": true },
      { id: "pv", name: "访问量" },
      { id: "uv", name: "访客数" }
    ]}
    data={[
      { ds: "2020-12-31", pv: 50, uv: 20 },
      { ds: "2021-01-01", pv: 76, uv: 21 },
      { ds: "2021-01-02", pv: 46, uv: 15 },
      { ds: "2021-01-03", pv: 89, uv: 40 },
      { ds: "2021-01-04", pv: 66, uv: 31 },
      { ds: "2021-01-05", pv: 46, uv: 32 },
      { ds: "2021-01-06", pv: 45, uv: 30 },
    ]}
  />
);
```

## 面积图

- 图表渲染上，维度作为 `x 轴`，指标分 `系列` 展示。

```jsx
import React from 'react';
import { Line } from 'chart-render';

export default () => (
  <Line
    withArea
    meta={[
      { id: "ds", name: "日期", "isDim": true },
      { id: "pv", name: "访问量" },
      { id: "uv", name: "访客数" }
    ]}
    data={[
      { ds: "2020-12-31", pv: 50, uv: 20 },
      { ds: "2021-01-01", pv: 76, uv: 21 },
      { ds: "2021-01-02", pv: 46, uv: 15 },
      { ds: "2021-01-03", pv: 89, uv: 40 },
      { ds: "2021-01-04", pv: 66, uv: 31 },
      { ds: "2021-01-05", pv: 46, uv: 32 },
      { ds: "2021-01-06", pv: 45, uv: 30 },
    ]}
  />
);
```
