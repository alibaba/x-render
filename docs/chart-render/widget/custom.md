---
order: 999
title: 自定义组件
group:
  title: 渲染区组件
  order: 3
---

## 自定义组件

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * background: 'rgb(245,245,245)'
 */
import React from 'react';
import { Column, Search, withChart, useChart } from 'chart-render';
import { Card } from 'antd';

const api = ({ filters }) => {
  console.log('filters >>> ', filters);
  return new Promise(resolve =>
    setTimeout(() => {
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
    }, 1000)
  );
};

const CustomChart = () => {
  const refresh = useChart(state => state.refresh);
  const loading = useChart(state => state.loading);
  const dataSource = useChart(state => state.dataSource);
  return (
    <div
      style={{
        background: '#ccc',
        height: 300,
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
      }}
    >
      <p>
        这里是自定义渲染组件区块，可以使用 `useChart` 获得 ChartRender
        的状态和方法，
        <a href="javascript:;" onClick={refresh}>
          点此刷新
        </a>
      </p>
      <p>
        这里使用到了 loading 状态：
        <span style={{ color: loading ? 'blue' : 'green' }}>
          {loading ? 'loading...' : 'loaded!'}
        </span>
      </p>
      <p>这里使用到了 dataSource：{JSON.stringify(dataSource, null, 2)}</p>
    </div>
  );
};

const App = () => (
  <Card title="访问趋势" extra={<Search searchOnChange api={api} />}>
    <CustomChart />
  </Card>
);

export default withChart(App);
```
