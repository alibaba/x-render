---
order: 2
title: '基础交互'
group: 
  title: 最佳展示
  order: 2
---
# 基础交互
```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React, { useRef } from 'react';
import TableRender from 'table-render';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { schema } from './static/search';
import { columns, toolbarRender } from './static/table';
import { searchApi, searchApi2 } from './static/request';


const Demo = () => {
  const tableRef: any = useRef();

  const handleClick = () => {
    tableRef.current.refresh();
  }

  const handleClick2 = () => {
    tableRef.current.refresh({ stay: true });
  }

  const handleClick3 = () => {
    tableRef.current.form.setValues({ pageId: 'xxx' })
  }

  return (
    <TableRender
      ref={tableRef}
      search={{
        schema: schema
      }}
      request={searchApi}
      columns={columns}
      pagination={{ pageSize: 2 }}
      toolbarRender={
        <>
          <Button onClick={handleClick}>刷新列表</Button>
          <Button onClick={handleClick2}>保持当前页刷新</Button>
          <Button onClick={handleClick3}>将url参数同步到查询条件里面</Button>
        </>
      }
    />
  )
};

export default Demo;
```


