/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */

import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Space, Tag, Tooltip } from 'antd';
import React, { useRef } from 'react';
import TableRender, { ProColumnsType } from 'table-render';
import request from 'umi-request';

const schema = {
  type: 'object',
  labelWidth: 80,
  displayType: 'column',
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
    },
    labels1: {
      title: '输入框 A',
      type: 'string'
    },
    labels2: {
      title: '输入框 B',
      type: 'string'
    },
    labels3: {
      title: '输入框 B',
      type: 'string'
    },
    labels4: {
      title: '输入框 C',
      type: 'string'
    },
    labels5: {
      title: '输入框 D',
      type: 'string'
    },
    labels6: {
      title: '输入框 E',
      type: 'string'
    },
  }
};

const Demo = () => {
  const tableRef: any = useRef();


  const requestData = (params: any) => {
    return request
      .get(
        'https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/basic',
        { params }
      )
      .then(res => ({ success: true, data: res.data }))
      .catch(() => ({ success: false, data: {} }))
  }

  const searchApi = async (params) => {
    const { success, data } = await requestData(params);
    if (success) {
      return {
        data: data,
        total: data.length,
      }
    } else {
      // 必须返回 data 和 total
      return {
        data: [],
        total: 0,
      }
    }
  };

  const searchApi2 = async (params) => {
    const { success, data } = await requestData(params);
    if (success) {
      return {
        data: data.slice(1),
        total: data.length - 1,
      }
    } else {
      // 必须返回 data 和 total
      return {
        data: [],
        total: 0,
      }
    }
  };

  const columns: ProColumnsType<any> = [
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
      title: (
        <>
          酒店状态
          <Tooltip placement='top' title='使用valueType'>
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
      width: 90,
      render: (_, row) => (
        <Space>
          {row?.labels?.map(({ name, color }) => (
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
      width: 60,
      align: 'right',
      render: () => (
        <a
          onClick={() => {
            message.success('预订成功');
          }}
        >
          预订
        </a>
      )
    }
  ];

  const showData = () => {
    tableRef.current.refresh({ stay: true }, { extra: 1 });
  };

  return (
    <TableRender
      ref={tableRef}
      search={{
        schema,
        collapsed: true,
      }}
      request={[
        {
          name: '全部数据',
          api: searchApi,
        },
        {
          name: '我的数据',
          api: searchApi2,
        }
      ]}
      columns={columns}
      toolbarRender={
        <>
          <Button key='show' onClick={showData}>
            查看日志
          </Button>
          <Button key='out' onClick={showData}>
            导出数据
          </Button>
          <Button
            key='primary'
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
  )
};

export default Demo;



