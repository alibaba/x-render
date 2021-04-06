import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { ProTable, Search, TableContainer, useTable } from 'table-render';
import { Tooltip } from 'antd';
import request from 'umi-request';

const dataSource = [];
for (let i = 0; i < 6; i++) {
  dataSource.push({
    id: i.toString(),
    title: `mock数据${i + 1}`,
    state: i == 5 ? 'open' : 'closed',
    created_at: new Date().getTime(),
  });
}
// 可以使用schema编辑器配置 https://form-render.github.io/schema-generator/
const schema = {
  type: 'object',
  properties: {
    string: {
      title: '标题',
      type: 'string',
      pattern: '^[A-Za-z0-9]+$',
      message: {
        pattern: '格式不对哦~',
      },
      'ui:width': '30%',
    },
    created_at: {
      title: '创建时间',
      type: 'string',
      format: 'date',
      'ui:width': '30%',
    },
  },
  'ui:labelWidth': 90,
};

// 配置完全透传antd table
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '状态',
    dataIndex: 'state',
    enum: {
      open: '未解决',
      closed: '已解决',
    },
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    render: (row, record) => (
      <Tooltip
        title={() => (
          <>
            <p>标题: {record.title}</p>
            <p>状态: {record.state}</p>
            <p>创建时间: {record.created_at}</p>
          </>
        )}
      >
        <a>原始数据</a>
      </Tooltip>
    ),
  },
];

const Demo = () => {
  return (
    <div style={{ background: 'rgb(245,245,245)' }}>
      <Search schema={schema} />
      <ProTable headerTitle="最简表格" columns={columns} rowKey="id" />
    </div>
  );
};

const Wrapper = () => {
  const searchApi = () => {
    return {
      rows: dataSource,
      total: dataSource.length,
    };
  };
  return (
    <TableContainer searchApi={searchApi}>
      <Demo />
    </TableContainer>
  );
};

export default Wrapper;
