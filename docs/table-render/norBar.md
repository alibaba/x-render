---
order: 4
title: '无工具栏'
mobile: false
group: 
  title: 最佳展示
  order: 2
---
# 无工具栏

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
  const tableRef = useRef();

  return (
    <TableRender
      ref={tableRef}
      search={{ schema }}
      columns={columns}
      request={searchApi}
    />
  )
};

export default Demo;
```
