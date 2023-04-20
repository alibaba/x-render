/**
 * defaultShowCode: true
 */
import React, { useRef } from 'react';
import TableRender, { TableContext } from 'table-render';
import { Alert } from 'antd';

import { schema } from '../../static/search';
import { columns, toolbarRender } from '../../static/table';
import { searchApi } from '../../static/request';

const Demo = () => {
  const tableRef = useRef<TableContext>(null);

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
