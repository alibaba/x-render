/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React, { useRef } from 'react';
import TableRender, { TableContext } from 'table-render';
import { Button } from 'antd';
import { schema } from '../../static/search';
import { columns } from '../../static/table';
import { searchApi } from '../../static/request';


const Demo = () => {
  const tableRef = useRef<TableContext>(null);

  const handleClick = () => {
    tableRef.current?.refresh();
  }

  const handleClick2 = () => {
    tableRef.current?.refresh({ stay: true });
  }

  const handleClick3 = () => {
    tableRef.current?.form.setValues({ pageId: 'xxx' })
  }

  return (
    <TableRender
      ref={tableRef}
      search={{ schema }}
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
