/**
 * background: 'rgb(245,245,245)'
 */
import React, { useRef } from 'react';
import TableRender, { ProColumnsType } from 'table-render';
import { schema } from '../../static/search';
import { searchApi } from '../../static/request';

const Demo = () => {
  const tableRef: any = useRef();

  const columns: ProColumnsType<any> = [
    {
      title: '酒店名称',
      // dataIndex 唯一时，可以省略 key
      dataIndex: 'title',
      valueType: 'text',
      width: '20%'
    },
    {
      title: '酒店地址',
      dataIndex: 'address',
      ellipsis: true,
      copyable: true,
      valueType: 'text',
      width: '25%',
    },
    {
      title: '酒店状态',
      enum: {
        open: '营业中',
        closed: '已打烊',
      },
      dataIndex: 'state',
    },
    {
      title: '酒店星级',
      dataIndex: 'labels',
      width: 90,
      valueType: 'tags'
    },
    {
      title: '酒店GMV',
      sorter: true,
      dataIndex: 'money',
      valueType: 'money',
    },
    {
      title: '成立时间',
      dataIndex: 'created_at',
      valueType: 'date',
    },
  ];

  return (
    <TableRender
      ref={tableRef}
      search={{ schema }}
      scroll={{ x: 1500 }}
      request={searchApi}
      columns={columns}
      pagination={{ pageSize: 2 }}
      toolbarAction
    />
  )
};

export default Demo;