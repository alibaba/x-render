---
order: 6
title: 'Table 包裹容器'
group: 
  title: 最佳展示
  order: 0
---

# tableWrapper 包裹容器

有些情况下，你会希望在搜索栏和表格之间增加一些内容。这时可以通过 `tableWrapper` 实现你的需求。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React, { useRef } from 'react';
import TableRender from 'table-render';
import { Alert } from 'antd';

import { schema } from './static/search';
import { columns, toolbarRender } from './static/table';
import { searchApi } from './static/request';


const Demo = () => {
  const tableRef: any = useRef();

  return (
    <TableRender
      ref={tableRef}
      search={{
        schema: schema
      }}
      request={searchApi}
      columns={columns}
      toolbarRender={toolbarRender}
      tableWrapper={(table) => (
        <div>
          <Alert
            message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
            type="warning"
            closable
            style={{ marginBottom: 16 }}
          />
          {table}
        </div>
      )}
    />
  )
};

export default Demo;
```


