---
order: 4
title: 交叉表
group:
  title: 案例展示
  order: 2
---

## 基本用法

- 表格渲染上，维度作为 `左表头`，指标作为 `顶表头`。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { PivotTable } from 'chart-render';

export default () => (
  <PivotTable
    style={{ maxHeight: 400, overflow: 'auto' }}
    meta={[
      { id: 'subs', name: '子公司', isDim: true, isRate: false },
      { id: 'shop', name: '门店', isDim: true, isRate: false },
      { id: 'season', name: '季度', isDim: true, isRate: false },
      { id: 'month', name: '月份', isDim: true, isRate: false },
      { id: 'valueA', name: '指标A', isDim: false, isRate: false },
      { id: 'valueB', name: '指标B', isDim: false, isRate: true },
    ]}
    data={[
      {
        subs: '上海子公司',
        shop: '上海大宁店',
        season: '一季度',
        month: '2022-01',
        valueA: 782,
        valueB: 0.566,
      },
      {
        subs: '上海子公司',
        shop: '上海大宁店',
        season: '一季度',
        month: '2022-02',
        valueA: 856,
        valueB: 0.403,
      },
      {
        subs: '上海子公司',
        shop: '上海大宁店',
        season: '一季度',
        month: '2022-03',
        valueA: 886,
        valueB: 0.555,
      },
      {
        subs: '上海子公司',
        shop: '上海大宁店',
        season: '二季度',
        month: '2022-04',
        valueA: 555,
        valueB: 0.444,
      },
      {
        subs: '上海子公司',
        shop: '上海大宁店',
        season: '二季度',
        month: '2022-05',
        valueA: 444,
        valueB: 0.333,
      },
      {
        subs: '上海子公司',
        shop: '上海曹家渡店',
        season: '一季度',
        month: '2022-01',
        valueA: 922,
        valueB: 0.778,
      },
      {
        subs: '上海子公司',
        shop: '上海曹家渡店',
        season: '一季度',
        month: '2022-02',
        valueA: 888,
        valueB: 0.887,
      },
      {
        subs: '上海子公司',
        shop: '上海曹家渡店',
        season: '一季度',
        month: '2022-03',
        valueA: 879,
        valueB: 0.87,
      },
      {
        subs: '上海子公司',
        shop: '上海曹家渡店',
        season: '二季度',
        month: '2022-04',
        valueA: 800,
        valueB: 0.723,
      },
      {
        subs: '上海子公司',
        shop: '上海曹家渡店',
        season: '二季度',
        month: '2022-05',
        valueA: 813,
        valueB: 0.789,
      },
      {
        subs: '浙江子公司',
        shop: '亲橙里',
        season: '一季度',
        month: '2022-01',
        valueA: 500,
        valueB: 0.463,
      },
      {
        subs: '浙江子公司',
        shop: '亲橙里',
        season: '一季度',
        month: '2022-02',
        valueA: 833,
        valueB: 0.456,
      },
      {
        subs: '浙江子公司',
        shop: '亲橙里',
        season: '一季度',
        month: '2022-03',
        valueA: 821,
        valueB: 0.442,
      },
      {
        subs: '浙江子公司',
        shop: '亲橙里',
        season: '二季度',
        month: '2022-04',
        valueA: 834,
        valueB: 0.456,
      },
      {
        subs: '浙江子公司',
        shop: '亲橙里',
        season: '二季度',
        month: '2022-05',
        valueA: 803,
        valueB: 0.7,
      },
    ]}
  />
);
```

## 高级用法

### 自定义单元格渲染

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { PivotTable } from 'chart-render';

export default () => (
  <PivotTable
    style={{ maxHeight: 400, overflow: 'auto' }}
    cellRender={(val, dimRecord, indId) => (
      <div>
        <p>参数表：</p>
        <p
          style={{
            color: ['red', 'orange', 'yellow', 'green', 'blue'][
              Object.keys(dimRecord).length
            ],
          }}
        >
          {val}
        </p>
        <p>{JSON.stringify(dimRecord)}</p>
        <p>{JSON.stringify(indId)}</p>
      </div>
    )}
    meta={[
      { id: 'subs', name: '子公司', isDim: true, isRate: false },
      { id: 'shop', name: '门店', isDim: true, isRate: false },
      { id: 'season', name: '季度', isDim: true, isRate: false },
      { id: 'month', name: '月份', isDim: true, isRate: false },
      { id: 'valueA', name: '指标A', isDim: false, isRate: false },
      { id: 'valueB', name: '指标B', isDim: false, isRate: true },
    ]}
    data={[
      {
        subs: '上海子公司',
        shop: '上海大宁店',
        season: '一季度',
        month: '2022-01',
        valueA: 782,
        valueB: 0.566,
      },
      {
        subs: '上海子公司',
        shop: '上海大宁店',
        season: '一季度',
        month: '2022-02',
        valueA: 856,
        valueB: 0.403,
      },
      {
        subs: '上海子公司',
        shop: '上海大宁店',
        season: '一季度',
        month: '2022-03',
        valueA: 886,
        valueB: 0.555,
      },
      {
        subs: '上海子公司',
        shop: '上海大宁店',
        season: '二季度',
        month: '2022-04',
        valueA: 555,
        valueB: 0.444,
      },
      {
        subs: '上海子公司',
        shop: '上海大宁店',
        season: '二季度',
        month: '2022-05',
        valueA: 444,
        valueB: 0.333,
      },
      {
        subs: '上海子公司',
        shop: '上海曹家渡店',
        season: '一季度',
        month: '2022-01',
        valueA: 922,
        valueB: 0.778,
      },
      {
        subs: '上海子公司',
        shop: '上海曹家渡店',
        season: '一季度',
        month: '2022-02',
        valueA: 888,
        valueB: 0.887,
      },
      {
        subs: '上海子公司',
        shop: '上海曹家渡店',
        season: '一季度',
        month: '2022-03',
        valueA: 879,
        valueB: 0.87,
      },
      {
        subs: '上海子公司',
        shop: '上海曹家渡店',
        season: '二季度',
        month: '2022-04',
        valueA: 800,
        valueB: 0.723,
      },
      {
        subs: '上海子公司',
        shop: '上海曹家渡店',
        season: '二季度',
        month: '2022-05',
        valueA: 813,
        valueB: 0.789,
      },
      {
        subs: '浙江子公司',
        shop: '亲橙里',
        season: '一季度',
        month: '2022-01',
        valueA: 500,
        valueB: 0.463,
      },
      {
        subs: '浙江子公司',
        shop: '亲橙里',
        season: '一季度',
        month: '2022-02',
        valueA: 833,
        valueB: 0.456,
      },
      {
        subs: '浙江子公司',
        shop: '亲橙里',
        season: '一季度',
        month: '2022-03',
        valueA: 821,
        valueB: 0.442,
      },
      {
        subs: '浙江子公司',
        shop: '亲橙里',
        season: '二季度',
        month: '2022-04',
        valueA: 834,
        valueB: 0.456,
      },
      {
        subs: '浙江子公司',
        shop: '亲橙里',
        season: '二季度',
        month: '2022-05',
        valueA: 803,
        valueB: 0.7,
      },
    ]}
  />
);
```

### 可展开/收起

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { PivotTable } from 'chart-render';

export default () => {
  const [expandable, setExpandable] = useState(false);

  return (
    <>
      <label>
        可展开/收缩：
        <input
          type="checkbox"
          value={expandable}
          onChange={() => setExpandable(!expandable)}
        />
      </label>
      <PivotTable
        leftExpandable={expandable}
        showSubtotal={false}
        meta={[
          { id: 'subs', name: '子公司', isDim: true, isRate: false },
          { id: 'shop', name: '门店', isDim: true, isRate: false },
          { id: 'season', name: '季度', isDim: true, isRate: false },
          { id: 'month', name: '月份', isDim: true, isRate: false },
          { id: 'valueA', name: '指标A', isDim: false, isRate: false },
          { id: 'valueB', name: '指标B', isDim: false, isRate: true },
        ]}
        data={[
          {
            subs: '上海子公司',
            shop: '上海大宁店',
            season: '一季度',
            month: '2022-01',
            valueA: 782,
            valueB: 0.566,
          },
          {
            subs: '上海子公司',
            shop: '上海大宁店',
            season: '一季度',
            month: '2022-02',
            valueA: 856,
            valueB: 0.403,
          },
          {
            subs: '上海子公司',
            shop: '上海大宁店',
            season: '一季度',
            month: '2022-03',
            valueA: 886,
            valueB: 0.555,
          },
          {
            subs: '上海子公司',
            shop: '上海大宁店',
            season: '二季度',
            month: '2022-04',
            valueA: 555,
            valueB: 0.444,
          },
          {
            subs: '上海子公司',
            shop: '上海大宁店',
            season: '二季度',
            month: '2022-05',
            valueA: 444,
            valueB: 0.333,
          },
          {
            subs: '上海子公司',
            shop: '上海曹家渡店',
            season: '一季度',
            month: '2022-01',
            valueA: 922,
            valueB: 0.778,
          },
          {
            subs: '上海子公司',
            shop: '上海曹家渡店',
            season: '一季度',
            month: '2022-02',
            valueA: 888,
            valueB: 0.887,
          },
          {
            subs: '上海子公司',
            shop: '上海曹家渡店',
            season: '一季度',
            month: '2022-03',
            valueA: 879,
            valueB: 0.87,
          },
          {
            subs: '上海子公司',
            shop: '上海曹家渡店',
            season: '二季度',
            month: '2022-04',
            valueA: 800,
            valueB: 0.723,
          },
          {
            subs: '上海子公司',
            shop: '上海曹家渡店',
            season: '二季度',
            month: '2022-05',
            valueA: 813,
            valueB: 0.789,
          },
          {
            subs: '浙江子公司',
            shop: '亲橙里',
            season: '一季度',
            month: '2022-01',
            valueA: 500,
            valueB: 0.463,
          },
          {
            subs: '浙江子公司',
            shop: '亲橙里',
            season: '一季度',
            month: '2022-02',
            valueA: 833,
            valueB: 0.456,
          },
          {
            subs: '浙江子公司',
            shop: '亲橙里',
            season: '一季度',
            month: '2022-03',
            valueA: 821,
            valueB: 0.442,
          },
          {
            subs: '浙江子公司',
            shop: '亲橙里',
            season: '二季度',
            month: '2022-04',
            valueA: 834,
            valueB: 0.456,
          },
          {
            subs: '浙江子公司',
            shop: '亲橙里',
            season: '二季度',
            month: '2022-05',
            valueA: 803,
            valueB: 0.7,
          },
        ]}
      />
    </>
  );
};
```
