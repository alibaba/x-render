---
order: 6
title: 'Tab 数据分类'
group: 
  title: 最佳展示
  order: 2
---

# 数据分类
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
        schema: schema
      }}
      request={[
        { name: '我的', api: searchApi },
        { name: '全部', api: searchApi2 }
      ]}
      columns={columns}
      toolbarRender={toolbarRender}
    />
  )
};

export default Demo;
```


