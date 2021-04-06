import React, { useRef } from 'react';
import { ProTable, Search, TableContainer, useTable } from 'table-render';
import { Tag, Space, Menu, Dropdown, message, Tooltip, Button } from 'antd';
import {
  PlusOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import request from 'umi-request';
// 可以使用schema编辑器配置 https://form-render.github.io/schema-generator/
const schema = {
  type: 'object',
  properties: {
    state: {
      title: '酒店状态',
      type: 'string',
      enum: ['open', 'closed'],
      enumNames: ['营业中', '已打烊'],
      'ui:width': '25%',
    },
    labels: {
      title: '酒店星级',
      type: 'string',
      'ui:width': '25%',
    },
    created_at: {
      title: '成立时间',
      type: 'string',
      format: 'date',
      'ui:width': '25%',
    },
  },
  'ui:labelWidth': 80,
};

const Demo = () => {
  const searchApi = params => {
    return request
      .get(
        'https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/basic',
        { params }
      )
      .then(res => {
        // console.log('response:', res);
        if (res && res.data) {
          return {
            rows: res.data,
            total: res.data.length,
            extraData: res.status,
          }; // 注意一定要返回 rows 和 total
        }
      })
      .catch(e => console.log('Oops, error', e));
  };

  return (
    <TableContainer
      searchApi={[
        {
          name: '全部数据',
          api: searchApi,
        },
        {
          name: '我的数据',
          api: searchApi,
        },
      ]}
      onSearch={search => console.log('onSearch', search)}
    >
      <TableBody />
    </TableContainer>
  );
};

const TableBody = () => {
  const { refresh, tableState } = useTable();
  // 配置完全透传antd table
  const columns = [
    {
      title: '酒店名称',
      dataIndex: 'title',
      valueType: 'text',
      width: '25%',
    },
    {
      title: '酒店地址',
      dataIndex: 'address',
      ellipsis: true,
      copyable: true,
      valueType: 'text',
      width: '30%',
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
      title: '成立时间',
      key: 'created_at',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: '操作',
      render: row => (
        <Space>
          <a target="_blank" key="1">
            <div
              onClick={() => {
                alert('Table-Render!');
              }}
            >
              查看
            </div>
          </a>
        </Space>
      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => message.success('复制成功！')}>复制</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => message.warning('确定删除吗？')}>删除</div>
      </Menu.Item>
    </Menu>
  );

  const showData = () => {
    refresh();
  };

  return (
    <div style={{ background: 'rgb(245,245,245)' }}>
      <Search schema={schema} displayType="row" />
      <ProTable
        // size="small"
        columns={columns}
        // headerTitle="高级表单"
        rowKey="id"
        toolbarRender={() => [
          <Button key="show" onClick={showData}>
            查看日志
          </Button>,
          <Button key="out" onClick={showData}>
            导出数据
          </Button>,
          <Button
            key="primary"
            type="primary"
            onClick={() => alert('table-render！')}
          >
            <PlusOutlined />
            创建
          </Button>,
        ]}
        toolbarAction
      />
    </div>
  );
};

export default Demo;
