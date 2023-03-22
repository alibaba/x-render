/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React, { useRef } from 'react';
import TableRender from 'table-render';
import { Button } from 'antd';
import { schema } from '../static/search';
import { columns, toolbarRender } from '../static/table';
import { searchApi, searchApi2 } from '../static/request';

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
      pagination={{ pageSize: 2 }}
      toolbarAction
    />
  )
};

export default Demo;