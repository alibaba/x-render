import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { ProTable, Search, TableContainer, useTable } from 'table-render';
import request from 'umi-request';

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
    render: row => (
      <a
        href="https://x-render.gitee.io/form-render/"
        target="_blank"
        rel="noopener noreferrer"
      >
        查看
      </a>
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
  const searchApi = params => {
    return request
      .get(
        'https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/simple',
        { params }
      )
      .then(res => {
        console.log('response:', res);
        if (res && res.data) {
          return { rows: res.data, total: res.data.length }; // 注意一定要返回 rows 和 total
        }
      })
      .catch(e => console.log('Oops, error', e));
  };
  return (
    <TableContainer searchApi={searchApi}>
      <Demo />
    </TableContainer>
  );
};

export default Wrapper;
