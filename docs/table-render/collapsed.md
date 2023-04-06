---
order: 2
mobile: false
title: '搜索栏折叠'
group: 
  title: 最佳展示
  order: 2
---
# 搜索栏折叠

## 默认收起
```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React, { useRef } from 'react';
import TableRender, { TableContext } from 'table-render';

import { schema2 } from './static/search';
import { columns, toolbarRender } from './static/table';
import { searchApi, searchApi2 } from './static/request';

const Demo = () => {
  const tableRef = useRef<TableContext>(null);

  return (
    <TableRender
      ref={tableRef}
      search={{
        schema: schema2,
        collapsed: true,
      }}
      request={searchApi}
      columns={columns}
      toolbarRender={toolbarRender}
    />
  )
};

export default Demo;
```


## 默认展开
```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React, { useRef } from 'react';
import TableRender from 'table-render';

import { schema2 } from './static/search';
import { columns, toolbarRender } from './static/table';
import { searchApi, searchApi2 } from './static/request';


const Demo = () => {
  const tableRef: any = useRef();

  return (
    <TableRender
      ref={tableRef}
      search={{
        schema: schema2,
        collapsed: true,
        defaultCollapsed: false
      }}
      request={searchApi}
      columns={columns}
      toolbarRender={toolbarRender}
    />
  )
};

export default Demo;
```


