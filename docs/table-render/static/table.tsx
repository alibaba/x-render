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
    // valueTypeProps: (value) => { // [ { name : '', color: '' }] => 命中默认格式无需配置
    //   return {
    //     name: value?.text,
    //     color: 'cyan'
    //   }
    // },
  },

  {
    title: '酒店GMV',
    key: 'money',
    sorter: true,
    dataIndex: 'money',
    valueType: 'money',
  },
  {
    title: '成立时间',
    key: 'created_at',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  // {
  //   title: '操作',
  //   width: 60,
  //   align: 'right',
  //   render: () => (
  //     <a
  //       onClick={() => {
  //         message.success('预订成功');
  //       }}
  //     >
  //       预订
  //     </a>
  //   )
  // }
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