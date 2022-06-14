import { ColumnHeightOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Tooltip } from 'antd';
import React from 'react';
import { useTable } from '../hooks';

export type DensitySize = 'middle' | 'small' | 'default' | undefined;

const DesityIcon = () => {
  const { tableState, setTable }: any = useTable();

  return (
    <Dropdown
      getPopupContainer={() => document.getElementById('tr-table')}
      overlay={
        <Menu
          selectedKeys={[tableState.tableSize]}
          onClick={({ key }) => {
            setTable({ tableSize: key as DensitySize });
          }}
          style={{
            width: 80,
          }}
        >
          <Menu.Item key="default">默认</Menu.Item>
          <Menu.Item key="middle">中等</Menu.Item>
          <Menu.Item key="small">紧凑</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip title="表格密度">
        <ColumnHeightOutlined />
      </Tooltip>
    </Dropdown>
  );
};

export default DesityIcon;
