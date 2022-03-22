import React from 'react';
import { Search, Table, withTable } from 'table-render';

const dataSource = [];
for (let i = 0; i < 6; i++) {
  dataSource.push({
    id: i.toString(),
    title: `标题${i + 1}`,
    created_at: new Date().getTime(),
  });
}

// 详细可见 form-render 的使用
const schema = {
  type: 'object',
  properties: {
    title: {
      title: '标题',
      type: 'string',
      width: '30%',
    },
    created_at: {
      title: '创建时间',
      type: 'string',
      format: 'date',
      width: '30%',
    },
  },
};

// 配置完全透传 antd table
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    render: (row, record) => <a onClick={() => alert(row.title)}>编辑</a>,
  },
];

const Wrapper = () => {
  const searchApi = () => {
    return {
      rows: dataSource,
      total: dataSource.length,
    };
  };
  return (
    <>
      <Search schema={schema} api={searchApi} />
      <Table headerTitle="最简表格" columns={columns} rowKey="id" />
    </>
  );
};

export default withTable(Wrapper);
