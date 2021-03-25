import React, { useRef } from 'react';
import { ProTable, Search, TableContainer, useTable } from 'table-render';
import { Tag, Space, Menu, Dropdown, message, Button, Tooltip } from 'antd';
import { PlusOutlined, EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons';
import request from 'umi-request';

// 可以使用schema编辑器配置 https://form-render.github.io/schema-generator/
const schema = {
  type: 'object',
  properties: {
    state: {
      title: '状态',
      type: 'string',
      enum: ['open', 'closed', 'processing'],
      enumNames: ['未解决', '已解决', '解决中'],
      'ui:width': '25%',
    },
    labels: {
      title: '标签',
      type: 'string',
      'ui:width': '25%',
    },
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
    ellipsis: true,
    copyable: true,
    width: 300,
  },
  {
    title: (
      <>
        状态
        <Tooltip placement="top" title="使用enum">
          <InfoCircleOutlined style={{ marginLeft: 6 }} />
        </Tooltip>
      </>
    ),
    dataIndex: 'state',
    enum: {
      open: '未解决',
      closed: '已解决',
    },
    width: 100,
    ellipsis: true,
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'date',
    ellipsis: true,
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

const Demo = () => {
  const tableRef = useRef();
  // 如何写一个SearchApi：
  const searchApi = params => {
    console.log('params:', params);
    return request
      .get('https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/basic', { params })
      .then(res => {
        console.log('response:', res);
        if (res && res.data) {
          const data = res.data.map(item => Object.assign(item, { money: 999999999.99 }));
          console.log('dataSource', data);
          return { rows: data, total: res.data.length }; // 注意一定要返回 rows 和 total
        }
      })
      .catch(e => console.log('Oops, error', e));
  };

  const showData = () => {
    console.log('所有可用的context:', tableRef.current);
    const { refresh, tableState } = tableRef.current;
    const length = tableState.dataSource && tableState.dataSource.length;
    refresh();
    alert(`共${length}条数据`);
  };

  return (
    <div style={{ background: 'rgb(245,245,245)' }}>
      <TableContainer ref={tableRef} searchApi={searchApi}>
        <Search schema={schema} />
        <ProTable
          columns={columns}
          headerTitle="高级表单"
          rowKey="id"
          toolbarRender={() => [
            <Button key="show" onClick={showData}>
              查看日志
            </Button>,
            <Button key="out" onClick={() => alert('table-render！')}>
              导出数据
            </Button>,
            <Customize />,
            <Button key="primary" type="primary" onClick={() => alert('table-render！')}>
              <PlusOutlined />
              创建
            </Button>,
          ]}
        />
      </TableContainer>
    </div>
  );
};

const Customize = () => {
  const data = useTable();
  return <Button onClick={data.refresh}>刷新按钮</Button>;
};

export default Demo;
