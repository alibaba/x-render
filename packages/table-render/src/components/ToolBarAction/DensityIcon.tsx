import { ColumnHeightOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Tooltip } from 'antd';
import React, { useRef } from 'react';
import { useTable } from '../hooks';

export type DensitySize = 'middle' | 'small' | 'default' | undefined;

const DesityIcon = () => {
  const { tableState, setTable }: any = useTable();
  const dropRef = useRef<any>(); // class组件用 React.createRef()

  return (
    <div ref={dropRef}>
      <Dropdown
        getPopupContainer={() => dropRef.current}
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
    </div>
  );
};

export default DesityIcon;
