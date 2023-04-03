import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProColumnsType } from 'table-render';

export const columns: ProColumnsType = [
  {
    title: '酒店名称',
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

export const toolbarRender = (
  <>
    <Button>查看日志</Button>
    <Button>导出数据</Button>
    <Button
      type='primary'
      onClick={() => alert('table-render！')}
    >
      <PlusOutlined />
      创建
    </Button>
  </>
);