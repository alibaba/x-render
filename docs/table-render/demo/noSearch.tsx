/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */

import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import TableRender from 'table-render';
import request from 'umi-request';

const Demo = () => {
  const tableRef: any = useRef();

  const searchApi = params => {
    console.log('params >>> ', params);
    return request
      .get(
        'https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/basic',
        { params }
      )
      .then(res => {
        if (res && res.data) {
          return {
            data: res.data,
            total: res.data.length,
            extraData: res.status,
          };
        }
      })
      .catch(e => {
        console.log('Oops, error', e);
        // 注意一定要返回 rows 和 total
        return {
          data: [],
          total: 0,
        };
      });
  };

  // 配置完全透传antd table
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

  const showData = () => {
    tableRef.current.refresh(null, { extra: 1 });
  };

  return (
    <TableRender
      ref={tableRef}
      request={searchApi}
      columns={columns}
      pagination={{ pageSize: 5 }}
      title='高级表单'
      toolbarRender={
        <>
          <Button onClick={showData}>
            查看日志
          </Button>
          <Button onClick={showData}>
            导出数据
          </Button>
          <Button
            type='primary'
            onClick={() => alert('table-render！')}
          >
            <PlusOutlined />
            创建
          </Button>
        </>
      }
      toolbarAction
    />
  );
};

export default Demo;
