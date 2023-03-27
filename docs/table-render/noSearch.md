---
order: 3
mobile: false
group: 
  title: 最佳展示
  order: 2
---


# 无搜索栏

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
      columns={columns}
      request={searchApi}
      toolbarRender={toolbarRender}
    />
  )
};

export default Demo;
```
