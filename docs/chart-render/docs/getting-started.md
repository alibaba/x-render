---
group:
  title: 文档
  order: 1
order: 2
title: 快速上手
toc: content
---

# 快速上手

## 安装

chart-render 目前默认使用 Ant Design Charts，所以请在 Ant Design Charts 项目下使用

```bash
$ npm install chart-render @ant-design/charts --save
```

## 最简示例

|  日期     |  访问量  | 访客数 |
|  ------- |  -----  | ----  |
| 20200101 |  100    | 50    |
| 20200102 |  120    | 60    |
| 20200103 |  140    | 70    |
| 20200104 |  160    | 80    |

每一个图表都拥有相同的基础入参 `meta` 和 `data`，还有一些展示相关的其他参数可以深入各个组件文档中查阅。

```jsx
import React, { useState } from 'react';
import { Line, Column, PivotTable } from 'chart-render';

export default () => {
  const [component, setComponent] = useState('Line');
  const C = { Line, Column, PivotTable }[component];

  return (
    <div>
      <div>
        <button onClick={() => setComponent('Line')}>折线图</button>
        <button onClick={() => setComponent('Column')}>柱状图</button>
        <button onClick={() => setComponent('PivotTable')}>交叉表</button>
      </div>
      {C && (
        <C
          meta={[
            { "id": "date", "name": "日期", "isDim": true },
            { "id": "pv", "name": "访问量", "isDim": false },
            { "id": "uv", "name": "访客数", "isDim": false }
          ]}
          data={[
            { "date": "20200101", "pv": 100, "uv": 50 },
            { "date": "20200102", "pv": 120, "uv": 60 },
            { "date": "20200103", "pv": 140, "uv": 70 },
            { "date": "20200104", "pv": 160, "uv": 80 },
          ]}
        />
      )}
    </div>
  );
};
```
