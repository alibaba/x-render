/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */

import React, { useRef } from 'react';
import { message, Space, } from 'antd';
import TableRender, { } from 'table-render';
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
      widget: 'select'
    },
    labels: {
      title: '酒店星级',
      type: 'string'
    },
    created_at: {
      title: '成立时间',
      type: 'string',
      format: 'date'
    }
  }
};

const Demo = () => {
  const tableRef: any = useRef();

  const searchApi = (params, sorter) => {
    console.group(sorter);

    return request.get(
      'https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/basic',
      { params }
    )
    .then(res => {
      if (res && res.data) {
        return {
          data: [...res.data],
          total: res.data.length,
        };
      }
    })
    .catch(e => {
      console.log('Oops, error', e);

      // 注意一定要返回 data 和 total
      return {
        data: [],
        total: 0,
      };
    });
  };

  const columns = [
    {
      title: '酒店名称',
      dataIndex: 'title',
      valueType: 'text',
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
      title: '酒店状态',
      tooltip: '气泡提示',
      dataIndex: 'state',
      enum: {
        open: '营业中',
        closed: '已打烊'
      }
    },
    {
      title: '酒店星级',
      dataIndex: 'labels',
      valueType: 'tags'
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
        <Space>
          <a target='_blank' key='1'>
            <div
              onClick={() => {
                message.success('预订成功');
              }}
            >
              预订
            </div>
          </a>
        </Space>
      )
    }
  ];


  return (
    <TableRender 
      ref={tableRef}
      search={{ schema }}
      request={searchApi}
      columns={columns}
    />
  )
};

export default Demo;



