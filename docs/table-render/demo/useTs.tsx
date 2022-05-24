/**
 * transform: true
 * defaultShowCode: false
 * background: 'rgb(245,245,245)'
 */

import { InfoCircleOutlined } from '@ant-design/icons';
import { message, Space, Tag, Tooltip } from 'antd';
import React from 'react';
import { Search, Table, useTable, withTable } from 'table-render';
import { ProColumnsType } from 'table-render/src/interface';
import request from 'umi-request';

const schema = {
  type: 'object',
  labelWidth: 80,
  properties: {
    state: {
      title: '酒店状态',
      type: 'string',
      enum: ['open', 'closed'],
      enumNames: ['营业中', '已打烊'],
      width: '33%',
      widget: 'select',
    },
    labels: {
      title: '酒店星级',
      type: 'string',
      width: '33%',
    },
  },
};

interface RecordType {
  id: number;
  number: number;
  address: string;
  title: string;
  room: number;
  money: number;
  state: string;
  created_at: string;
  labels: Array<{ name: string; color: string }>;
}

const Demo = () => {
  // 此处表示tableState.dataSource符合Array<RecordType>
  const { tableState, refresh } = useTable<RecordType>();

  const searchApi = (params, sorter) => {
    console.group(sorter);
    return request
      .get(
        'https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/basic',
        { params }
      )
      .then(res => {
        if (res && res.data) {
          return {
            rows: res.data,
            total: res.data.length,
          };
        }
      })
      .catch(e => {
        return {
          rows: [],
          total: 0,
        };
      });
  };

  // ProColumnsType的使用与antd类似
  const columns: ProColumnsType<RecordType> = [
    {
      title: '酒店名称',
      dataIndex: 'title',
      valueType: 'code',
      width: '20%',
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
      title: (
        <>
          酒店状态
          <Tooltip placement="top" title="使用valueType">
            <InfoCircleOutlined style={{ marginLeft: 6 }} />
          </Tooltip>
        </>
      ),
      enum: {
        open: '营业中',
        closed: '已打烊',
      },
      dataIndex: 'state',
    },
    {
      title: '酒店星级',
      dataIndex: 'labels',
      render: (_, row) => (
        <Space>
          {row.labels.map(({ name, color }) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
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
    {
      title: '操作',
      render: () => (
        <a
          onClick={() => {
            message.success('预订成功');
          }}
        >
          预订
        </a>
      ),
    },
  ];

  return (
    <div>
      {/* 此处表示api的的返回值需要符合RecordType */}
      <Search<RecordType> schema={schema} displayType="row" api={searchApi} />
      {/* 和antd类似，与ProColumnsType配合使用 */}
      <Table<RecordType>
        pagination={{ pageSize: 4 }}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

export default withTable(Demo);
