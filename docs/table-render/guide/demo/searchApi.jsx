import React, { useRef } from 'react';
import { ProTable, Search, TableContainer, useTable } from 'table-render';
import { Button } from 'antd';

// 可以使用schema编辑器配置 https://form-render.github.io/schema-generator/
const schema = {
  type: 'object',
  properties: {
    created_at: {
      title: '创建时间',
      type: 'string',
      format: 'date',
      'ui:width': '25%',
    },
  },
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
      <a href="https://x-render.gitee.io/form-render/" target="_blank" rel="noopener noreferrer">
        查看
      </a>
    ),
  },
];

const searchApi = [
  {
    name: '我的数据',
    api: params => {
      console.log('我的数据', params);
      return {
        rows: [
          {
            id: 624748504,
            title: 'mock数据1',
            state: 'closed',
            created_at: '2020-05-26T09:42:56Z',
          },
          {
            id: 624691229,
            title: 'mock数据2',
            state: 'open',
            created_at: '2020-05-26T08:19:22Z',
          },
        ],
        total: 2,
      };
    },
  },
  {
    name: '全部数据',
    api: params => {
      console.log('全部数据', params);
      return {
        rows: [
          {
            id: 624748504,
            title: 'mock数据3',
            state: 'closed',
            created_at: '2020-05-26T09:42:56Z',
          },
          {
            id: 624691229,
            title: 'mock数据4',
            state: 'open',
            created_at: '2020-05-26T08:19:22Z',
          },
        ],
        total: 2,
      };
    },
  },
];

const Demo = () => {
  const { changeTab } = useTable();
  return (
    <div style={{ background: 'rgb(245,245,245)' }}>
      <Search schema={schema} />
      <ProTable
        headerTitle="最简表格"
        columns={columns}
        rowKey="id"
        toolbarRender={() => [
          <Button type="primary" onClick={() => changeTab(1)}>
            切换到全部
          </Button>,
        ]}
      />
    </div>
  );
};

const Wrapper = () => {
  return (
    <TableContainer searchApi={searchApi}>
      <Demo />
    </TableContainer>
  );
};

export default Wrapper;
