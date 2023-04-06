---
order: 3
mobile: false
title: '查询实时响应'
group: 
  title: 最佳展示
  order: 2
---
# 实时响应
有些情况下，我们需要当查询条件值改变时，立即触发查询，这个时候可以配置 `search: { mode : 'simple' }`

## 按钮保留
```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React, { useRef } from 'react';
import TableRender, { TableContext } from 'table-render';

import { schema } from './static/search';
import { columns, toolbarRender } from './static/table';
import { searchApi, searchApi2 } from './static/request';

const Demo = () => {
  const tableRef = useRef<TableContext>(null);

  return (
    <TableRender
      ref={tableRef}
      search={{
        schema: schema,
        mode: 'simple',
        retainBtn: true
      }}
      request={searchApi}
      columns={columns}
      toolbarRender={toolbarRender}
    />
  )
};

export default Demo;
```

## 保留某一个
```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React, { useRef } from 'react';
import TableRender from 'table-render';

import { schema } from './static/search';
import { columns, toolbarRender } from './static/table';
import { searchApi, searchApi2 } from './static/request';

const Demo = () => {
  const tableRef: any = useRef();

  return (
    <TableRender
      ref={tableRef}
      search={{
        schema: schema,
        mode: 'simple',
        retainBtn: ['reset'] // ['rest', 'submit']
      }}
      request={searchApi}
      columns={columns}
      toolbarRender={toolbarRender}
    />
  )
};

export default Demo;
```

## 按钮不保留

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React, { useRef } from 'react';
import TableRender from 'table-render';

import { schema } from './static/search';
import { columns, toolbarRender } from './static/table';
import { searchApi, searchApi2 } from './static/request';

const Demo = () => {
  const tableRef: any = useRef();

  return (
    <TableRender
      ref={tableRef}
      search={{
        schema: schema,
        mode: 'simple'
      }}
      request={searchApi}
      columns={columns}
      toolbarRender={toolbarRender}
    />
  )
};

export default Demo;
```